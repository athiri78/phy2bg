// =======================================================
// RESOURCES PAGE — GITHUB API VERSION
// Repo : athiri78/phy2bg
// PDFs : /pdfs
// Index : resources.json
// =======================================================

document.addEventListener("DOMContentLoaded", init);

// =======================================================
// 1. CONFIGURATION GITHUB (Dynamique via localStorage)
// =======================================================

function getGhConfig(key, defaultValue) {
    return localStorage.getItem(`gh_pdf_${key}`) || defaultValue;
}

function getGhOwner() { return getGhConfig('owner', 'athiri78'); }
function getGhRepo() { return getGhConfig('repo', 'phy2bg'); }
function getGhBranch() { return getGhConfig('branch', 'main'); }
function getGhFolder() { return getGhConfig('folder', 'pdfs'); }

function getBaseUrl() {
    return `https://${getGhOwner()}.github.io/${getGhRepo()}`;
}

// =======================================================
// 2. TOKEN GITHUB
// =======================================================

function getToken() {
    return localStorage.getItem('gh_pdf_token') || '';
}

function saveTokenConfig() {
    const owner = document.getElementById('ghOwnerInput').value.trim();
    const repo = document.getElementById('ghRepoInput').value.trim();
    const branch = document.getElementById('ghBranchInput').value.trim();
    const folder = document.getElementById('ghFolderInput').value.trim();
    const token = document.getElementById('githubTokenInput').value.trim();

    if (!token) {
        alert('⚠️ Veuillez entrer un token GitHub valide.');
        return false;
    }

    localStorage.setItem('gh_pdf_owner', owner);
    localStorage.setItem('gh_pdf_repo', repo);
    localStorage.setItem('gh_pdf_branch', branch);
    localStorage.setItem('gh_pdf_folder', folder);
    localStorage.setItem('gh_pdf_token', token);
    return true;
}

function populateTokenModal() {
    document.getElementById('ghOwnerInput').value = getGhOwner();
    document.getElementById('ghRepoInput').value = getGhRepo();
    document.getElementById('ghBranchInput').value = getGhBranch();
    document.getElementById('ghFolderInput').value = getGhFolder();
    document.getElementById('githubTokenInput').value = getToken();
}

// =======================================================
// 3. VARIABLES GLOBALES
// =======================================================

let resources = [];

let tabs, sections;
let modal, tokenModal;
let form, dropZone, fileInput;

let loadingSpinner;
let progressContainer, progressFill, progressPercent, progressText;
let submitBtn;

// =======================================================
// 4. INITIALISATION
// =======================================================

function init() {

    // --- DOM ---
    tabs = document.querySelectorAll(".tab-btn");
    sections = document.querySelectorAll(".content-section");

    modal = document.getElementById("uploadModal");
    tokenModal = document.getElementById("tokenModal");

    form = document.getElementById("uploadForm");
    dropZone = document.getElementById("dropZone");
    fileInput = document.getElementById("fileInput");

    loadingSpinner = document.getElementById("loadingSpinner");

    // Masquer le bouton d'ajout pour les non-admins
    const uploadBtn = document.getElementById("uploadTriggerBtn");
    if (uploadBtn) {
        if (typeof isAdmin === 'function' && !isAdmin()) {
            uploadBtn.style.display = 'none';
        } else {
            uploadBtn.style.display = 'inline-flex';
        }
    }

    progressContainer = document.getElementById("uploadProgressContainer");
    progressFill = document.getElementById("uploadProgressFill");
    progressPercent = document.getElementById("uploadProgressPercent");
    progressText = document.getElementById("uploadProgressText");

    submitBtn = document.getElementById("submitBtn");

    initTabs();
    initUploadModal();
    initDragDrop();
    initForm();

    loadResources();
}

// =======================================================
// 5. GESTION DES TABS
// =======================================================

function initTabs() {

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            sections.forEach(s => {
                s.classList.remove("active");
                if (s.id === target) s.classList.add("active");
            });

        });

    });

}

