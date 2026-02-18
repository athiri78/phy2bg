// Resources Page JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // --- State Management ---
    const resources = JSON.parse(localStorage.getItem('resources_db')) || getDefaultResources();

    // --- Elements ---
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');
    const modal = document.getElementById('uploadModal');
    const form = document.getElementById('uploadForm');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    // --- Initialization ---
    renderAllResources();

    // --- Admin-only: hide upload button for non-admin ---
    if (typeof isAdmin === 'function' && !isAdmin()) {
        document.getElementById('uploadTriggerBtn').style.display = 'none';
    }

    // --- Tab Switching ---
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update Tab UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show Content
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
    }

    // --- File Upload Simulation ---
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
            fileInput.files = e.dataTransfer.files; // Note: works in modern browsers
            document.getElementById('fileNamePreview').textContent =
                `📄 ${e.dataTransfer.files[0].name}`;
        }
    });

    // --- Form Submission ---
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

        const newResource = {
            id: Date.now().toString(),
            title: title,
            category: category,
            module: module,
            fileName: file ? file.name : `${title.replace(/\s+/g, '_')}.pdf`,
            size: file ? formatBytes(file.size) : '1.2 MB',
            date: new Date().toLocaleDateString('fr-FR'),
            downloads: 0
        };

        if (file) {
            // Read file and store as base64 in localStorage
            const reader = new FileReader();
            reader.onload = function (event) {
                try {
                    localStorage.setItem('file_' + newResource.id, event.target.result);
                } catch (err) {
                    alert('⚠️ Le fichier est trop volumineux pour le stockage local (max ~5 MB).');
                    return;
                }
                resources.push(newResource);
                saveResources();
                renderAllResources();
                closeModal();
                alert('✅ Document ajouté avec succès !');
            };
            reader.readAsDataURL(file);
        } else {
            resources.push(newResource);
            saveResources();
            renderAllResources();
            closeModal();
            alert('✅ Document ajouté (sans fichier joint).');
        }
    });

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
    function saveResources() {
        localStorage.setItem('resources_db', JSON.stringify(resources));
    }

    function getDefaultResources() {
        return [
            {
                id: '1',
                title: 'Chapitre 1 : Optique Géométrique - Principes de base',
                category: 'cours',
                module: 'Optique',
                fileName: 'Chap1_Optique.pdf',
                size: '2.4 MB',
                date: '01/09/2025',
                downloads: 120
            },
            {
                id: '2',
                title: 'Série TD N°1 : Réflexion et Réfraction',
                category: 'td',
                module: 'Optique',
                fileName: 'TD1_Optique.pdf',
                size: '850 KB',
                date: '15/09/2025',
                downloads: 85
            },
            {
                id: '3',
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

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    // Expose functions required for HTML inline calls
    window.downloadResource = function (id) {
        const fileData = localStorage.getItem('file_' + id);
        const resource = resources.find(r => r.id === id);

        if (fileData) {
            // Create a real download from stored file data
            const link = document.createElement('a');
            link.href = fileData;
            link.download = resource ? resource.fileName : 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Update download count
            if (resource) {
                resource.downloads = (resource.downloads || 0) + 1;
                saveResources();
            }
        } else {
            alert('📁 Ce document est un exemple de démonstration.\nAucun fichier réel n\'est associé.');
        }
    };

    window.deleteResource = function (id) {
        if (confirm('Supprimer ce document ?')) {
            const idx = resources.findIndex(r => r.id === id);
            if (idx > -1) {
                resources.splice(idx, 1);
                localStorage.removeItem('file_' + id);
                saveResources();
                renderAllResources();
            }
        }
    }
});
