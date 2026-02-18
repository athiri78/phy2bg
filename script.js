// Script pour la// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                // Use the login helper from auth.js if available
                if (typeof window.loginUser === 'function') {
                    const result = window.loginUser(email, password);

                    if (result.success) {
                        // Animation
                        const btn = loginForm.querySelector('.btn-primary');
                        btn.innerHTML = 'Connexion...';
                        btn.style.opacity = '0.8';

                        setTimeout(() => {
                            // Add auth param for file:// protocol compatibility
                            const redirectUrl = result.redirect + (result.redirect.includes('admin') ? '?auth=admin' : '');
                            window.location.href = redirectUrl;
                        }, 500);
                    } else {
                        alert('❌ ' + result.message);
                    }
                } else {
                    // Fallback purely for dev if auth.js failed to load
                    console.error('Auth logic missing');
                    alert('Erreur interne: auth.js non chargé.');
                }
            } else {
                alert('⚠️ Veuillez remplir tous les champs');
            }
        });
    }

    // Pour faciliter le test, on peut proposer des boutons de connexion rapide
    const quickLoginStudent = document.createElement('button');
    const quickLoginAdmin = document.createElement('button');

    // Ces boutons sont optionnels, pour debug seulement
    console.log('Page de connexion chargée. Entrez n\'importe quel email/mot de passe pour vous connecter.');
    // Gestion du bouton "Créer un compte"
    // --- Gestion du Modal d'Inscription ---
    const createAccountBtn = document.querySelector('.btn-secondary');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterBtn = document.getElementById('closeRegisterModal');
    const cancelRegisterBtn = document.getElementById('cancelRegister');
    const registerForm = document.getElementById('registerForm');

    // Ouvrir le modal
    if (createAccountBtn && registerModal) {
        createAccountBtn.addEventListener('click', function () {
            registerModal.classList.add('active');
        });
    }

    // Fermer le modal
    function closeRegister() {
        if (registerModal) {
            registerModal.classList.remove('active');
            registerForm.reset();
        }
    }

    if (closeRegisterBtn) closeRegisterBtn.addEventListener('click', closeRegister);
    if (cancelRegisterBtn) cancelRegisterBtn.addEventListener('click', closeRegister);

    // Fermer en cliquant en dehors
    if (registerModal) {
        registerModal.addEventListener('click', function (e) {
            if (e.target === registerModal) closeRegister();
        });
    }

    // --- Soumission du Formulaire d'Inscription (Avec Sauvegarde) ---
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupération des valeurs
            const nom = document.getElementById('regNom').value;
            const prenom = document.getElementById('regPrenom').value;
            const email = document.getElementById('regEmail').value;
            const cne = document.getElementById('regCNE').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            // Validations
            if (password !== confirmPassword) {
                alert("❌ Les mots de passe ne correspondent pas.");
                return;
            }

            if (!email.includes('@etu.ucd.ac.ma')) {
                alert("⚠️ Veuillez utiliser votre adresse email académique (@etu.ucd.ac.ma).");
                return;
            }

            // Vérifier si l'utilisateur existe déjà (Optionnel pour démo)
            const students = JSON.parse(localStorage.getItem('students_db') || '[]');
            const exists = students.some(s => s.email === email || s.id === cne);

            if (exists) {
                alert("⚠️ Un compte existe déjà avec cet email ou ce CNE.");
                return;
            }

            // Création de l'étudiant
            const newStudent = {
                id: cne, // Utilisation du CNE comme ID
                nom: nom,
                prenom: prenom,
                email: email,
                password: password, // ATTENTION: Stocké en clair pour la démo
                dateInscription: new Date().toISOString(),
                anneeAcademique: '2025/2026'
            };

            // Sauvegarde dans la "Base de données" LocalStorage
            students.push(newStudent);
            localStorage.setItem('students_db', JSON.stringify(students));

            alert(`✅ Inscription réussie pour ${prenom} ${nom} !\n\nVous pouvez maintenant vous connecter.`);
            closeRegister();
        });
    }
});
