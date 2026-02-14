# Guide d'Extension de la Plateforme

## 📚 Table des matières

1. [Ajouter des questions aux tests](#1-ajouter-des-questions-aux-tests)
2. [Ajouter des documents (TD, Examens, Corrections)](#2-ajouter-des-documents)
3. [Ajouter des simulations de TP](#3-ajouter-des-simulations-de-tp)
4. [Créer de nouveaux modules de tests](#4-créer-de-nouveaux-modules)

---

## 1. Ajouter des questions aux tests

### 📍 Localisation
Ouvrez le fichier : `test.js`

### ✏️ Format d'une question

```javascript
{
    id: 1,                    // Numéro unique
    text: "Question ici ?",   // Énoncé de la question
    options: [                // 4 options de réponse
        "Option A",
        "Option B",
        "Option C",
        "Option D"
    ],
    correct: 1,               // Index de la réponse correcte (0=A, 1=B, 2=C, 3=D)
    difficulty: 2,            // 1=Basique, 2=Intermédiaire, 3=Avancé
    points: 2,                // Points attribués
    explanation: "Text..."    // Explication de la réponse
}
```

### 📝 Exemple : Ajouter une question

**Ouvrez `test.js` et localisez l'array `questions`** :

```javascript
const questions = [
    // Questions existantes...
    
    // NOUVELLE QUESTION À AJOUTER :
    {
        id: 13,
        text: "Quelle est la vitesse de la lumière dans le vide ?",
        options: [
            "3 × 10⁸ m/s",
            "3 × 10⁶ m/s",
            "3 × 10¹⁰ m/s",
            "3 × 10⁵ m/s"
        ],
        correct: 0,
        difficulty: 1,
        points: 1,
        explanation: "La vitesse de la lumière dans le vide est c = 3 × 10⁸ m/s (environ 300 000 km/s)"
    }
];
```

### 🔢 Modifier le nombre total de questions

Le système s'adapte **automatiquement** au nombre de questions dans l'array.

### ✅ Bonnes pratiques

1. **IDs uniques** : Chaque question doit avoir un ID unique
2. **4 options** : Toujours fournir exactement 4 options (A, B, C, D)
3. **Index correct** : 0 pour A, 1 pour B, 2 pour C, 3 pour D
4. **Explications claires** : Aidez les étudiants à comprendre
5. **Formules LaTeX** : Utilisez `n₁`, `θ`, `≈` pour les symboles mathématiques

---

## 2. Ajouter des documents (TD, Examens, Corrections)

### 🎯 Objectif
Créer une section "Ressources" dans le tableau de bord avec accès aux documents.

### 📁 Étape 1 : Créer un dossier pour les documents

Créez un dossier `resources` dans le même répertoire que vos fichiers HTML :

```
📁 plateforme-physique/
  📄 index.html
  📄 dashboard.html
  📄 test.html
  📄 results.html
  📁 resources/
    📁 optique/
      📄 TD1_Reflexion_Refraction.pdf
      📄 TD1_Correction.pdf
      📄 Examen_Blanc_Optique.pdf
      📄 Correction_Examen_Blanc.pdf
    📁 electrostatique/
      📄 TD1_Loi_Coulomb.pdf
      📄 TD1_Correction.pdf
    📁 electrocinetique/
      📄 TD1_Loi_Ohm.pdf
    📁 magnetisme/
      📄 TD1_Champ_Magnetique.pdf
```

### 📝 Étape 2 : Modifier le tableau de bord

**Ouvrez `dashboard.html` et ajoutez cette section AVANT la fermeture de `<main>` :**

```html
<!-- Section Ressources -->
<section class="resources-section">
    <h3 class="section-title">📚 Ressources Pédagogiques</h3>
    
    <!-- Optique Géométrique -->
    <div class="resource-module">
        <h4 class="resource-module-title">
            <span class="module-icon-small optics">🔵</span>
            Optique Géométrique
        </h4>
        <div class="resource-grid">
            <div class="resource-card">
                <div class="resource-icon">📝</div>
                <div class="resource-info">
                    <h5>TD 1 - Réflexion et Réfraction</h5>
                    <p class="resource-meta">PDF · 2.3 MB</p>
                </div>
                <a href="resources/optique/TD1_Reflexion_Refraction.pdf" 
                   download class="btn-download">
                    Télécharger
                </a>
            </div>
            
            <div class="resource-card">
                <div class="resource-icon">✓</div>
                <div class="resource-info">
                    <h5>Correction TD 1</h5>
                    <p class="resource-meta">PDF · 1.8 MB</p>
                </div>
                <a href="resources/optique/TD1_Correction.pdf" 
                   download class="btn-download">
                    Télécharger
                </a>
            </div>
            
            <div class="resource-card">
                <div class="resource-icon">📋</div>
                <div class="resource-info">
                    <h5>Examen Blanc</h5>
                    <p class="resource-meta">PDF · 1.5 MB</p>
                </div>
                <a href="resources/optique/Examen_Blanc_Optique.pdf" 
                   download class="btn-download">
                    Télécharger
                </a>
            </div>
            
            <div class="resource-card">
                <div class="resource-icon">✓</div>
                <div class="resource-info">
                    <h5>Correction Examen Blanc</h5>
                    <p class="resource-meta">PDF · 2.1 MB</p>
                </div>
                <a href="resources/optique/Correction_Examen_Blanc.pdf" 
                   download class="btn-download">
                    Télécharger
                </a>
            </div>
        </div>
    </div>
    
    <!-- Répétez pour les autres modules... -->
</section>
```

### 🎨 Étape 3 : Ajouter les styles CSS

**Ouvrez `dashboard.css` et ajoutez à la fin :**

```css
/* Section Ressources */
.resources-section {
    margin-top: 3rem;
}

.resource-module {
    background: white;
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
}

.resource-module-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1.25rem;
}

.module-icon-small {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}

.module-icon-small.optics {
    background: rgba(59, 130, 246, 0.1);
}

.resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}

.resource-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--background);
    border-radius: var(--radius-md);
    border: 2px solid transparent;
    transition: var(--transition);
}

.resource-card:hover {
    border-color: var(--primary-color);
    background: white;
    box-shadow: var(--shadow-sm);
}

.resource-icon {
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.resource-info {
    flex: 1;
}

.resource-info h5 {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.resource-meta {
    font-size: 0.813rem;
    color: var(--text-secondary);
}

.btn-download {
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    color: white;
    border-radius: 20px;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: var(--transition);
    white-space: nowrap;
}

.btn-download:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
}
```

---

## 3. Ajouter des simulations de TP

### 🔬 Options pour les simulations

#### **Option A : Utiliser PhET (Recommandé)**

PhET propose des simulations HTML5 gratuites et de haute qualité.

**Étape 1 : Télécharger les simulations**
1. Visitez : https://phet.colorado.edu/fr/simulations/filter?type=html
2. Cherchez des simulations pertinentes :
   - "Loi de Snell" (Réfraction)
   - "Miroirs et Lentilles"
   - "Loi de Coulomb"
   - "Champ Électrique"
   - "Loi d'Ohm"
   - "Aimant et Boussole"
3. Téléchargez les fichiers HTML

**Étape 2 : Organiser les fichiers**

```
📁 simulations/
  📁 optique/
    📄 refraction_phet.html
    📄 lentilles_phet.html
  📁 electrostatique/
    📄 loi_coulomb_phet.html
    📄 champ_electrique_phet.html
  📁 electrocinetique/
    📄 loi_ohm_phet.html
  📁 magnetisme/
    📄 aimant_boussole_phet.html
```

**Étape 3 : Créer une page de simulations**

Créez un nouveau fichier `simulations.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulations - Plateforme Physique UCD</title>
    <link rel="stylesheet" href="dashboard.css">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-left">
                <div class="logo">UCD</div>
                <h1 class="nav-title">Simulations Interactives</h1>
            </div>
            <a href="dashboard.html" class="btn-back">← Retour</a>
        </div>
    </nav>

    <main class="dashboard-main">
        <div class="container">
            <h2 class="section-title">🔬 Laboratoire Virtuel</h2>
            
            <!-- Optique -->
            <div class="simulation-section">
                <h3>Optique Géométrique</h3>
                <div class="simulation-grid">
                    <div class="simulation-card">
                        <img src="preview-refraction.jpg" alt="Réfraction">
                        <h4>Réfraction de la lumière</h4>
                        <p>Explorez la loi de Snell-Descartes</p>
                        <a href="simulations/optique/refraction_phet.html" 
                           class="btn btn-primary">
                            Lancer la simulation
                        </a>
                    </div>
                    
                    <div class="simulation-card">
                        <img src="preview-lentilles.jpg" alt="Lentilles">
                        <h4>Lentilles et Miroirs</h4>
                        <p>Formation d'images avec lentilles</p>
                        <a href="simulations/optique/lentilles_phet.html" 
                           class="btn btn-primary">
                            Lancer la simulation
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Électrostatique -->
            <div class="simulation-section">
                <h3>Électrostatique</h3>
                <div class="simulation-grid">
                    <div class="simulation-card">
                        <h4>Loi de Coulomb</h4>
                        <p>Forces entre charges électriques</p>
                        <a href="simulations/electrostatique/loi_coulomb_phet.html" 
                           class="btn btn-primary">
                            Lancer la simulation
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
```

**Étape 4 : Ajouter le lien dans le dashboard**

Dans `dashboard.html`, ajoutez un bouton dans le header :

```html
<div class="header-actions">
    <a href="simulations.html" class="btn btn-outline">
        <svg class="btn-icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        Simulations TP
    </a>
</div>
```

#### **Option B : Créer vos propres simulations simples**

Pour des simulations basiques, vous pouvez utiliser Canvas/JavaScript.

**Exemple : Simulation de réflexion**

Créez `simulation_reflexion.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Simulation - Réflexion</title>
    <style>
        body {
            font-family: Inter, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background: #f9fafb;
        }
        
        canvas {
            border: 2px solid #e5e7eb;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .controls {
            margin-top: 1.5rem;
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        label {
            font-weight: 600;
        }
        
        input[type="range"] {
            width: 200px;
        }
    </style>
</head>
<body>
    <h1>Loi de la Réflexion</h1>
    <canvas id="canvas" width="600" height="400"></canvas>
    
    <div class="controls">
        <label>Angle d'incidence : <span id="angleValue">30°</span></label>
        <input type="range" id="angleSlider" min="0" max="89" value="30">
    </div>
    
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const angleSlider = document.getElementById('angleSlider');
        const angleValue = document.getElementById('angleValue');
        
        function draw() {
            const angle = parseInt(angleSlider.value);
            angleValue.textContent = angle + '°';
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Surface réfléchissante
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, 200);
            ctx.lineTo(600, 200);
            ctx.stroke();
            
            // Normale
            ctx.strokeStyle = '#9ca3af';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(300, 0);
            ctx.lineTo(300, 400);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Rayon incident
            const rad = angle * Math.PI / 180;
            const x1 = 300 - 150 * Math.sin(rad);
            const y1 = 200 - 150 * Math.cos(rad);
            
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(300, 200);
            ctx.stroke();
            
            // Rayon réfléchi
            const x2 = 300 + 150 * Math.sin(rad);
            const y2 = 200 + 150 * Math.cos(rad);
            
            ctx.strokeStyle = '#10b981';
            ctx.beginPath();
            ctx.moveTo(300, 200);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            
            // Labels
            ctx.fillStyle = '#1f2937';
            ctx.font = '14px Inter';
            ctx.fillText('i = ' + angle + '°', x1 - 40, y1 - 10);
            ctx.fillText('r = ' + angle + '°', x2 + 10, y2 + 20);
        }
        
        angleSlider.addEventListener('input', draw);
        draw();
    </script>
</body>
</html>
```

---

## 4. Créer de nouveaux modules de tests

### 📋 Pour ajouter un module complet (ex: Électrostatique)

**Étape 1 : Créer un nouveau fichier de test**

Dupliquez `test.js` → `test_electrostatique.js`

**Étape 2 : Modifier les questions**

Remplacez l'array `questions` avec vos questions d'électrostatique.

**Étape 3 : Créer une nouvelle page HTML**

Dupliquez `test.html` → `test_electrostatique.html`

Modifiez la ligne du script :
```html
<script src="test_electrostatique.js"></script>
```

**Étape 4 : Lien depuis le dashboard**

Dans `dashboard.js`, modifiez les boutons pour rediriger vers le bon test :

```javascript
startButtons.forEach(button => {
    button.addEventListener('click', function() {
        const module = button.closest('.module-card').dataset.module;
        window.location.href = `test_${module}.html`;
    });
});
```

Dans `dashboard.html`, ajoutez `data-module` :

```html
<div class="module-card module-electrostatics" data-module="electrostatique">
    <!-- contenu -->
</div>
```

---

## 📌 Résumé des fichiers à créer/modifier

### Pour ajouter des questions :
- ✏️ Modifier : `test.js`

### Pour ajouter des documents :
- 📁 Créer : dossier `resources/`
- ✏️ Modifier : `dashboard.html`
- ✏️ Modifier : `dashboard.css`

### Pour ajouter des simulations :
- 📁 Créer : dossier `simulations/`
- 📄 Créer : `simulations.html`
- 📄 Télécharger : simulations PhET
- ✏️ Modifier : `dashboard.html` (ajouter lien)

---

## ✅ Checklist de déploiement

- [ ] Questions ajoutées dans `test.js`
- [ ] Dossier `resources/` créé avec PDF
- [ ] Section ressources ajoutée au dashboard
- [ ] Styles CSS pour ressources ajoutés
- [ ] Dossier `simulations/` créé
- [ ] Simulations PhET téléchargées
- [ ] Page `simulations.html` créée
- [ ] Lien vers simulations ajouté au dashboard
- [ ] Tests fonctionnels effectués

---

**Besoin d'aide pour une étape spécifique ? N'hésitez pas à demander !** 🚀
