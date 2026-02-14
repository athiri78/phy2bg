// Script pour la page de résultats
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les résultats
    const resultsData = JSON.parse(localStorage.getItem('testResults'));

    if (!resultsData) {
        window.location.href = 'dashboard.html';
        return;
    }

    displayResults(resultsData);
    setupActionButtons();
});

function displayResults(data) {
    // Score principal
    document.querySelector('.score-value').innerHTML =
        `${data.earnedPoints}<span class="score-total">/${data.totalPoints}</span>`;
    document.querySelector('.score-percentage').textContent = `${data.percentage}%`;

    // Badge de performance
    const badge = document.querySelector('.score-badge');
    if (data.percentage >= 85) {
        badge.className = 'score-badge badge-excellent';
        badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Excellent`;
    } else if (data.percentage >= 70) {
        badge.className = 'score-badge badge-good';
        badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Bien`;
    } else {
        badge.className = 'score-badge badge-average';
        badge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg> À améliorer`;
    }

    // Statistiques
    document.querySelectorAll('.stat-value')[0].textContent = `${data.correctCount}/${data.totalQuestions}`;
    document.querySelectorAll('.stat-value')[1].textContent = data.timeSpent;

    const today = new Date();
    const dateStr = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    document.querySelectorAll('.stat-value')[2].textContent = dateStr;

    // Détails des questions
    displayQuestionDetails(data.results);

    // Performance par niveau
    displayPerformanceByLevel(data.results);
}

function displayQuestionDetails(results) {
    const container = document.querySelector('.questions-section');
    const loadMoreDiv = container.querySelector('.load-more');

    // Afficher les 3 premières questions
    results.slice(0, 3).forEach((result, index) => {
        const questionDiv = createQuestionResultCard(result, index);
        container.insertBefore(questionDiv, loadMoreDiv);
    });

    // Gérer le bouton "Afficher plus"
    const loadMoreBtn = loadMoreDiv.querySelector('.btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = `Afficher toutes les questions (${results.length - 3} restantes)`;
        loadMoreBtn.addEventListener('click', function () {
            // Afficher toutes les questions restantes
            results.slice(3).forEach((result, index) => {
                const questionDiv = createQuestionResultCard(result, index + 3);
                container.insertBefore(questionDiv, loadMoreDiv);
            });
            loadMoreDiv.remove();
        });
    }
}

function createQuestionResultCard(result, index) {
    const { question, userAnswer, isCorrect } = result;
    const div = document.createElement('div');
    div.className = `question-result ${isCorrect ? 'correct' : 'incorrect'}`;

    const stars = '⭐'.repeat(question.difficulty);
    const level = question.difficulty === 1 ? 'Basique' : question.difficulty === 2 ? 'Intermédiaire' : 'Avancé';
    const letters = ['A', 'B', 'C', 'D'];

    let html = `
        <div class="result-header">
            <div class="result-badge ${isCorrect ? 'correct-badge' : 'incorrect-badge'}">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    ${isCorrect ?
            '<polyline points="20 6 9 17 4 12"></polyline>' :
            '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
        }
                </svg>
            </div>
            <div class="result-info">
                <h4>Question ${index + 1}</h4>
                <p class="question-difficulty">${stars} ${level} · ${question.points} point${question.points > 1 ? 's' : ''}</p>
            </div>
            <span class="points-earned ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect ? '+' + question.points : '0'}
            </span>
        </div>
        <p class="question-brief">${question.text}</p>
    `;

    if (userAnswer !== undefined) {
        html += `
            <div class="answer-info">
                <span class="answer-label">Votre réponse:</span>
                <span class="answer-value ${isCorrect ? 'correct' : 'incorrect'}">
                    ${letters[userAnswer]} - ${question.options[userAnswer]}
                </span>
            </div>
        `;
    } else {
        html += `
            <div class="answer-info">
                <span class="answer-label">Votre réponse:</span>
                <span class="answer-value incorrect">Non répondue</span>
            </div>
        `;
    }

    if (!isCorrect) {
        html += `
            <div class="answer-info">
                <span class="answer-label">Réponse correcte:</span>
                <span class="answer-value correct">
                    ${letters[question.correct]} - ${question.options[question.correct]}
                </span>
            </div>
            <div class="explanation-box">
                <div class="explanation-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4M12 8h.01"></path>
                    </svg>
                    Explication
                </div>
                <p>${question.explanation}</p>
            </div>
        `;
    }

    div.innerHTML = html;
    return div;
}

function displayPerformanceByLevel(results) {
    const byLevel = { 1: { total: 0, correct: 0 }, 2: { total: 0, correct: 0 }, 3: { total: 0, correct: 0 } };

    results.forEach(result => {
        const level = result.question.difficulty;
        byLevel[level].total++;
        if (result.isCorrect) {
            byLevel[level].correct++;
        }
    });

    // Mettre à jour l'affichage
    const perfItems = document.querySelectorAll('.performance-item');
    perfItems.forEach((item, index) => {
        const level = index + 1;
        const data = byLevel[level];
        const percentage = data.total > 0 ? (data.correct / data.total) * 100 : 0;

        const fill = item.querySelector('.perf-fill');
        const score = item.querySelector('.perf-score');

        fill.style.width = `${percentage}%`;
        score.textContent = `${data.correct}/${data.total}`;
    });
}

function setupActionButtons() {
    // Bouton Refaire le test
    const retakeBtn = document.querySelector('.action-buttons .btn-primary');
    if (retakeBtn) {
        retakeBtn.addEventListener('click', function () {
            localStorage.removeItem('testResults');
            window.location.href = 'test.html';
        });
    }

    // Bouton Télécharger PDF
    const pdfBtn = document.querySelectorAll('.action-buttons .btn-outline')[0];
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function () {
            alert('Fonctionnalité de téléchargement PDF à venir !');
        });
    }

    // Bouton Partager
    const shareBtn = document.querySelectorAll('.action-buttons .btn-outline')[1];
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const resultsData = JSON.parse(localStorage.getItem('testResults'));
            const text = `J'ai obtenu ${resultsData.percentage}% au test d'Optique Géométrique !`;

            if (navigator.share) {
                navigator.share({
                    title: 'Résultats du test',
                    text: text
                });
            } else {
                alert(text);
            }
        });
    }
}
