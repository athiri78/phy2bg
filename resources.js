// =======================================================
// RESOURCES PAGE — GITHUB API VERSION
// Repo : athiri78/phy2bg
// PDFs : /pdfs
// Index : resources.json
// =======================================================

document.addEventListener("DOMContentLoaded", init);

// =======================================================
// 1. CONFIGURATION
// =======================================================

const GITHUB_OWNER = "athiri78";
const GITHUB_REPO = "phy2bg";
const GITHUB_BRANCH = "main";

const PDF_FOLDER = "pdfs";
const JSON_FILE = "resources.json";

const BASE_URL = `https://${GITHUB_OWNER}.github.io/${GITHUB_REPO}`;

// =======================================================
// 2. TOKEN GITHUB
// =======================================================

const GITHUB_TOKEN = "github_pat_XXXXXXXXXXXXXXXXXXXXXXXX";

function getToken() {
    return GITHUB_TOKEN;
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
        .addEventListener("click", () => modal.classList.remove("hidden"));

    document.getElementById("closeModalBtn")
        .addEventListener("click", closeModal);

    document.getElementById("cancelBtn")
        .addEventListener("click", closeModal);

}

function closeModal() {

    modal.classList.add("hidden");

    form.reset();

    progressContainer.classList.add("hidden");

    progressFill.style.width = "0%";

    submitBtn.disabled = false;
    submitBtn.textContent = "Publier le document";

}

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

        const filePath = `${PDF_FOLDER}/${safeFileName}`;

        await githubPut(
            `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
            {
                message: `Ajout ressource : ${title}`,
                content: base64Content,
                branch: GITHUB_BRANCH
            }
        );

        startProgress("Mise à jour resources.json...", 70);

        const pdfURL = `${BASE_URL}/${filePath}`;

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

        alert("Erreur upload : " + error.message);

        submitBtn.disabled = false;

    }

}

// =======================================================
// 9. CHARGEMENT DES RESSOURCES
// =======================================================

async function loadResources() {

    loadingSpinner.style.display = "flex";

    try {

        const res =
            await fetch(`${BASE_URL}/${JSON_FILE}?v=${Date.now()}`);

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
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}`
    );

    if (check.ok) {

        const file = await check.json();

        sha = file.sha;

        const decoded = atob(file.content.replace(/\n/g, ""));

        existing = JSON.parse(decoded).resources || [];

    }

    existing.push(newEntry);

    const updated =
        JSON.stringify({ resources: existing }, null, 2);

    const encoded =
        btoa(unescape(encodeURIComponent(updated)));

    await githubPut(
        `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${JSON_FILE}`,
        {
            message: "Update resources",
            content: encoded,
            sha,
            branch: GITHUB_BRANCH
        }
    );

}

// =======================================================
// 11. GITHUB API HELPERS
// =======================================================

function githubPut(path, body) {

    return fetch(`https://api.github.com${path}`, {

        method: "PUT",

        headers: {

            Authorization: `token ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json"

        },

        body: JSON.stringify(body)

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

    div.innerHTML = `
        <h4>${res.title}</h4>
        <p>${res.module}</p>
        <span>${res.date} • ${res.size}</span>
        <a href="${res.downloadURL}" target="_blank">Télécharger</a>
    `;

    return div;

}

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

    progressPercent.textContent = percent + "%";

    progressText.textContent = text;

}

function finishProgress() {

    progressFill.style.width = "100%";

    progressPercent.textContent = "100%";

    progressText.textContent = "Document publié";

}