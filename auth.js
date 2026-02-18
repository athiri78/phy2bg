// Auth.js - Gestion de l'authentification et des rôles

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Admin Password if not set
    if (!localStorage.getItem('admin_password')) {
        localStorage.setItem('admin_password', 'admin123');
    }

    // Check URL params for auth fallback (file:// protocol fix)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'admin') {
        localStorage.setItem('user_role', 'admin');
        localStorage.setItem('user_name', 'Pr. Abdellah Tahiri');
    }

    updateNavigation();

    // Si on est sur la page admin, vérifier les droits
    if (window.location.pathname.includes('admin.html')) {
        requireAdmin();
    }
});

/**
 * Vérifie si l'utilisateur est connecté et est admin
 */
function isAdmin() {
    return localStorage.getItem('user_role') === 'admin';
}

/**
 * Récupère le nom de l'utilisateur connecté
 */
function getUserName() {
    return localStorage.getItem('user_name') || 'Invité';
}

/**
 * Met à jour la barre de navigation en fonction du rôle
 */
function updateNavigation() {
    const isUserAdmin = isAdmin();

    // 1. Gérer les liens de navigation (Navbars)
    const adminLinks = document.querySelectorAll('a[href="admin.html"]');

    adminLinks.forEach(link => {
        if (!link.classList.contains('logout-btn')) {
            if (!isUserAdmin) {
                link.style.display = 'none';
            } else {
                link.style.display = 'inline-flex';
            }
        }
    });

    // 2. Mettre à jour le nom de l'utilisateur dans le header
    const profileNameElement = document.querySelector('.user-name') || document.querySelector('.admin-name');
    const profileAvatarElement = document.querySelector('.user-avatar') || document.querySelector('.admin-avatar');

    if (profileNameElement) {
        profileNameElement.textContent = getUserName();
    }

    if (profileAvatarElement) {
        const initials = getUserName().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        profileAvatarElement.textContent = initials;
    }
}

/**
 * Bloque l'accès à la page si l'utilisateur n'est pas admin
 */
function requireAdmin() {
    if (!isAdmin()) {
        alert("⛔ Accès Refusé\n\nVous n'avez pas les droits d'administrateur pour accéder à cette page.");
        window.location.href = 'dashboard.html';
    }
}

/**
 * Fonction de login (utilisée par script.js)
 */
function loginUser(email, password) {
    const headerEmail = 'abdellah.tahiri@ucd.ac.ma';
    const currentAdminPass = localStorage.getItem('admin_password') || 'admin123';

    if (email === headerEmail && password === currentAdminPass) {
        localStorage.setItem('user_role', 'admin');
        localStorage.setItem('user_name', 'Pr. Abdellah Tahiri');
        return { success: true, redirect: 'admin.html' };
    } else if (email.includes('@etu.ucd.ac.ma')) {
        // Assuming 'students' array is available globally or imported
        // Load students from localStorage
        const students = JSON.parse(localStorage.getItem('students_db') || '[]');
        const student = students.find(s => s.email === email && s.password === password);

        if (student) {
            localStorage.setItem('user_role', 'student');
            localStorage.setItem('user_name', `${student.prenom} ${student.nom}`);
            localStorage.setItem('user_id', student.id); // Stocker l'ID (CNE) pour les résultats
            return { success: true, redirect: 'dashboard.html' };
        } else {
            return { success: false, message: 'Email ou mot de passe étudiant incorrect.' };
        }
    } else {
        // Check specifically if it was an admin attempt with wrong password
        if (email === headerEmail) {
            return { success: false, message: 'Mot de passe administrateur incorrect.' };
        }
        return { success: false, message: 'Email ou mot de passe incorrect.' };
    }
}

/**
 * Change le mot de passe administrateur
 */
function changeAdminPassword(oldPass, newPass) {
    const currentPass = localStorage.getItem('admin_password') || 'admin123';

    if (oldPass !== currentPass) {
        return { success: false, message: 'L\'ancien mot de passe est incorrect.' };
    }

    localStorage.setItem('admin_password', newPass);
    return { success: true, message: 'Mot de passe mis à jour avec succès !' };
}

/**
 * Fonction de déconnexion
 */
function logout() {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    window.location.href = 'index.html';
}

// Exposer les fonctions globalement
window.logout = logout;
window.loginUser = loginUser;
window.changeAdminPassword = changeAdminPassword;
window.isAdmin = isAdmin;
