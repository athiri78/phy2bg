// Resources Page JavaScript — GitHub API Edition
// Dépôt GitHub : athiri78/phy2bg
// Les PDFs sont stockés dans : pdfs/
// La liste des ressources est stockée dans : resources.json

document.addEventListener('DOMContentLoaded', function () {

    // ===================================================
    // CONFIGURATION GITHUB
    // ===================================================
    const GITHUB_OWNER = 'athiri78';
    const GITHUB_REPO = 'phy2bg';
    const GITHUB_BRANCH = 'main';  // ou 'master' selon votre repo
    const PDF_FOLDER = 'pdfs';
    const JSON_FILE = 'resources.json';

    // URL publique de base pour accéder aux PDFs via GitHub Pages
    const BASE_URL = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}`;

    // ===================================================
    // TOKEN GITHUB (stocké dans localStorage)
    // ===================================================
    function getToken() {
        return localStorage.getItem('gh_token') || '';
    }

    function saveToken(token) {
        localStorage.setItem('gh_token', token.trim());
    }

    // ===================================================
    // ÉLÉMENTS DOM
    // ===================================================
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.content-section');
    const modal = document.getElementById('uploadModal');
    const tokenModal = document.getElementById('tokenModal');
    const form = document.getElementById('uploadForm');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const progressContainer = document.getElementById('uploadProgressContainer');
    const progressFill = document.getElementById('uploadProgressFill');
    const progressPercent = document.getElementById('uploadProgressPercent');
    const progressText = document.getElementById('uploadProgressText');
    const submitBtn = document.getElementById('submitBtn');

    let resources = [];

    // ===================================================
    // INITIALISATION
    // ===================================================
    loadResources();

    // Masquer le bouton upload pour les non-admins
    if (typeof isAdmin === 'function' && !isAdmin()) {
        const btn = document.getElementById('uploadTriggerBtn');
        if (btn) btn.style.display = 'none';
    }

    // ===================================================
    // ONGLETS (TABS)
    // ===================================================
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

    // ===================================================
    // MODALE UPLOAD
    // ===================================================
    document.getElementById('uploadTriggerBtn').addEventListener('click', () => {
        // Vérifier si le token est configuré
        if (!getToken()) {
            tokenModal.classList.remove('hidden');
        } else {
            modal.classList.remove('hidden');
        }
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

    // ===================================================
    // MODALE TOKEN GITHUB
    // ===================================================
    document.getElementById('closeTokenModalBtn').addEventListener('click', () => {
        tokenModal.classList.add('hidden');
    });
    document.getElementById('cancelTokenBtn').addEventListener('click', () => {
        tokenModal.classList.add('hidden');
    });
    document.getElementById('saveTokenBtn').addEventListener('click', () => {
        const token = document.getElementById('githubTokenInput').value.trim();
        if (!token || !token.startsWith('ghp_')) {
            alert('⚠️ Token invalide. Il doit commencer par "ghp_".\nVérifiez que vous avez copié le token complet depuis GitHub.');
            return;
        }
        saveToken(token);
        tokenModal.classList.add('hidden');
        modal.classList.remove('hidden');
        document.getElementById('githubTokenInput').value = '';
    });

    // ===================================================
    // SÉLECTION DE FICHIER (click et drag & drop)
    // ===================================================
    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            document.getElementById('fileNamePreview').textContent =
                `📄 ${e.target.files[0].name} (${formatBytes(e.target.files[0].size)})`;
        }
    });

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
                `📄 ${e.dataTransfer.files[0].name} (${formatBytes(e.dataTransfer.files[0].size)})`;
        }
    });

    // ===================================================
    // SOUMISSION DU FORMULAIRE — UPLOAD VIA GITHUB API
    // ===================================================
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('docTitle').value.trim();
        const category = document.getElementById('docCategory').value;
        const module = document.getElementById('docModule').value;
        const file = fileInput.files[0];

        if (!file) {
            alert('⚠️ Veuillez sélectionner un fichier PDF.');
            return;
        }

        // Vérification taille (max 25 MB — limite GitHub API)
        const MAX_SIZE = 25 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            alert(`⚠️ Fichier trop volumineux (${formatBytes(file.size)}).\nLimite GitHub : 25 MB.`);
            return;
        }

        const token = getToken();
        if (!token) {
            alert('⚠️ Aucun token GitHub configuré. Cliquez sur Annuler et réessayez.');
            return;
        }

        // UI — début de l'upload
        submitBtn.disabled = true;
        submitBtn.textContent = 'Publication en cours...';
        progressContainer.classList.remove('hidden');
        progressFill.style.width = '10%';
        progressPercent.textContent = '10%';
        progressText.textContent = 'Lecture du fichier...';

        try {
            // Étape 1 : Lire le fichier en Base64
            const base64Content = await fileToBase64(file);
            progressFill.style.width = '30%';
            progressPercent.textContent = '30%';
            progressText.textContent = 'Envoi vers GitHub...';

            // Nom de fichier unique (timestamp + nom original nettoyé)
            const safeFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
            const filePath = `${PDF_FOLDER}/${safeFileName}`;

            // Étape 2 : Upload du PDF dans le repo GitHub
            const uploadResponse = await githubPut(
                `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
                {
                    message: `Ajout ressource : ${title}`,
                    content: base64Content,
                    branch: GITHUB_BRANCH
                },
                token
            );

            if (!uploadResponse.ok) {
                const err = await uploadResponse.json();
                throw new Error(err.message || `Erreur ${uploadResponse.status}`);
            }

            progressFill.style.width = '65%';
            progressPercent.textContent = '65%';
            progressText.textContent = 'Mise à jour de la liste des ressources...';

            // URL publique du PDF (via GitHub Pages)
            const pdfURL = `${BASE_URL}/${filePath}`;

            // Étape 3 : Mettre à jour resources.json
            const newEntry = {
                id: Date.now().toString(),
                title,
                category,
                module,
                fileName: file.name,
                filePath,
                downloadURL: pdfURL,
                size: formatBytes(file.size),
                date: new Date().toLocaleDateString('fr-FR'),
                downloads: 0
            };

            await updateResourcesJson(newEntry, token);

            progressFill.style.width = '100%';
            progressPercent.textContent = '100%';
            progressText.textContent = '✅ Document publié avec succès !';
            progressFill.classList.add('success');

            setTimeout(() => {
                loadResources();
                closeModal();
                progressFill.classList.remove('success');
            }, 1200);

        } catch (error) {
            console.error('Upload error:', error);
            progressFill.style.width = '0%';
            progressText.textContent = '❌ Erreur lors de la publication';

            if (error.message.includes('401') || error.message.includes('Bad credentials')) {
                localStorage.removeItem('gh_token');
                alert('⛔ Token GitHub invalide ou expiré.\n\nVotre token a été supprimé. Réessayez pour en entrer un nouveau.');
            } else if (error.message.includes('404')) {
                alert('❌ Dépôt GitHub introuvable.\n\nVérifiez que le repo "' + GITHUB_REPO + '" existe et que votre token a les droits "repo".');
            } else if (error.message.includes('422')) {
                alert('❌ Ce fichier existe déjà dans le dépôt.\nRenommez votre fichier et réessayez.');
            } else {
                alert('❌ Erreur : ' + error.message);
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Publier le document';
        }
    });

    // ===================================================
    // CHARGER LES RESSOURCES depuis resources.json
    // ===================================================
    async function loadResources() {
        loadingSpinner.style.display = 'flex';

        try {
            // On ajoute un paramètre aléatoire pour éviter le cache navigateur
            const res = await fetch(`${BASE_URL}/${JSON_FILE}?v=${Date.now()}`);

            if (res.ok) {
                const data = await res.json();
                resources = data.resources || [];
            } else if (res.status === 404) {
                // Pas encore de fichier resources.json → liste vide
                resources = [];
            } else {
                throw new Error('Erreur de chargement ' + res.status);
            }

        } catch (error) {
            console.warn('Impossible de charger resources.json:', error.message);
            resources = [];
        } finally {
            loadingSpinner.style.display = 'none';
            renderAllResources();
        }
    }

    // ===================================================
    // METTRE À JOUR resources.json VIA GITHUB API
    // ===================================================
    async function updateResourcesJson(newEntry, token) {
        // D'abord récupérer le SHA actuel du fichier (requis pour le mettre à jour)
        let sha = null;
        let existingResources = [];

        const checkRes = await githubGet(
            `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}?ref=${GITHUB_BRANCH}`,
            token
        );

        if (checkRes.ok) {
            const fileData = await checkRes.json();
            sha = fileData.sha;
            // Décoder le contenu existant
            const decoded = atob(fileData.content.replace(/\n/g, ''));
            const parsed = JSON.parse(decoded);
            existingResources = parsed.resources || [];
        }
        // Si 404 → le fichier n'existe pas encore, on le crée

        existingResources.push(newEntry);

        const updatedJson = JSON.stringify({ resources: existingResources }, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(updatedJson)));

        const body = {
            message: `Mise à jour ressources : ${newEntry.title}`,
            content: encodedContent,
            branch: GITHUB_BRANCH
        };
        if (sha) body.sha = sha;

        const updateRes = await githubPut(
            `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}`,
            body,
            token
        );

        if (!updateRes.ok) {
            const err = await updateRes.json();
            throw new Error('Erreur mise à jour resources.json : ' + (err.message || updateRes.status));
        }
    }

    // ===================================================
    // HELPERS GITHUB API
    // ===================================================
    function githubPut(path, body, token) {
        return fetch(`https://api.github.com${path}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json'
            },
            body: JSON.stringify(body)
        });
    }

    function githubGet(path, token) {
        return fetch(`https://api.github.com${path}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github+json'
            }
        });
    }

    // ===================================================
    // AFFICHAGE DES RESSOURCES
    // ===================================================
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
        const isAdminUser = typeof isAdmin === 'function' && isAdmin();

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
                    ${isAdminUser ? `<button class="btn-download" title="Supprimer" style="color:#ef4444; margin-left:5px;" onclick="deleteResource('${res.id}')">&#x2715;</button>` : ''}
                </div>
            </div>
        `;
        return div;
    }

    // ===================================================
    // TÉLÉCHARGEMENT
    // ===================================================
    window.downloadResource = function (id) {
        const resource = resources.find(r => r.id === id);
        if (!resource || !resource.downloadURL) {
            alert('❌ Fichier introuvable.');
            return;
        }
        const link = document.createElement('a');
        link.href = resource.downloadURL;
        link.target = '_blank';
        link.download = resource.fileName || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ===================================================
    // SUPPRESSION
    // ===================================================
    window.deleteResource = async function (id) {
        if (!confirm('🗑️ Supprimer ce document ?')) return;

        const token = getToken();
        if (!token) {
            alert('⚠️ Token GitHub non configuré.');
            return;
        }

        const resource = resources.find(r => r.id === id);
        if (!resource) return;

        try {
            // Supprimer le PDF du repo
            if (resource.filePath) {
                // Récupérer le SHA du fichier PDF
                const fileRes = await githubGet(
                    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${resource.filePath}?ref=${GITHUB_BRANCH}`,
                    token
                );
                if (fileRes.ok) {
                    const fileData = await fileRes.json();
                    await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${resource.filePath}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `token ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/vnd.github+json'
                        },
                        body: JSON.stringify({
                            message: `Suppression : ${resource.title}`,
                            sha: fileData.sha,
                            branch: GITHUB_BRANCH
                        })
                    });
                }
            }

            // Mettre à jour resources.json sans cette entrée
            const checkRes = await githubGet(
                `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}?ref=${GITHUB_BRANCH}`,
                token
            );
            if (checkRes.ok) {
                const fileData = await checkRes.json();
                const decoded = atob(fileData.content.replace(/\n/g, ''));
                const parsed = JSON.parse(decoded);
                const updated = (parsed.resources || []).filter(r => r.id !== id);
                const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ resources: updated }, null, 2))));

                await githubPut(
                    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}`,
                    {
                        message: `Suppression ressource : ${resource.title}`,
                        content: encoded,
                        sha: fileData.sha,
                        branch: GITHUB_BRANCH
                    },
                    token
                );
            }

            alert('✅ Document supprimé.');
            loadResources();

        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ Erreur suppression : ' + error.message);
        }
    };

    // ===================================================
    // UTILITAIRES
    // ===================================================
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

});
