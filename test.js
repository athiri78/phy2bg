// Banque de questions multi-modules
const questionBanks = {
    // I. OPTIQUE GÉOMÉTRIQUE (20 questions)
    'optique_general': {
        title: "Optique Géométrique",
        subtitle: "Réflexion - Réfraction - Miroirs - Lentilles",
        questions: [
            { id: 1, text: "Dans un milieu homogène et isotrope, la lumière se propage :", options: ["En ligne courbe", "En ligne droite", "De manière aléatoire", "En zigzag"], correct: 1, difficulty: 1, points: 1 },
            { id: 2, text: "L'indice de réfraction absolu n d'un milieu est défini par (c=célérité vide, v=vitesse milieu) :", options: ["n = v/c", "n = c × v", "n = c/v", "n = v - c"], correct: 2, difficulty: 1, points: 1 },
            { id: 3, text: "Lors de la réflexion sur un miroir plan, l'angle de réflexion est :", options: ["Égal à l'angle d'incidence", "Double de l'angle d'incidence", "La moitié de l'angle d'incidence", "Indépendant de l'incidence"], correct: 0, difficulty: 1, points: 1 },
            { id: 4, text: "La loi de Snell-Descartes pour la réfraction s'écrit :", options: ["n1 sin(i1) = n2 sin(i2)", "n1 cos(i1) = n2 cos(i2)", "n1 + i1 = n2 + i2", "sin(i1)/n1 = sin(i2)/n2"], correct: 0, difficulty: 1, points: 1 },
            { id: 5, text: "Le phénomène de réflexion totale ne peut observer que si la lumière passe :", options: ["D'un milieu moins réfringent vers un plus réfringent", "D'un milieu plus réfringent vers un moins réfringent", "Entre deux milieux d'indices égaux", "Dans le vide"], correct: 1, difficulty: 2, points: 1 },
            { id: 6, text: "L'angle limite λ est donné par :", options: ["sin(λ) = n1/n2 (avec n1<n2)", "sin(λ) = n2/n1 (avec n2<n1)", "tan(λ) = n2/n1", "cos(λ) = n1/n2"], correct: 1, difficulty: 2, points: 2 },
            { id: 7, text: "Une image virtuelle :", options: ["Peut être recueillie sur un écran", "Ne peut pas être vue à l'œil nu", "Ne peut pas être recueillie sur un écran", "Est toujours inversée"], correct: 2, difficulty: 1, points: 1 },
            { id: 8, text: "L'image d'un objet réel par un miroir plan est :", options: ["Réelle et renversée", "Virtuelle et droite", "Réelle et droite", "Virtuelle et renversée"], correct: 1, difficulty: 1, points: 1 },
            { id: 9, text: "Pour un miroir sphérique de rayon R, la distance focale f est :", options: ["R", "2R", "R/2", "R²"], correct: 2, difficulty: 1, points: 1 },
            { id: 10, text: "Un miroir concave donne d'un objet réel situé à l'infini une image :", options: ["Virtuelle au foyer", "Réelle au centre", "Réelle au foyer", "Virtuelle au centre"], correct: 2, difficulty: 2, points: 1 },
            { id: 11, text: "La vergence C d'une lentille est l'inverse de :", options: ["Son diamètre", "Son indice", "Sa distance focal image", "Son rayon de courbure"], correct: 2, difficulty: 1, points: 1 },
            { id: 12, text: "L'unité de la vergence est :", options: ["Le Mètre", "La Dioptrie", "Le Radian", "Le Degré"], correct: 1, difficulty: 1, points: 1 },
            { id: 13, text: "Une lentille convergente a une distance focale :", options: ["Positive", "Négative", "Nulle", "Infinie"], correct: 0, difficulty: 1, points: 1 },
            { id: 14, text: "La formule de conjugaison de Descartes (origine au centre optique) est :", options: ["1/OA' + 1/OA = 1/f'", "1/OA' - 1/OA = 1/f'", "1/OA - 1/OA' = 1/f'", "OA' - OA = f'"], correct: 1, difficulty: 2, points: 2 },
            { id: 15, text: "Le grandissement transversal γ est défini par :", options: ["A'B'/AB = OA'/OA", "AB/A'B' = OA/OA'", "A'B'/AB = -OA'/OA", "A'B' × AB = 1"], correct: 0, difficulty: 2, points: 1 },
            { id: 16, text: "Si le grandissement γ = -2, l'image est :", options: ["Droite et agrandie", "Renversée et agrandie", "Droite et réduite", "Renversée et réduite"], correct: 1, difficulty: 2, points: 1 },
            { id: 17, text: "Pour corriger la myopie, on utilise une lentille :", options: ["Convergente", "Divergente", "Cylindrique", "Opaque"], correct: 1, difficulty: 2, points: 1 },
            { id: 18, text: "Une loupe est constituée d'une lentille :", options: ["Divergente de forte vergence", "Convergente de faible vergence", "Convergente de forte vergence", "Divergente de faible vergence"], correct: 2, difficulty: 2, points: 1 },
            { id: 19, text: "Dans un microscope, l'objectif donne une image intermédiaire :", options: ["Virtuelle et droite", "Réelle et agrandie", "Virtuelle et réduite", "Réelle et réduite"], correct: 1, difficulty: 3, points: 2 },
            { id: 20, text: "La fibre optique guide la lumière grâce à :", options: ["La réfraction", "La réflexion totale", "La diffusion", "L'absorption"], correct: 1, difficulty: 1, points: 1 }
        ]
    },

    // I. ÉLECTRICITÉ & ÉLECTROCINÉTIQUE (20 questions)
    'electrocinetique_general': {
        title: "Électrocinétique",
        subtitle: "Association des résistances – Thévenin – Circuit RC",
        questions: [
            { id: 1, text: "Deux résistances en série ont pour résistance équivalente :", options: ["La somme des résistances", "La moyenne", "Le produit", "L’inverse de la somme"], correct: 0, difficulty: 1, points: 1 },
            { id: 2, text: "Deux résistances en parallèle ont une résistance équivalente :", options: ["Plus grande que chaque résistance", "Égale à la plus grande", "Plus petite que la plus petite résistance", "Égale à la somme"], correct: 2, difficulty: 1, points: 1 },
            { id: 3, text: "Deux résistances 10Ω et 20Ω en série donnent :", options: ["5 Ω", "15 Ω", "30 Ω", "200 Ω"], correct: 2, difficulty: 1, points: 1 },
            { id: 4, text: "Deux résistances 6Ω et 3Ω en parallèle donnent :", options: ["9 Ω", "4 Ω", "2 Ω", "1 Ω"], correct: 2, difficulty: 2, points: 2 },
            { id: 5, text: "En montage parallèle, la tension est :", options: ["Différente dans chaque branche", "Nulle", "La même dans chaque branche", "Proportionnelle au courant"], correct: 2, difficulty: 1, points: 1 },
            { id: 6, text: "Le théorème de Thévenin remplace un circuit par :", options: ["Une source de courant", "Une résistance seule", "Une source de tension + résistance en série", "Un condensateur"], correct: 2, difficulty: 2, points: 1 },
            { id: 7, text: "La tension de Thévenin est :", options: ["La tension en charge", "La tension à vide", "La tension du générateur réel", "La tension nulle"], correct: 1, difficulty: 2, points: 1 },
            { id: 8, text: "La résistance de Thévenin est déterminée en :", options: ["Ajoutant une charge", "Ouvrant le circuit", "Annulant les sources indépendantes", "Augmentant la tension"], correct: 2, difficulty: 3, points: 2 },
            { id: 9, text: "Dans un circuit RC, la constante de temps est :", options: ["R + C", "R/C", "R × C", "C/R"], correct: 2, difficulty: 1, points: 1 },
            { id: 10, text: "L’unité de la constante de temps est :", options: ["Ohm", "Farad", "Seconde", "Volt"], correct: 2, difficulty: 1, points: 1 },
            { id: 11, text: "La charge du condensateur suit une loi :", options: ["Linéaire", "Quadratique", "Exponentielle croissante", "Sinusoïdale"], correct: 2, difficulty: 1, points: 1 },
            { id: 12, text: "Après 5τ, le condensateur est :", options: ["Déchargé", "À moitié chargé", "Presque totalement chargé", "Toujours vide"], correct: 2, difficulty: 1, points: 1 },
            { id: 13, text: "En régime permanent, le condensateur se comporte comme :", options: ["Une résistance", "Un fil", "Un interrupteur ouvert", "Un générateur"], correct: 2, difficulty: 2, points: 1 },
            { id: 14, text: "Si R = 1kΩ et C = 10µF, alors τ =", options: ["0,01 s", "0,1 s", "10 s", "0,01 s"], correct: 1, difficulty: 2, points: 2 },
            { id: 15, text: "Le courant dans un circuit RC lors de la charge :", options: ["Augmente", "Reste constant", "Diminue exponentiellement", "Est nul"], correct: 2, difficulty: 2, points: 1 },
            { id: 16, text: "Une résistance ajoutée en série :", options: ["Diminue le courant", "Augmente le courant", "Ne change rien", "Annule la tension"], correct: 0, difficulty: 1, points: 1 },
            { id: 17, text: "La loi d’Ohm s’écrit :", options: ["U = R/I", "I = R/U", "U = R I", "R = UI"], correct: 2, difficulty: 1, points: 1 },
            { id: 18, text: "L’unité de la résistance est :", options: ["Volt", "Ampère", "Ohm", "Watt"], correct: 2, difficulty: 1, points: 1 },
            { id: 19, text: "Un court-circuit correspond à :", options: ["Une résistance très grande", "Une résistance nulle ou très faible", "Un circuit ouvert", "Un générateur"], correct: 1, difficulty: 1, points: 1 },
            { id: 20, text: "Le théorème de Thévenin est valable pour :", options: ["Tous les circuits", "Les circuits non linéaires", "Les circuits linéaires", "Les champs"], correct: 2, difficulty: 2, points: 1 }
        ]
    },

    // II. ÉLECTROSTATIQUE (20 questions)
    'electrostatique_coulomb': {
        title: "Électrostatique",
        subtitle: "Loi de Coulomb – Superposition – Dipôle électrique",
        questions: [
            { id: 1, text: "La loi de Coulomb décrit :", options: ["Les courants", "Les forces entre charges", "Les champs magnétiques", "Les résistances"], correct: 1, difficulty: 1, points: 1 },
            { id: 2, text: "La force électrostatique dépend :", options: ["De la distance", "Du produit des charges", "Des deux", "Du champ magnétique"], correct: 2, difficulty: 2, points: 1 },
            { id: 3, text: "Si la distance double, la force devient :", options: ["Double", "Divisée par 2", "Divisée par 4", "Inchangée"], correct: 2, difficulty: 2, points: 2 },
            { id: 4, text: "Deux charges de signes opposés :", options: ["Se repoussent", "S’attirent", "S’annulent", "Ne réagissent pas"], correct: 1, difficulty: 1, points: 1 },
            { id: 5, text: "L’unité de la charge électrique est :", options: ["Volt", "Ampère", "Coulomb", "Newton"], correct: 2, difficulty: 1, points: 1 },
            { id: 6, text: "Le champ électrique est une grandeur :", options: ["Scalaire", "Vectorielle", "Sans unité", "Constante"], correct: 1, difficulty: 2, points: 1 },
            { id: 7, text: "Le principe de superposition signifie :", options: ["Addition des charges", "Somme vectorielle des forces", "Produit des forces", "Annulation des forces"], correct: 1, difficulty: 2, points: 1 },
            { id: 8, text: "Le champ total créé par plusieurs charges est :", options: ["Le champ maximum", "La somme vectorielle des champs", "Le champ moyen", "Le champ nul"], correct: 1, difficulty: 2, points: 2 },
            { id: 9, text: "Le potentiel électrique s’exprime en :", options: ["Joule", "Coulomb", "Volt", "Newton"], correct: 2, difficulty: 1, points: 1 },
            { id: 10, text: "Le champ électrique est dirigé :", options: ["Du – vers le +", "Du + vers le –", "Verticalement", "Aléatoirement"], correct: 1, difficulty: 2, points: 1 },
            { id: 11, text: "Un dipôle électrique est constitué de :", options: ["Deux charges identiques", "Deux charges opposées séparées", "Une charge", "Un courant"], correct: 1, difficulty: 1, points: 1 },
            { id: 12, text: "Le moment dipolaire dépend :", options: ["De la charge seule", "De la distance seule", "De la charge et de la distance", "Du champ"], correct: 2, difficulty: 2, points: 1 },
            { id: 13, text: "Le champ d’un dipôle est :", options: ["Uniforme", "Nul", "Non uniforme", "Constant"], correct: 2, difficulty: 3, points: 2 },
            { id: 14, text: "L’électrisation par frottement est :", options: ["Une création de charges", "Un échange de charges", "Une destruction", "Une ionisation"], correct: 1, difficulty: 1, points: 1 },
            { id: 15, text: "Un conducteur électrostatique permet :", options: ["Le mouvement libre des charges", "Le blocage des charges", "L’annulation du champ", "La création d’énergie"], correct: 0, difficulty: 1, points: 1 },
            { id: 16, text: "Un isolant électrique :", options: ["Conduit le courant", "Bloque le déplacement des charges", "Amplifie le champ", "Crée des charges"], correct: 1, difficulty: 1, points: 1 },
            { id: 17, text: "Le champ électrique d’une charge ponctuelle est :", options: ["Proportionnel à la distance", "Inversement proportionnel à r²", "Constant", "Nul"], correct: 1, difficulty: 2, points: 1 },
            { id: 18, text: "Le potentiel est une grandeur :", options: ["Vectorielle", "Scalaire", "Tensorielle", "Magnétique"], correct: 1, difficulty: 2, points: 1 },
            { id: 19, text: "La force électrostatique est :", options: ["Toujours attractive", "Toujours répulsive", "Attractive ou répulsive", "Toujours nulle"], correct: 2, difficulty: 1, points: 1 },
            { id: 20, text: "La loi de Coulomb est valable dans :", options: ["Le vide et les milieux linéaires", "Les conducteurs", "Les circuits", "Les aimants"], correct: 0, difficulty: 3, points: 1 }
        ]
    },

    // III. ÉLECTROMAGNÉTISME (20 questions)
    'magnetisme_forces': {
        title: "Magnétostatique",
        subtitle: "Mouvement des particules – Champs E et B – Spectromètre de masse",
        questions: [
            { id: 1, text: "Une particule chargée dans un champ électrique subit :", options: ["Une force constante", "Une force nulle", "Une force circulaire", "Une force variable"], correct: 0, difficulty: 1, points: 1 },
            { id: 2, text: "Dans un champ électrique uniforme, la trajectoire est :", options: ["Rectiligne uniforme", "Circulaire", "Parabolique", "Hélicoïdale"], correct: 2, difficulty: 2, points: 2 },
            { id: 3, text: "La force de Lorentz s’écrit :", options: ["qE", "qvB", "q(E + v × B)", "qEB"], correct: 2, difficulty: 2, points: 1 },
            { id: 4, text: "Dans un champ magnétique seul, la force est :", options: ["Parallèle à la vitesse", "Nulle", "Perpendiculaire à la vitesse", "Tangente"], correct: 2, difficulty: 1, points: 1 },
            { id: 5, text: "Une particule entrant perpendiculairement dans B décrit :", options: ["Une droite", "Une parabole", "Un cercle", "Une ellipse"], correct: 2, difficulty: 2, points: 1 },
            { id: 6, text: "Le rayon de la trajectoire dépend de :", options: ["La masse", "La vitesse", "Le champ", "Tous les précédents"], correct: 3, difficulty: 2, points: 2 },
            { id: 7, text: "Si la masse augmente, le rayon :", options: ["Diminue", "Reste constant", "Augmente", "Devient nul"], correct: 2, difficulty: 2, points: 1 },
            { id: 8, text: "Le champ magnétique s’exprime en :", options: ["Volt", "Tesla", "Ampère", "Coulomb"], correct: 1, difficulty: 1, points: 1 },
            { id: 9, text: "Un champ magnétique est créé par :", options: ["Une charge immobile", "Un courant électrique", "Une résistance", "Une tension"], correct: 1, difficulty: 1, points: 1 },
            { id: 10, text: "Le spectromètre de masse permet de séparer les ions selon :", options: ["Leur énergie", "Leur vitesse", "Leur rapport masse/charge", "Leur charge seule"], correct: 2, difficulty: 2, points: 1 },
            { id: 11, text: "Le champ électrique dans un spectromètre sert à :", options: ["Dévier", "Accélérer les particules", "Les arrêter", "Les refroidir"], correct: 1, difficulty: 2, points: 1 },
            { id: 12, text: "Le champ magnétique sert à :", options: ["Accélérer", "Dévier selon la masse", "Annuler la vitesse", "Créer des ions"], correct: 1, difficulty: 2, points: 1 },
            { id: 13, text: "Si la charge augmente, la force magnétique :", options: ["Diminue", "Reste constant", "Augmente", "Devient nulle"], correct: 2, difficulty: 1, points: 1 },
            { id: 14, text: "La force magnétique est nulle si :", options: ["v = 0", "B = 0", "v // B", "Toutes les réponses"], correct: 3, difficulty: 2, points: 2 },
            { id: 15, text: "La trajectoire hélicoïdale apparaît lorsque :", options: ["v ⟂ B", "v // B", "v a deux composantes", "B = 0"], correct: 2, difficulty: 3, points: 2 },
            { id: 16, text: "La force de Lorentz ne modifie pas :", options: ["La direction", "La vitesse", "L’énergie cinétique", "La trajectoire"], correct: 2, difficulty: 2, points: 1 },
            { id: 17, text: "Le mouvement circulaire est :", options: ["Uniformément accéléré", "Uniforme", "Parabolique", "Oscillatoire"], correct: 1, difficulty: 2, points: 1 },
            { id: 18, text: "L’induction électromagnétique est liée à :", options: ["Champ constant", "Variation du champ magnétique", "Courant continu", "Résistance"], correct: 1, difficulty: 2, points: 1 },
            { id: 19, text: "Un ion positif est dévié dans le sens :", options: ["Du champ", "Opposé au champ", "Donné par la règle de la main droite", "Aléatoire"], correct: 2, difficulty: 2, points: 1 },
            { id: 20, text: "Le spectromètre de masse est utilisé pour :", options: ["Mesurer des tensions", "Identifier des isotopes", "Étudier les circuits", "Étudier les ondes"], correct: 1, difficulty: 1, points: 1 }
        ]
    }
};

