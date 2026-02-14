# Structure de Dossiers Recommandée
## Plateforme d'Évaluation en Physique - UCD

```
📁 plateforme-physique-ucd/
│
├── 📄 index.html                    # Page de connexion
├── 📄 dashboard.html                # Tableau de bord étudiant
├── 📄 test.html                     # Interface de test (Optique)
├── 📄 test_electrostatique.html    # Tests Électrostatique
├── 📄 test_electrocinetique.html   # Tests Électrocinétique
├── 📄 test_magnetisme.html         # Tests Magnétisme
├── 📄 results.html                  # Page de résultats
├── 📄 simulations.html              # Page des simulations TP
│
├── 📁 css/                          # Feuilles de styles
│   ├── styles.css                   # Styles page connexion
│   ├── dashboard.css                # Styles tableau de bord
│   ├── test.css                     # Styles interface test
│   ├── results.css                  # Styles page résultats
│   └── simulations.css              # Styles page simulations
│
├── 📁 js/                           # Scripts JavaScript
│   ├── script.js                    # Script page connexion
│   ├── dashboard.js                 # Script tableau de bord
│   ├── test.js                      # Questions Optique
│   ├── test_electrostatique.js     # Questions Électrostatique
│   ├── test_electrocinetique.js    # Questions Électrocinétique
│   ├── test_magnetisme.js          # Questions Magnétisme
│   ├── results.js                   # Script page résultats
│   └── simulations.js               # Script page simulations
│
├── 📁 resources/                    # Documents pédagogiques
│   │
│   ├── 📁 optique-geometrique/
│   │   ├── 📄 TD1_Reflexion_Refraction.pdf
│   │   ├── 📄 TD1_Correction.pdf
│   │   ├── 📄 TD2_Lentilles_Minces.pdf
│   │   ├── 📄 TD2_Correction.pdf
│   │   ├── 📄 TD3_Miroirs_Spheriques.pdf
│   │   ├── 📄 TD3_Correction.pdf
│   │   ├── 📄 Examen_Blanc_Optique.pdf
│   │   ├── 📄 Correction_Examen_Blanc.pdf
│   │   └── 📄 Formulaire_Optique.pdf
│   │
│   ├── 📁 electrostatique/
│   │   ├── 📄 TD1_Loi_Coulomb.pdf
│   │   ├── 📄 TD1_Correction.pdf
│   │   ├── 📄 TD2_Champ_Electrique.pdf
│   │   ├── 📄 TD2_Correction.pdf
│   │   ├── 📄 TD3_Potentiel_Electrique.pdf
│   │   ├── 📄 TD3_Correction.pdf
│   │   ├── 📄 TD4_Theoreme_Gauss.pdf
│   │   ├── 📄 TD4_Correction.pdf
│   │   ├── 📄 TD5_Condensateurs.pdf
│   │   ├── 📄 TD5_Correction.pdf
│   │   ├── 📄 Examen_Blanc_Electrostatique.pdf
│   │   └── 📄 Correction_Examen_Blanc.pdf
│   │
│   ├── 📁 electrocinetique/
│   │   ├── 📄 TD1_Loi_Ohm.pdf
│   │   ├── 📄 TD1_Correction.pdf
│   │   ├── 📄 TD2_Lois_Kirchhoff.pdf
│   │   ├── 📄 TD2_Correction.pdf
│   │   ├── 📄 TD3_Associations_Resistances.pdf
│   │   ├── 📄 TD3_Correction.pdf
│   │   ├── 📄 TD4_Circuits_RC.pdf
│   │   ├── 📄 TD4_Correction.pdf
│   │   ├── 📄 Examen_Blanc_Electrocinetique.pdf
│   │   └── 📄 Correction_Examen_Blanc.pdf
│   │
│   └── 📁 magnetisme/
│       ├── 📄 TD1_Champ_Magnetique.pdf
│       ├── 📄 TD1_Correction.pdf
│       ├── 📄 TD2_Force_Lorentz.pdf
│       ├── 📄 TD2_Correction.pdf
│       ├── 📄 TD3_Force_Laplace.pdf
│       ├── 📄 TD3_Correction.pdf
│       ├── 📄 TD4_Loi_Biot_Savart.pdf
│       ├── 📄 TD4_Correction.pdf
│       ├── 📄 TD5_Theoreme_Ampere_Induction.pdf
│       ├── 📄 TD5_Correction.pdf
│       ├── 📄 Examen_Blanc_Magnetisme.pdf
│       └── 📄 Correction_Examen_Blanc.pdf
│
├── 📁 simulations/                  # Simulations interactives
│   │
│   ├── 📁 optique/
│   │   ├── 📄 bending-light_fr.html              # PhET - Réfraction
│   │   ├── 📄 geometric-optics_fr.html           # PhET - Lentilles/Miroirs
│   │   └── 📁 bending-light_fr_phet/            # Dossier des assets
│   │
│   ├── 📁 electrostatique/
│   │   ├── 📄 coulombs-law_fr.html               # PhET - Loi de Coulomb
│   │   ├── 📄 charges-and-fields_fr.html         # PhET - Champ électrique
│   │   ├── 📄 capacitor-lab-basics_fr.html       # PhET - Condensateurs
│   │   └── 📁 coulombs-law_fr_phet/
│   │
│   ├── 📁 electrocinetique/
│   │   ├── 📄 ohms-law_fr.html                   # PhET - Loi d'Ohm
│   │   ├── 📄 circuit-construction-kit-dc_fr.html # PhET - Circuits DC
│   │   ├── 📄 capacitor-lab-basics_fr.html       # PhET - Circuits RC
│   │   └── 📁 ohms-law_fr_phet/
│   │
│   └── 📁 magnetisme/
│       ├── 📄 magnet-and-compass_fr.html         # PhET - Aimant et boussole
│       ├── 📄 faradays-law_fr.html               # PhET - Loi de Faraday
│       ├── 📄 magnets-and-electromagnets_fr.html # PhET - Électroaimants
│       └── 📁 magnet-and-compass_fr_phet/
│
├── 📁 images/                       # Images et icônes
│   ├── logo-ucd.png                 # Logo université
│   ├── logo-fs-eljadida.png         # Logo faculté
│   └── 📁 simulation-previews/      # Captures d'écran des simulations
│       ├── preview-refraction.jpg
│       ├── preview-lentilles.jpg
│       ├── preview-coulomb.jpg
│       └── ...
│
├── 📁 fonts/                        # Polices (si nécessaire)
│   └── Inter-VariableFont.woff2
│
└── 📄 README.md                     # Documentation du projet
```

