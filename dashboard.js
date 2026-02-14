// Script pour le tableau de bord
document.addEventListener('DOMContentLoaded', function () {
    // Vérifier si l'utilisateur est connecté
    const fullName = localStorage.getItem('user_name');
    if (!fullName) {
        window.location.href = 'index.html';
        return;
    }

    // Afficher le prénom dans le message de bienvenue
    const firstName = fullName.split(' ')[0];
    const greetingElement = document.getElementById('welcome-greeting');
    if (greetingElement) {
        greetingElement.textContent = `Bonjour ${firstName} 👋`;
    }

    // Gestion des boutons "Commencer"
    const startButtons = document.querySelectorAll('.btn-start');
    startButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Rediriger vers la page de test avec les paramètres
            const module = this.dataset.module;
            const chapter = this.dataset.chapter;
            window.location.href = `test.html?module=${module}&chapter=${chapter}`;
        });
    });

    // Gestion du bouton "Afficher plus"
    const showMoreButtons = document.querySelectorAll('.btn-show-more');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const chaptersList = button.closest('.module-chapters-list');
            chaptersList.classList.toggle('collapsed');

            if (chaptersList.classList.contains('collapsed')) {
                button.textContent = 'Afficher 4 chapitres...';
            } else {
                button.textContent = 'Masquer les chapitres';
            }
        });
    });
});
