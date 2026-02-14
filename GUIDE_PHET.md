# Guide de Téléchargement des Simulations PhET

## 📥 Comment télécharger les simulations PhET

### Étape 1 : Créer la structure de dossiers

```
📁 simulations/
  📁 optique/
  📁 electrostatique/
  📁 electrocinetique/
  📁 magnetisme/
```

---

## 🔵 Module 1 : Optique Géométrique

### Simulation 1 : Réfraction de la lumière

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/bending-light

**Téléchargement :**
1. Cliquez sur le lien ci-dessus
2. Cliquez sur le bouton **"Télécharger"**
3. Choisissez **"Application HTML5 hors ligne"**
4. Enregistrez le fichier ZIP
5. Extrayez dans `simulations/optique/`
6. Renommez le fichier principal en `bending-light_fr.html`

---

### Simulation 2 : Optique Géométrique (Lentilles et Miroirs)

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/geometric-optics

**Téléchargement :**
1. Cliquez sur le lien ci-dessus
2. Téléchargez **"Application HTML5 hors ligne"**
3. Extrayez dans `simulations/optique/`
4. Renommez en `geometric-optics_fr.html`

---

## ⚡ Module 2 : Électrostatique

### Simulation 3 : Loi de Coulomb

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/coulombs-law

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/electrostatique/`
3. Renommez en `coulombs-law_fr.html`

---

### Simulation 4 : Charges et Champs Électriques

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/charges-and-fields

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/electrostatique/`
3. Renommez en `charges-and-fields_fr.html`

---

### Simulation 5 : Condensateurs - Notions de Base

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/capacitor-lab-basics

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/electrostatique/`
3. Renommez en `capacitor-lab-basics_fr.html`

---

## 🔋 Module 3 : Électrocinétique

### Simulation 6 : Loi d'Ohm

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/ohms-law

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/electrocinetique/`
3. Renommez en `ohms-law_fr.html`

---

### Simulation 7 : Kit de Construction de Circuit - DC

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/circuit-construction-kit-dc

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/electrocinetique/`
3. Renommez en `circuit-construction-kit-dc_fr.html`

---

## 🧲 Module 4 : Magnétisme

### Simulation 8 : Aimant et Boussole

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/magnet-and-compass

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/magnetisme/`
3. Renommez en `magnet-and-compass_fr.html`

---

### Simulation 9 : Loi de Faraday

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/faradays-law

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/magnetisme/`
3. Renommez en `faradays-law_fr.html`

---

### Simulation 10 : Aimants et Électroaimants

**Lien direct PhET :**
https://phet.colorado.edu/fr/simulations/magnets-and-electromagnets

**Téléchargement :**
1. Téléchargez la version HTML5
2. Extrayez dans `simulations/magnetisme/`
3. Renommez en `magnets-and-electromagnets_fr.html`

---

## ✅ Checklist de vérification

Après téléchargement, votre structure devrait ressembler à :

```
📁 simulations/
  📁 optique/
    📄 bending-light_fr.html
    📁 bending-light_fr_phet/
    📄 geometric-optics_fr.html
    📁 geometric-optics_fr_phet/
  
  📁 electrostatique/
    📄 coulombs-law_fr.html
    📁 coulombs-law_fr_phet/
    📄 charges-and-fields_fr.html
    📁 charges-and-fields_fr_phet/
    📄 capacitor-lab-basics_fr.html
    📁 capacitor-lab-basics_fr_phet/
  
  📁 electrocinetique/
    📄 ohms-law_fr.html
    📁 ohms-law_fr_phet/
    📄 circuit-construction-kit-dc_fr.html
    📁 circuit-construction-kit-dc_fr_phet/
  
  📁 magnetisme/
    📄 magnet-and-compass_fr.html
    📁 magnet-and-compass_fr_phet/
    📄 faradays-law_fr.html
    📁 faradays-law_fr_phet/
    📄 magnets-and-electromagnets_fr.html
    📁 magnets-and-electromagnets_fr_phet/
```

---

## 🧪 Test des simulations

**Pour tester une simulation :**
1. Ouvrez le fichier `.html` dans votre navigateur
2. La simulation doit s'afficher en plein écran
3. Vérifiez que tous les contrôles fonctionnent

---

## 🔗 Intégration avec la plateforme

**Fichiers créés :**
- ✅ `simulations.html` - Page principale des simulations
- ✅ `simulations.css` - Styles de la page

**Pour activer le lien depuis le dashboard :**

1. Ouvrez `dashboard.html`
2. Ajoutez ce bouton dans `.header-actions` :

```html
<a href="simulations.html" class="btn btn-outline">
    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4M12 8h.01"></path>
    </svg>
    Simulations TP
</a>
```

---

## 📊 Simulations alternatives

Si certains liens ne fonctionnent pas, voici des alternatives :

**Page principale PhET en français :**
https://phet.colorado.edu/fr/simulations/filter?type=html&sort=alpha&view=grid

**Filtre par sujet :**
- Physique → Lumière & Rayonnement
- Physique → Électricité, Aimants & Circuits

---

## ⚠️ Notes importantes

1. **Connexion internet NON requise** : Les simulations HTML5 fonctionnent hors ligne après téléchargement
2. **Compatibilité** : Nécessite un navigateur moderne (Chrome, Firefox, Edge, Safari)
3. **Taille** : Chaque simulation fait environ 10-30 MB
4. **Licence** : PhET est gratuit pour usage éducatif (licence CC BY 4.0)

---

## 🆘 Aide

**Si une simulation ne fonctionne pas :**
1. Vérifiez que le dossier `_phet` est dans le même répertoire
2. Testez dans un autre navigateur
3. Retéléchargez la simulation depuis PhET

**Support PhET :**
Email : phethelp@colorado.edu