---

## 📝 Description des dossiers

### 🌐 **Racine** (fichiers HTML principaux)
Contient toutes les pages de navigation principales de la plateforme.

### 🎨 **css/** 
Tous les fichiers de styles. Chaque page majeure a son propre CSS.

### ⚙️ **js/**
Tous les scripts JavaScript :
- Scripts de navigation et authentification
- Banques de questions pour chaque module
- Logique d'affichage des résultats

### 📚 **resources/**
Documents PDF organisés par module :
- **TDs** : Travaux dirigés
- **Corrections** : Solutions détaillées
- **Examens blancs** : Tests d'entraînement
- **Formulaires** : Fiches récapitulatives

**Convention de nommage :**
```
TD[numéro]_[Sujet].pdf
TD[numéro]_Correction.pdf
Examen_Blanc_[Module].pdf
Correction_Examen_Blanc.pdf
```

### 🔬 **simulations/**
Simulations PhET téléchargées et organisées par module.

**Structure d'une simulation PhET :**
```
simulation-name_fr.html          ← Fichier principal à ouvrir
simulation-name_fr_phet/         ← Dossier avec les assets
```

### 🖼️ **images/**
Logos, icônes, et captures d'écran des simulations pour prévisualisation.

---

## 🎯 Avantages de cette structure

✅ **Organisation claire** par module de physique
✅ **Séparation** HTML / CSS / JS
✅ **Évolutivité** facile (ajouter de nouveaux modules)
✅ **Maintenance** simplifiée
✅ **Collaboration** facilitée (plusieurs développeurs)

---

## 📦 Taille estimée

- HTML/CSS/JS : ~2-5 MB
- Resources (PDF) : ~50-100 MB (selon nb de docs)
- Simulations PhET : ~100-200 MB
- Images : ~10-20 MB

**Total estimé : 200-350 MB**

---

## 🚀 Prochaines étapes

1. ✅ Créer la structure de dossiers
2. 📥 Télécharger les simulations PhET
3. 📄 Ajouter vos documents PDF
4. 🔗 Mettre à jour les liens dans le code
5. 🧪 Tester la navigation et les téléchargements