// Variables globales et Logique
let currentQuestionsData = [];
let questions = [];
let currentQuestion = 0;
let answers = {};
let startTime;
let timerInterval;
const testDuration = 30 * 60; // 30 minutes (20 questions)

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const module = urlParams.get('module');
    const chapter = urlParams.get('chapter');

    // Détermination de la banque de questions à utiliser
    let bankKey = 'optique_general'; // Défaut modifié pour être optique_general

    if (module) {
        // Mapping simplifié pour la démo
        if (module === 'electrocinetique') bankKey = 'electrocinetique_general';
        else if (module === 'electrostatique') bankKey = 'electrostatique_coulomb';
        else if (module === 'magnetisme') bankKey = 'magnetisme_forces';
        else if (module === 'optique') bankKey = 'optique_general';

        // Support pour clé précise
        let exactKey = `${module}_${chapter}`;
        if (questionBanks[exactKey]) bankKey = exactKey;
    }

    const testData = questionBanks[bankKey];
    if (!testData) {
        alert("Erreur: Test introuvable. Chargement du test par défaut.");
        // Fallback sûr
        if (questionBanks['optique_general']) {
            questions = questionBanks['optique_general'].questions;
            currentQuestionsData = questionBanks['optique_general'];
        } else {
            // Au cas où
            questions = questionBanks[Object.keys(questionBanks)[0]].questions;
            currentQuestionsData = questionBanks[Object.keys(questionBanks)[0]];
        }
    } else {
        questions = testData.questions;
        currentQuestionsData = testData;
    }

    // Mise à jour de l'interface
    document.querySelector('.test-title').textContent = `Test - ${currentQuestionsData.title}`;
    document.querySelector('.test-subtitle').textContent = currentQuestionsData.subtitle;
    document.querySelector('.total-q').textContent = questions.length;

    // Démarrage
    startTime = Date.now();
    startTimer();
    loadQuestion(0);
    setupEventListeners();
    updateProgress();
    updateMinimapUI();
});

