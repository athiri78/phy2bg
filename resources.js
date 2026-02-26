// Resources Page JavaScript — Firebase Storage + Firestore Edition
document.addEventListener('DOMContentLoaded', function () {

    // --- Firebase References ---
    const storageRef = storage.ref('resources');
    const dbRef = db.collection('resources');

    // --- Elements ---
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');
    const modal = document.getElementById('uploadModal');
    const form = document.getElementById('uploadForm');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const progressContainer = document.getElementById('uploadProgressContainer');
    const progressFill = document.getElementById('uploadProgressFill');
    const progressPercent = document.getElementById('uploadProgressPercent');
    const progressText = document.getElementById('uploadProgressText');
    const submitBtn = document.getElementById('submitBtn');

    // --- State ---
    let resources = [];

    // --- Initialization ---
    loadResources();

    // --- Admin-only: hide upload button for non-admin ---
    if (typeof isAdmin === 'function' && !isAdmin()) {
        document.getElementById('uploadTriggerBtn').style.display = 'none';
    }

    // --- Tab Switching ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab;
            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === target) s.classList.add('active');
            });
        });
    });

    // --- Modal Handling ---
    document.getElementById('uploadTriggerBtn').addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.add('hidden');
        form.reset();
        document.getElementById('fileNamePreview').textContent = '';
        progressContainer.classList.add('hidden');
        progressFill.style.width = '0%';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Publier le document';
    }

    // --- File Upload ---
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            document.getElementById('fileNamePreview').textContent =
                `📄 ${e.target.files[0].name} (${formatBytes(e.target.files[0].size)})`;
        }
    });

    // Drag & Drop Visuals
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            document.getElementById('fileNamePreview').textContent =
                `📄 ${e.dataTransfer.files[0].name}`;
        }
    });

    // --- Form Submission (Firebase Upload) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('docTitle').value;
        const category = document.getElementById('docCategory').value;
        const module = document.getElementById('docModule').value;
        const file = fileInput.files[0];

        if (!title || !category || !module) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        if (!file) {
            alert('⚠️ Veuillez sélectionner un fichier PDF.');
            return;
        }

        // File size check (max 10 MB)
        const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
        if (file.size > MAX_SIZE) {
            alert(`⚠️ Le fichier est trop volumineux (${formatBytes(file.size)}).\nTaille maximale autorisée : 10 MB.\n\nConseil : compressez votre PDF avec ilovepdf.com`);
            return;
        }

        // Disable submit and show progress
        submitBtn.disabled = true;
        submitBtn.textContent = 'Upload en cours...';
        progressContainer.classList.remove('hidden');
        progressFill.style.width = '0%';
        progressPercent.textContent = '0%';
        progressText.textContent = `Préparation de l'upload (${formatBytes(file.size)})...`;

        // Create unique filename
        const fileId = Date.now().toString();
        const fileName = `${fileId}_${file.name}`;
        const fileRef = storageRef.child(fileName);

        // Upload with progress tracking
        let uploadStartTime = Date.now();
        const uploadTask = fileRef.put(file);

        // Timeout: if no progress after 30 seconds, alert the user
        let lastBytesTransferred = 0;
        let stuckTimer = setTimeout(() => {
            if (lastBytesTransferred === 0) {
                uploadTask.cancel();
                progressText.textContent = '❌ Upload bloqué — vérifiez Firebase Storage';
                progressFill.style.width = '0%';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Publier le document';
                alert('⚠️ L\'upload semble bloqué.\n\nCauses possibles :\n1. Firebase Storage n\'est pas activé\n2. Les règles de sécurité Storage bloquent l\'écriture\n3. Le bucket Storage n\'existe pas encore\n\n→ Allez sur console.firebase.google.com → Storage → Vérifiez l\'activation et les Rules.');
            }
        }, 30000);

        uploadTask.on('state_changed',
            // Progress
            (snapshot) => {
                lastBytesTransferred = snapshot.bytesTransferred;
                clearTimeout(stuckTimer); // Reset timeout on progress

                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                progressFill.style.width = progress + '%';
                progressPercent.textContent = progress + '%';

                // Calculate speed and ETA
                const elapsed = (Date.now() - uploadStartTime) / 1000; // seconds
                const speed = snapshot.bytesTransferred / elapsed; // bytes/sec
                const remaining = (snapshot.totalBytes - snapshot.bytesTransferred) / speed;

                if (progress < 100) {
                    const speedText = formatBytes(speed) + '/s';
                    const etaText = remaining > 60 ? `${Math.round(remaining / 60)} min` : `${Math.round(remaining)} sec`;
                    progressText.textContent = `${formatBytes(snapshot.bytesTransferred)} / ${formatBytes(snapshot.totalBytes)} — ${speedText} — ${etaText} restant`;
                } else {
                    progressText.textContent = 'Finalisation...';
                }
            },
            // Error
            (error) => {
                clearTimeout(stuckTimer);
                console.error('Upload error:', error);
                progressText.textContent = '❌ Erreur lors de l\'upload';
                progressFill.style.width = '0%';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Publier le document';

                if (error.code === 'storage/unauthorized') {
                    alert('⛔ Erreur d\'autorisation Firebase.\n\nAllez sur console.firebase.google.com → Storage → Rules\nEt remplacez les règles par :\n\nrules_version = \'2\';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /resources/{allPaths=**} {\n      allow read, write: if true;\n    }\n  }\n}');
                } else if (error.code === 'storage/canceled') {
                    alert('Upload annulé.');
                } else {
                    alert('❌ Erreur : ' + error.code + '\n' + error.message);
                }
            },
            // Complete
            async () => {
                try {
                    const downloadURL = await fileRef.getDownloadURL();

                    // Save metadata to Firestore
                    const docData = {
                        title: title,
                        category: category,
                        module: module,
                        fileName: file.name,
                        storagePath: fileName,
                        downloadURL: downloadURL,
                        size: formatBytes(file.size),
                        date: new Date().toLocaleDateString('fr-FR'),
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        downloads: 0
                    };

                    await dbRef.add(docData);

                    progressText.textContent = '✅ Upload réussi !';
                    progressFill.classList.add('success');

                    // Reload resources and close modal after a brief delay
                    setTimeout(() => {
                        loadResources();
                        closeModal();
                        progressFill.classList.remove('success');
                    }, 1000);

                } catch (error) {
                    console.error('Firestore save error:', error);
                    alert('❌ Fichier uploadé mais erreur de sauvegarde des métadonnées : ' + error.message);
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Publier le document';
                }
            }
        );
    });

    // --- Load Resources from Firestore ---
    async function loadResources() {
        loadingSpinner.style.display = 'flex';

        try {
            const snapshot = await dbRef.orderBy('createdAt', 'desc').get();
            resources = [];

            snapshot.forEach(doc => {
                resources.push({ id: doc.id, ...doc.data() });
            });

            renderAllResources();
        } catch (error) {
            console.error('Error loading resources:', error);

            // Fallback: check if Firebase is not configured
            if (error.code === 'permission-denied' || error.message.includes('VOTRE_')) {
                console.warn('Firebase non configuré. Affichage des données de démonstration.');
                resources = getDefaultResources();
                renderAllResources();
            }
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }

    // --- Rendering Logic ---
    function renderAllResources() {
        renderCategory('cours');
        renderCategory('td');
        renderCategory('examens');
    }

    function renderCategory(category) {
        const container = document.getElementById(`${category}-grid`);
        const emptyState = document.getElementById(`empty-${category}`);
        const filtered = resources.filter(r => r.category === category);

        container.innerHTML = '';

        if (filtered.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            filtered.forEach(resource => {
                container.appendChild(createResourceCard(resource));
            });
        }
    }

    function createResourceCard(res) {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `
            <div class="card-top">
                <div class="file-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
                <div class="card-info">
                    <span class="module-tag">${res.module}</span>
                    <h4>${res.title}</h4>
                </div>
            </div>
            <div class="meta-info">
                <span>${res.date} • ${res.size}</span>
                <div>
                    <button class="btn-download" title="Télécharger" onclick="downloadResource('${res.id}')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                    ${(typeof isAdmin === 'function' && isAdmin()) ? `<button class="btn-download" title="Supprimer" style="color: #ef4444; margin-left: 5px;" onclick="deleteResource('${res.id}')">&times;</button>` : ''}
                </div>
            </div>
        `;
        return div;
    }

    // --- Helpers ---
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    function getDefaultResources() {
        return [
            {
                id: 'demo-1',
                title: 'Chapitre 1 : Optique Géométrique - Principes de base',
                category: 'cours',
                module: 'Optique',
                fileName: 'Chap1_Optique.pdf',
                size: '2.4 MB',
                date: '01/09/2025',
                downloads: 120
            },
            {
                id: 'demo-2',
                title: 'Série TD N°1 : Réflexion et Réfraction',
                category: 'td',
                module: 'Optique',
                fileName: 'TD1_Optique.pdf',
                size: '850 KB',
                date: '15/09/2025',
                downloads: 85
            },
            {
                id: 'demo-3',
                title: 'Examen Final 2024 - Session Normale',
                category: 'examens',
                module: 'Électrostatique',
                fileName: 'Exam2024_Electro.pdf',
                size: '1.5 MB',
                date: '20/06/2025',
                downloads: 240
            }
        ];
    }

    // --- Expose functions for inline HTML calls ---
    window.downloadResource = function (id) {
        const resource = resources.find(r => r.id === id);

        if (!resource) {
            alert('❌ Ressource introuvable.');
            return;
        }

        // Demo resources (no real file)
        if (id.startsWith('demo-')) {
            alert('📁 Ce document est un exemple de démonstration.\nAucun fichier réel n\'est associé.');
            return;
        }

        // Firebase resource: use download URL
        if (resource.downloadURL) {
            // Increment download counter in Firestore
            dbRef.doc(id).update({
                downloads: firebase.firestore.FieldValue.increment(1)
            }).catch(err => console.warn('Could not update download count:', err));

            // Open the file in a new tab (triggers download for PDFs)
            const link = document.createElement('a');
            link.href = resource.downloadURL;
            link.target = '_blank';
            link.download = resource.fileName || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('📁 Aucun fichier associé à cette ressource.');
        }
    };

    window.deleteResource = async function (id) {
        if (!confirm('Supprimer ce document ?')) return;

        const resource = resources.find(r => r.id === id);

        // Demo resources: just remove from display
        if (id.startsWith('demo-')) {
            resources = resources.filter(r => r.id !== id);
            renderAllResources();
            return;
        }

        try {
            // Delete file from Firebase Storage
            if (resource && resource.storagePath) {
                await storageRef.child(resource.storagePath).delete();
            }

            // Delete metadata from Firestore
            await dbRef.doc(id).delete();

            // Reload
            await loadResources();
            alert('✅ Document supprimé.');
        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ Erreur lors de la suppression : ' + error.message);
        }
    };
});
