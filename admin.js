// Admin Panel JavaScript - Database Initialization & Management
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Database Initialization Logic ---
    const initDbBtn = document.getElementById('initDbBtn');
    const resetDbBtn = document.getElementById('resetDbBtn');

    // Génération de données (Code existant conservé)
    function generateSampleData() {
        const modules = ['Optique Géométrique', 'Électrostatique', 'Électrocinétique', 'Magnétostatique'];
        const prenoms = ['Ahmed', 'Fatima', 'Mohamed', 'Aicha', 'Youssef', 'Zineb', 'Khalid', 'Salma', 'Omar', 'Nadia'];
        const noms = ['Alami', 'Bennani', 'El Fassi', 'Idrissi', 'Kabbaj', 'Lazrak', 'Mansouri', 'Naciri', 'Ouazzani', 'Tazi'];
        const students = [];
        const testResults = [];

        // Générer 50 étudiants
        for (let i = 1; i <= 50; i++) {
            const prenom = prenoms[Math.floor(Math.random() * prenoms.length)];
            const nom = noms[Math.floor(Math.random() * noms.length)];
            const studentId = `ETU${String(i).padStart(4, '0')}`;
            students.push({
                id: studentId,
                nom: nom,
                prenom: prenom,
                email: `${prenom.toLowerCase()}.${nom.toLowerCase()}${i}@etu.ucd.ac.ma`,
                dateInscription: new Date(2025, 8, Math.floor(Math.random() * 30) + 1).toISOString(),
                anneeAcademique: '2025/2026'
            });

            // Résultats
            const numTests = Math.floor(Math.random() * 6) + 2;
            for (let j = 0; j < numTests; j++) {
                const module = modules[Math.floor(Math.random() * modules.length)];
                const score = Math.floor(Math.random() * 40) + 60;
                const dateTest = new Date(2025, 9 + j, Math.floor(Math.random() * 28) + 1);
                testResults.push({
                    id: `RES${Date.now() + Math.random()}`, // Ajout ID unique pour suppression
                    studentId: studentId,
                    studentName: `${prenom} ${nom}`,
                    studentEmail: students[students.length - 1].email,
                    module: module,
                    score: score,
                    date: dateTest.toISOString()
                });
            }
        }
        return { students, testResults };
    }

    if (initDbBtn) {
        initDbBtn.addEventListener('click', function () {
            const password = prompt('⚠️ Admin Password Required:');
            if (password === 'admin123') {
                if (confirm('Initialiser avec des données de test ? (Écrase les données actuelles)')) {
                    const { students, testResults } = generateSampleData();
                    localStorage.setItem('students_db', JSON.stringify(students));
                    localStorage.setItem('test_results_db', JSON.stringify(testResults));
                    localStorage.setItem('db_initialized', 'true');
                    localStorage.setItem('db_init_date', new Date().toISOString());
                    alert('✅ Données générées !');
                    window.location.reload();
                }
            } else if (password !== null) alert('❌ Mot de passe incorrect');
        });
    }

    if (resetDbBtn) {
        resetDbBtn.addEventListener('click', function () {
            const password = prompt('⚠️ Admin Password Required:');
            if (password === 'admin123') {
                if (prompt('Tapez "SUPPRIMER" pour confirmer:') === 'SUPPRIMER') {
                    localStorage.clear();
                    alert('✅ Base de données effacée.');
                    window.location.reload();
                }
            }
        });
    }

    // --- 2. Table Management & Filtering Logic ---

    // Elements
    const tableBody = document.getElementById('resultsTableBody');
    const searchInput = document.getElementById('searchInput');
    const moduleFilter = document.getElementById('moduleFilter');
    const dateFilter = document.getElementById('dateFilter');
    const exportBtn = document.getElementById('exportBtn');

    // Load Data
    let allResults = JSON.parse(localStorage.getItem('test_results_db') || '[]');

    // Sort by date desc
    allResults.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Render Table
    function renderTable(data) {
        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 2rem;">Aucun résultat trouvé</td></tr>';
            return;
        }

        data.forEach(result => {
            const row = document.createElement('tr');

            // Format Date
            const dateObj = new Date(result.date);
            const dateStr = dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

            // Module Badge Color
            let badgeClass = 'electrostatics'; // default
            if (result.module.includes('Optique')) badgeClass = 'optics';
            if (result.module.includes('Cinétique')) badgeClass = 'electrokinetics';
            if (result.module.includes('Magnétostatique')) badgeClass = 'magnetism';

            // Score Badge
            let scoreClass = 'average';
            if (result.score >= 80) scoreClass = 'excellent';
            else if (result.score >= 70) scoreClass = 'good';

            row.innerHTML = `
                <td>
                    <div class="student-cell">
                        <div class="student-avatar">${getInitials(result.studentName)}</div>
                        <div>
                            <div style="font-weight:600">${result.studentName}</div>
                            <div style="font-size:0.8em; color:#6b7280">${result.studentId || 'N/A'}</div>
                        </div>
                    </div>
                </td>
                <td>${result.studentEmail}</td>
                <td><span class="module-badge ${badgeClass}">${result.module}</span></td>
                <td><span class="score-badge ${scoreClass}">${result.score}%</span></td>
                <td>${dateStr}</td>
                <td>
                    <button class="btn-action delete-btn" data-id="${result.id}" title="Supprimer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Attach Delete Events
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                const idToDelete = this.dataset.id;
                deleteResult(idToDelete);
            });
        });
    }

    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    // Filter Function
    function filterResults() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedModule = moduleFilter.value;
        const selectedDate = dateFilter.value;

        const filtered = allResults.filter(item => {
            // Search
            const matchSearch = item.studentName.toLowerCase().includes(searchTerm) ||
                item.studentEmail.toLowerCase().includes(searchTerm) ||
                item.studentId?.toLowerCase().includes(searchTerm);

            // Module
            const matchModule = selectedModule === '' || item.module.includes(selectedModule);

            // Date
            let matchDate = true;
            if (selectedDate) {
                const testDate = new Date(item.date);
                const today = new Date();
                if (selectedDate === 'today') {
                    matchDate = testDate.toDateString() === today.toDateString();
                } else if (selectedDate === 'week') {
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    matchDate = testDate >= weekAgo;
                } else if (selectedDate === 'month') {
                    matchDate = testDate.getMonth() === today.getMonth() && testDate.getFullYear() === today.getFullYear();
                }
            }

            return matchSearch && matchModule && matchDate;
        });

        renderTable(filtered);
    }

    // Attach Filter Events
    searchInput.addEventListener('input', filterResults);
    moduleFilter.addEventListener('change', filterResults);
    dateFilter.addEventListener('change', filterResults);

    // Initial Render
    filterResults();

    // --- 3. Delete Functionality ---
    window.deleteResult = function (id) { // Exposed to window logic just in case, though event listeners handle it
        if (confirm('🗑️ Êtes-vous sûr de vouloir supprimer ce résultat ? Cette action est irréversible.')) {
            // Remove from array
            allResults = allResults.filter(r => r.id !== id);

            // Update LocalStorage
            localStorage.setItem('test_results_db', JSON.stringify(allResults));

            // Re-render
            filterResults();

            // Update stats display if necessary
            displayDatabaseStats();
        }
    };

    // --- 4. Excel Export Functionality ---
    exportBtn.addEventListener('click', function () {
        if (allResults.length === 0) {
            alert('Aucune donnée à exporter.');
            return;
        }

        // CSV Header
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID Etudiant,Nom Complet,Email,Module,Score,Date\r\n";

        // Filtered data is what user sees, usually export what is visible. 
        // For now let's export ALL or Filtered? Let's export current view.
        // We need to grab lines from table or re-filter. Easier to re-filter.
        // Let's simpler export ALL for now or re-run filter logic. 
        // Let's rely on currently `renderTable` input? 
        // Actually, let's just export visible rows logic for simplicity in V1

        // Re-run filter to get current data
        const searchTerm = searchInput.value.toLowerCase();
        const selectedModule = moduleFilter.value;
        const selectedDate = dateFilter.value;

        const dataToExport = allResults.filter(item => {
            const matchSearch = item.studentName.toLowerCase().includes(searchTerm) ||
                item.studentEmail.toLowerCase().includes(searchTerm) ||
                item.studentId?.toLowerCase().includes(searchTerm);
            const matchModule = selectedModule === '' || item.module.includes(selectedModule);
            let matchDate = true;
            if (selectedDate) {
                const testDate = new Date(item.date);
                const today = new Date();
                if (selectedDate === 'today') matchDate = testDate.toDateString() === today.toDateString();
                else if (selectedDate === 'week') matchDate = testDate >= new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                else if (selectedDate === 'month') matchDate = testDate.getMonth() === today.getMonth() && testDate.getFullYear() === today.getFullYear();
            }
            return matchSearch && matchModule && matchDate;
        });

        dataToExport.forEach(row => {
            const dateStr = new Date(row.date).toLocaleDateString('fr-FR');
            let rowStr = `${row.studentId},"${row.studentName}",${row.studentEmail},"${row.module}",${row.score},${dateStr}`;
            csvContent += rowStr + "\r\n";
        });

        // Download Trigger
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "resultats_etudiants.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- 5. Settings & Password Change Logic ---
    const settingsBtn = document.querySelector('.sidebar-menu li:last-child'); // Assuming "Paramètres" is last
    const settingsSection = document.getElementById('settings-section');
    const dbSection = document.querySelector('.database-section'); // The first one
    const statsSection = document.querySelector('.stats-section');
    const filtersSection = document.querySelector('.filters-section');
    const resultsSection = document.querySelector('.results-section');

    // Simple View Toggling
    settingsBtn.addEventListener('click', function () {
        // Toggle Active State in Sidebar
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // Show Settings, Hide layout parts (Simplified for demo)
        settingsSection.style.display = 'block';
        dbSection.style.display = 'none';
        statsSection.style.display = 'none';
        filtersSection.style.display = 'none';
        resultsSection.style.display = 'none';
    });

    const dashboardBtn = document.querySelector('.sidebar-menu li:first-child');
    dashboardBtn.addEventListener('click', function () {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        settingsSection.style.display = 'none';
        dbSection.style.display = 'block';
        statsSection.style.display = 'grid'; // Grid for stats
        filtersSection.style.display = 'flex';
        resultsSection.style.display = 'block';
    });

    // Password Form
    const pwdForm = document.getElementById('changePasswordForm');
    if (pwdForm) {
        pwdForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const oldPass = document.getElementById('oldPass').value;
            const newPass = document.getElementById('newPass').value;

            if (window.changeAdminPassword) {
                const result = window.changeAdminPassword(oldPass, newPass);
                if (result.success) {
                    alert('✅ ' + result.message);
                    pwdForm.reset();
                } else {
                    alert('❌ ' + result.message);
                }
            } else {
                alert('Erreur: Fonction auth non chargée.');
            }
        });
    }

    displayDatabaseStats();
});

function displayDatabaseStats() {
    // Basic logs kept from previous version
    const results = JSON.parse(localStorage.getItem('test_results_db') || '[]');
    console.log(`Stats updated: ${results.length} total results.`);
}