// Chronomètre
function startTimer() {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = testDuration - elapsed;

    if (remaining <= 0) {
        clearInterval(timerInterval);
        submitTest();
        return;
    }

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timerText = document.querySelector('.timer-text');
    if (timerText) {
        timerText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Charger une question
function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;

    const question = questions[index];
    currentQuestion = index;

    // UI Updates
    document.querySelector('.current-q').textContent = index + 1;

    const difficultyBadge = document.querySelector('.difficulty-badge');
    difficultyBadge.className = `difficulty-badge difficulty-${question.difficulty}`;
    const stars = '⭐'.repeat(question.difficulty);
    const level = question.difficulty === 1 ? 'Basique' : question.difficulty === 2 ? 'Intermédiaire' : 'Avancé';
    difficultyBadge.textContent = `${stars} ${level}`;

    document.querySelector('.points-badge').textContent = `${question.points} point${question.points > 1 ? 's' : ''}`;
    document.querySelector('.question-text').textContent = question.text;

    // Mise à jour des options
    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    question.options.forEach((optText, i) => {
        const div = document.createElement('div');
        div.className = 'option-card';
        if (answers[index] === i) div.classList.add('option-selected');

        div.innerHTML = `
            <input type="radio" name="answer" id="opt-${i}" value="${letters[i]}" ${answers[index] === i ? 'checked' : ''}>
            <label for="opt-${i}">
                <span class="option-letter">${letters[i]}</span>
                <span class="option-text">${optText}</span>
                <span class="option-check">✓</span>
            </label>
        `;

        div.addEventListener('click', function () {
            answers[currentQuestion] = i;
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('option-selected'));
            div.classList.add('option-selected');
            div.querySelector('input').checked = true;

            updateMinimapState();
            updateProgress();
        });

        optionsContainer.appendChild(div);
    });

    updateMinimapState();
}

