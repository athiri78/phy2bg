# Maquettes - Plateforme d'Évaluation en Physique

## 📋 Vue d'ensemble

Ce dossier contient les **maquettes visuelles complètes** de la plateforme d'évaluation en physique pour l'**Université Chouaib Doukkali - Faculté des Sciences El Jadida**.

> **Contexte institutionnel :**
> - Université : Chouaib Doukkali
> - Faculté : Sciences El Jadida
> - Professeur : Abdellah Tahiri
> - Année universitaire : 2025/2026 - Semestre 2

---

## 📁 Fichiers inclus

### Pages HTML
1. **`index.html`** - Page d'accueil et connexion
2. **`dashboard.html`** - Tableau de bord étudiant
3. **`test.html`** - Interface de test (passage de QCM)
4. **`results.html`** - Page de résultats détaillés

### Feuilles de style CSS
1. **`styles.css`** - Styles de la page de connexion
2. **`dashboard.css`** - Styles du tableau de bord
3. **`test.css`** - Styles de l'interface de test
4. **`results.css`** - Styles de la page de résultats

---

## 🚀 Comment visualiser les maquettes

### Méthode 1 : Ouvrir directement dans le navigateur
1. Localisez les fichiers HTML dans le dossier artifacts
2. Double-cliquez sur n'importe quel fichier HTML
3. Il s'ouvrira dans votre navigateur par défaut

### Méthode 2 : Navigation entre les pages
**Parcours utilisateur complet :**
```
index.html (Connexion)
    ↓
dashboard.html (Tableau de bord)
    ↓
test.html (Passer un test)
    ↓
results.html (Voir les résultats)
```

> **Note :** Les liens entre les pages ne sont pas encore fonctionnels. Pour naviguer, ouvrez chaque fichier HTML séparément dans votre navigateur.

---

## 🎨 Caractéristiques du design

### 🏛️ Identité institutionnelle
- Logo UCD présent sur toutes les pages
- Informations universitaires dans l'en-tête
- Nom du professeur et année académique affichés
- Couleurs inspirées de l'univers universitaire

### 🎨 Design moderne
- **Gradients** vibrants et professionnels
- **Glassmorphism** (effet de verre dépoli)
- **Animations** subtiles et fluides
- **Typographie** Inter (Google Fonts)
- **Icônes** SVG personnalisées

### 📊 Modules de physique
Chaque module a sa couleur distinctive :
- 🔵 **Optique géométrique** : Bleu (#3b82f6)
- 🟡 **Électrostatique** : Jaune/Orange (#f59e0b)
- 🟢 **Électrocinétique** : Vert (#10b981)
- 🟣 **Magnétisme** : Violet (#8b5cf6)

### 📱 Responsive Design
- ✅ Desktop (>1200px)
- ✅ Tablette (768px - 1200px)
- ✅ Mobile (<768px)

---

## 🧩 Détails des pages

### 1️⃣ Page de connexion (`index.html`)

**Éléments clés :**
- En-tête avec informations institutionnelles complètes
- Formulaire de connexion sécurisé
- Bouton "Créer un compte"
- Aperçu des modules disponibles
- Footer avec liens utiles

**Design :**
- Background avec gradient animé
- Card centrale avec effet glassmorphism
- Champs de formulaire stylisés
- Boutons avec animations au survol

---

### 2️⃣ Tableau de bord (`dashboard.html`)

**Éléments clés :**
- Navbar fixe avec logo et avatar utilisateur
- Header personnalisé avec salutation
- **3 cartes statistiques** (tests complétés, score moyen, temps d'étude)
- **4 modules de cours** avec :
  - Progression en pourcentage (cercle animé)
  - Liste des chapitres
  - État (complété ✓, en cours ○, verrouillé 🔒)
  - Scores individuels
  - Boutons "Commencer"

**Sidebar :**
- Tests recommandés
- Activité récente avec timeline

---

### 3️⃣ Interface de test (`test.html`)

**Éléments clés :**
- **Header fixe** avec :
  - Titre du test et module
  - Chronomètre compte à rebours
  - Barre de progression
- **Zone de question** :
  - Numéro de question (ex: 3/12)
  - Badge de difficulté (⭐ à ⭐⭐⭐)
  - Points attribués
  - Énoncé de la question
  - 4 options de réponse (A, B, C, D)
  - Boutons de navigation

**Sidebar des questions :**
- Minimap avec toutes les questions (grille 4×3)
- Codes couleur :
  - Vert : répondue
  - Bleu : en cours
  - Gris : non répondue
- Bouton "Soumettre le test"
- Bouton "Quitter"

**Support formules :**
- Intégration MathJax pour formules mathématiques LaTeX

---

### 4️⃣ Page de résultats (`results.html`)

**Éléments clés :**

**Score principal :**
- Card avec gradient
- Score affiché : X/24 points + pourcentage
- Badge de performance (Excellent/Bien/Moyen)
- Statistiques (questions correctes, temps, date)

**Détail par question :**
- Badge ✓ (correcte) ou ✗ (incorrecte)
- Points obtenus
- Énoncé bref
- Votre réponse vs Réponse correcte
- Explication détaillée (pour questions incorrectes)

**Sidebar :**
- **Performance par niveau** (barres de progression)
  - Basique (⭐) : 4/4
  - Intermédiaire (⭐⭐) : 5/8
  - Avancé (⭐⭐⭐) : 0/4
- **Actions** :
  - Refaire le test
  - Télécharger PDF
  - Partager
- **Recommandations** personnalisées

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure des pages |
| **CSS3** | Styles et animations |
| **Google Fonts (Inter)** | Typographie moderne |
| **CSS Variables** | Thème cohérent et maintenable |
| **Flexbox + Grid** | Layouts responsive |
| **SVG** | Icônes vectorielles |
| **MathJax** | Rendu formules mathématiques |

---

## 🎯 Prochaines étapes

### Pour utiliser ces maquettes :

**Option A - Développement complet :**
1. Ajouter JavaScript pour l'interactivité
2. Connecter à un backend (Node.js/Python)
3. Implémenter la base de données
4. Ajouter l'authentification
5. Déployer sur serveur

**Option B - Prototype interactif :**
1. Ajouter JavaScript simple pour :
   - Navigation entre pages
   - Sélection de réponses
   - Chronomètre fonctionnel
   - Calcul de score
2. Utiliser localStorage pour sauvegarder temporairement

**Option C - Présentation :**
- Utiliser tel quel pour démonstration visuelle
- Présenter à l'équipe pédagogique
- Obtenir validation avant développement

---

## 🎨 Personnalisation

### Changer les couleurs :
Ouvrez `styles.css` et modifiez les variables CSS :
```css
:root {
    --primary-color: #2563eb;  /* Bleu principal */
    --secondary-color: #7c3aed; /* Violet secondaire */
    --accent-color: #f59e0b;    /* Orange accent */
}
```

### Modifier le logo :
Remplacez les divs `<div class="logo">UCD</div>` par :
```html
<img src="chemin/vers/logo-ucd.png" alt="Logo UCD">
```

### Ajouter le logo de l'université :
Placez votre logo dans le dossier et modifiez `.logo-placeholder` dans `index.html`

---

## 📞 Support

Pour toute question sur ces maquettes ou pour demander des modifications :
- Contact : Pr. Abdellah Tahiri
- Université Chouaib Doukkali - Faculté des Sciences El Jadida

---

**Version :** 1.0  
**Date :** 6 février 2026  
**Créé pour :** Université Chouaib Doukkali - Faculté des Sciences El Jadida