// =======================================================
// 6. MODALE UPLOAD
// =======================================================

function initUploadModal() {

    document.getElementById("uploadTriggerBtn")
        .addEventListener("click", () => {
            if (!getToken()) {
                populateTokenModal();
                tokenModal.classList.remove("hidden");
            } else {
                modal.classList.remove("hidden");
            }
        });

    document.getElementById("closeModalBtn")
        .addEventListener("click", closeModal);

    document.getElementById("cancelBtn")
        .addEventListener("click", closeModal);

}

function closeModal() {

    modal.classList.add("hidden");

    form.reset();

    // Réinitialiser la zone d'affichage du fichier
    const fileNamePreview = document.getElementById("fileNamePreview");
    if (fileNamePreview) {
        fileNamePreview.textContent = "Aucun fichier sélectionné";
    }

    progressContainer.classList.add("hidden");

    progressFill.style.width = "0%";

    submitBtn.disabled = false;
    submitBtn.textContent = "Envoyer vers GitHub";

}

// =======================================================
// 6.5. MODALE TOKEN GITHUB
// =======================================================

document.getElementById('closeTokenModalBtn').addEventListener('click', () => {
    tokenModal.classList.add('hidden');
});

document.getElementById('cancelTokenBtn').addEventListener('click', () => {
    tokenModal.classList.add('hidden');
});

document.getElementById('saveTokenBtn').addEventListener('click', () => {
    if (saveTokenConfig()) {
        tokenModal.classList.add('hidden');
        modal.classList.remove('hidden');
    }
});

// =======================================================
// 7. DRAG & DROP
// =======================================================

function initDragDrop() {

    dropZone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {

        const file = fileInput.files[0];

        if (!file) return;

        document.getElementById("fileNamePreview").textContent =
            `📄 ${file.name} (${formatBytes(file.size)})`;

    });

    dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", e => {

        e.preventDefault();

        fileInput.files = e.dataTransfer.files;

        const file = e.dataTransfer.files[0];

        document.getElementById("fileNamePreview").textContent =
            `📄 ${file.name} (${formatBytes(file.size)})`;

    });

}

// =======================================================
// 8. FORMULAIRE UPLOAD
// =======================================================

function initForm() {

    form.addEventListener("submit", uploadDocument);

}