// Re-génération de la minimap
function updateMinimapUI() {
    const grid = document.querySelector('.questions-grid');
    grid.innerHTML = '';

    questions.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = 'question-mini';
        btn.textContent = idx + 1;
        btn.addEventListener('click', () => loadQuestion(idx));
        grid.appendChild(btn);
    });
    updateMinimapState();
}

function updateMinimapState() {
    const minis = document.querySelectorAll('.question-mini');
    minis.forEach((mini, idx) => {
        mini.className = 'question-mini';
        if (idx === currentQuestion) mini.classList.add('active');
        if (answers[idx] !== undefined) mini.classList.add('answered');
    });
}

function setupEventListeners() {
    const prevBtn = document.querySelector('.question-navigation .btn-secondary');
    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', () => loadQuestion(currentQuestion - 1));
    }

    const nextBtn = document.querySelector('.question-navigation .btn-primary');
    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', () => {
            if (currentQuestion < questions.length - 1) {
                loadQuestion(currentQuestion + 1);
            } else {
                showSubmitModal();
            }
        });
    }

    const clearBtn = document.querySelector('.btn-clear');
    if (clearBtn) {
        const newClear = clearBtn.cloneNode(true);
        clearBtn.parentNode.replaceChild(newClear, clearBtn);
        newClear.addEventListener('click', () => {
            delete answers[currentQuestion];
            loadQuestion(currentQuestion);
        });
    }

    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.onclick = showSubmitModal;
    }

    const exitBtn = document.querySelector('.btn-exit');
    if (exitBtn) {
        exitBtn.onclick = () => {
            if (confirm('Quitter ? Progression perdue.')) window.location.href = 'dashboard.html';
        };
    }
}

function updateProgress() {
    const count = Object.keys(answers).length;
    const pct = (count / questions.length) * 100;
    const bar = document.querySelector('.progress-bar');
    if (bar) bar.style.width = `${pct}%`;
}

function showSubmitModal() {
    const modal = document.getElementById('submitModal');
    const count = Object.keys(answers).length;
    modal.querySelector('p').innerHTML = `Réponses : <strong>${count} / ${questions.length}</strong>`;
    modal.style.display = 'flex';

    modal.querySelector('.btn-secondary').onclick = () => modal.style.display = 'none';
    modal.querySelector('.btn-primary').onclick = submitTest;
}

function submitTest() {
    clearInterval(timerInterval);

    let score = 0;
    let totalPts = 0;
    let correct = 0;

    const results = questions.map((q, idx) => {
        const ans = answers[idx];
        const isOk = ans === q.correct;
        totalPts += q.points;
        if (isOk) {
            score += q.points;
            correct++;
        }
        return { question: q, userAnswer: ans, isCorrect: isOk };
    });

    const summary = {
        results,
        correctCount: correct,
        totalQuestions: questions.length,
        earnedPoints: score,
        totalPoints: totalPts,
        percentage: Math.round((score / totalPts) * 100),
        testTitle: currentQuestionsData.title
    };

    localStorage.setItem('testResults', JSON.stringify(summary));

    saveToAdminDb(summary);

    window.location.href = 'results.html';
}

function saveToAdminDb(summary) {
    const db = JSON.parse(localStorage.getItem('test_results_db') || '[]');
    const uid = localStorage.getItem('user_id') || 'GUEST';
    const name = localStorage.getItem('user_name') || 'Invité';

    db.push({
        id: `RES${Date.now()}`,
        studentId: uid,
        studentName: name,
        module: summary.testTitle,
        score: summary.percentage,
        date: new Date().toISOString()
    });
    localStorage.setItem('test_results_db', JSON.stringify(db));
}