async function uploadDocument(e) {

    e.preventDefault();

    const title = document.getElementById("docTitle").value.trim();
    const category = document.getElementById("docCategory").value;
    const module = document.getElementById("docModule").value;

    const file = fileInput.files[0];

    if (!file) {
        alert("Veuillez sélectionner un PDF.");
        return;
    }

    const MAX_SIZE = 25 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        alert("Fichier trop volumineux (max 25MB).");
        return;
    }

    try {

        startProgress("Lecture du fichier...", 10);

        const base64Content = await fileToBase64(file);

        startProgress("Upload GitHub...", 30);

        const safeFileName =
            `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

        const folder = getGhFolder().replace(/^\/|\/$/g, '');
        const filePath = folder ? `${folder}/${safeFileName}` : safeFileName;

        await githubPut(
            `/repos/${getGhOwner()}/${getGhRepo()}/contents/${filePath}`,
            {
                message: `Ajout ressource : ${title}`,
                content: base64Content,
                branch: getGhBranch()
            }
        );

        startProgress("Mise à jour resources.json...", 70);

        const pdfURL = `${getBaseUrl()}/${filePath}`;

        const newEntry = {

            id: Date.now().toString(),
            title,
            category,
            module,

            fileName: file.name,
            filePath,

            downloadURL: pdfURL,

            size: formatBytes(file.size),
            date: new Date().toLocaleDateString("fr-FR"),
            downloads: 0
        };

        await updateResourcesJson(newEntry);

        finishProgress();

        setTimeout(() => {

            loadResources();
            closeModal();

        }, 1000);

    }
    catch (error) {

        console.error(error);

        if (error.status === 401 || error.status === 403) {
            alert("Erreur: Token invalide ou expiré (ou manque de droits).");
            localStorage.removeItem('gh_pdf_token');
        } else {
            alert("Erreur upload : " + error.message);
        }

        submitBtn.disabled = false;
        finishProgressError();

    }

}

// =======================================================
// 9. CHARGEMENT DES RESSOURCES
// =======================================================

async function loadResources() {

    loadingSpinner.style.display = "flex";

    try {

        let jsonUrl = `${getBaseUrl()}/${JSON_FILE}?v=${Date.now()}`;

        const res = await fetch(jsonUrl);

        if (res.ok) {

            const data = await res.json();

            resources = data.resources || [];

        } else {

            resources = [];

        }

    }
    catch {

        resources = [];

    }

    loadingSpinner.style.display = "none";

    renderAllResources();

}

// =======================================================
// 10. MISE À JOUR resources.json
// =======================================================

async function updateResourcesJson(newEntry) {

    let sha = null;
    let existing = [];

    const check = await githubGet(
        `/repos/${getGhOwner()}/${getGhRepo()}/contents/${JSON_FILE}`
    );

    if (check.ok) {

        const file = await check.json();

        sha = file.sha;

        const decoded = atob(file.content.replace(/\n/g, ""));

        existing = JSON.parse(decoded).resources || [];

    }

    // mode ajout ou mode remplacement (pour la suppression)
    if (newEntry) {
        existing.push(newEntry);
    } else {
        // Si newEntry est null, on s'attend à ce que existing soit modifié par l'appelant,
        // mais dans notre implémentation de deleteResource, on passe directement la liste modifiée 
        // à une version légèrement différente de githubPut. Donc updateResourcesJson n'est appelée 
        // que pour l'ajout.
    }

    const updated =
        JSON.stringify({ resources: existing }, null, 2);

    const encoded =
        btoa(unescape(encodeURIComponent(updated)));

    await githubPut(
        `/repos/${getGhOwner()}/${getGhRepo()}/contents/${JSON_FILE}`,
        {
            message: newEntry ? "Update resources" : "Delete resource",
            content: encoded,
            sha,
            branch: getGhBranch()
        }
    );

}

// =======================================================
// 11. GITHUB API HELPERS
// =======================================================

function githubPut(path, body, method = "PUT") {

    return fetch(`https://api.github.com${path}`, {

        method: method,

        headers: {

            Authorization: `token ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json"

        },

        body: JSON.stringify(body)

    }).then(res => {
        if (!res.ok) {
            const err = new Error(`GitHub API Error: ${res.status}`);
            err.status = res.status;
            throw err;
        }
        return res;
    });

}

function githubGet(path) {

    return fetch(`https://api.github.com${path}`, {

        headers: {

            Authorization: `token ${getToken()}`,
            Accept: "application/vnd.github+json"

        }

    });

}

// =======================================================
// 12. AFFICHAGE DES RESSOURCES
// =======================================================

function renderAllResources() {

    renderCategory("cours");
    renderCategory("td");
    renderCategory("examens");

}

function renderCategory(category) {

    const container =
        document.getElementById(`${category}-grid`);

    const filtered =
        resources.filter(r => r.category === category);

    container.innerHTML = "";

    filtered.forEach(resource => {

        container.appendChild(createResourceCard(resource));

    });

}

// =======================================================
// 13. CARTES RESSOURCES
// =======================================================

function createResourceCard(res) {

    const div = document.createElement("div");

    div.className = "resource-card";

    // Check if the user is an admin by checking the toggle button state 
    // This is defined in auth.js. Alternatively, use typeof isAdmin !== 'undefined' && isAdmin()
    const adminToggle = document.getElementById("adminToggleBtn");
    const isUserAdmin = adminToggle && adminToggle.textContent.includes("Désactiver");

    const deleteBtnHTML = isUserAdmin ? `<button class="btn-secondary" style="color: #ef4444; border-color: #ef4444; margin-top: 0.5rem;" onclick="deleteResource('${res.id}')">Supprimer</button>` : '';

    div.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem;">
            <div style="font-size: 2rem;">📄</div>
            <div>
                <h4 style="margin: 0 0 0.5rem 0;">${res.title}</h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 0.9em;">Module: ${res.module}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem;">
            <span style="font-size: 0.85em; color: var(--text-secondary);">${res.date} • ${res.size}</span>
            <div style="display: flex; flex-direction: column; align-items: flex-end;">
                <a href="${res.downloadURL}" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9em; text-decoration: none;" download>Télécharger</a>
                ${deleteBtnHTML}
            </div>
        </div>
    `;

    return div;

}

// =======================================================
// 13.5. SUPPRESSION DES RESSOURCES
// =======================================================

window.deleteResource = async function (id) {
    if (!confirm('Voulez-vous vraiment supprimer ce document ?')) return;

    if (!getToken()) {
        alert("Vous devez configurer votre token GitHub (bouton 'Ajouter un document') avant de pouvoir supprimer.");
        return;
    }

    const resource = resources.find(r => r.id === id);
    if (!resource) return;

    loadingSpinner.style.display = "flex";

    try {
        // 1. Get the SHA of the PDF file to delete it
        const fileCheck = await githubGet(`/repos/${getGhOwner()}/${getGhRepo()}/contents/${resource.filePath}`);

        if (fileCheck.ok) {
            const fileData = await fileCheck.json();
            // Delete the PDF
            await fetch(`https://api.github.com/repos/${getGhOwner()}/${getGhRepo()}/contents/${resource.filePath}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `token ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Delete resource PDF: ${resource.title}`,
                    sha: fileData.sha,
                    branch: getGhBranch()
                })
            });
        }

        // 2. Remove from resources.json
        const jsonCheck = await githubGet(`/repos/${getGhOwner()}/${getGhRepo()}/contents/${JSON_FILE}`);
        if (jsonCheck.ok) {
            const jsonData = await jsonCheck.json();
            const decoded = atob(jsonData.content.replace(/\n/g, ""));
            const parsed = JSON.parse(decoded);
            const existing = parsed.resources || [];

            const updated = existing.filter(r => r.id !== id);

            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({ resources: updated }, null, 2))));

            await githubPut(`/repos/${getGhOwner()}/${getGhRepo()}/contents/${JSON_FILE}`, {
                message: `Remove resource from index: ${resource.title}`,
                content: encoded,
                sha: jsonData.sha,
                branch: getGhBranch()
            });
        }

        alert('Document supprimé avec succès.');
        loadResources();

    } catch (err) {
        console.error(err);
        alert(`Erreur lors de la suppression : ${err.message}`);
    } finally {
        loadingSpinner.style.display = "none";
    }
};

// =======================================================
// 14. UTILITAIRES
// =======================================================

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload =
            () => resolve(reader.result.split(",")[1]);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}

function formatBytes(bytes) {

    if (!bytes) return "0 Bytes";

    const k = 1024;

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;

}

function startProgress(text, percent) {

    submitBtn.disabled = true;

    progressContainer.classList.remove("hidden");

    progressFill.style.width = percent + "%";
    progressFill.style.backgroundColor = "var(--primary-color)";

    progressPercent.textContent = percent + "%";

    progressText.textContent = text;
    progressText.style.color = "var(--text-color)";

}

function finishProgress() {

    progressFill.style.width = "100%";
    progressFill.style.backgroundColor = "#10b981"; // success green

    progressPercent.textContent = "100%";

    progressText.textContent = "Document publié avec succès !";
    progressText.style.color = "#10b981";

}

function finishProgressError() {
    progressFill.style.backgroundColor = "#ef4444"; // error red
    progressText.textContent = "Erreur lors de la publication.";
    progressText.style.color = "#ef4444";
}