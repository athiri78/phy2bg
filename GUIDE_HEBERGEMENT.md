# Guide d'Hébergement du Site Web
## Plateforme d'Évaluation en Physique - UCD

**Email de contact : tahiri.abdellah@ucd.ac.ma**

---

## 🎯 Options d'Hébergement

Voici **4 options** adaptées à votre situation :

1. ✅ **Serveur Universitaire UCD** (Recommandé)
2. ✅ **Hébergement Gratuit** (GitHub Pages, Netlify)
3. ✅ **Cloud Platform** (Firebase, Vercel)
4. ✅ **Hébergement Payant** (si budget disponible)

---

## 🏛️ Option 1 : Serveur Universitaire UCD (RECOMMANDÉ)

**Avantages :**
- ✅ **Gratuit** pour l'université
- ✅ **Nom de domaine UCD** (ex: physique.ucd.ac.ma)
- ✅ **Support technique** de l'université
- ✅ **Sécurité** et conformité institutionnelle
- ✅ **Bande passante** illimitée pour les étudiants

### 📞 Démarches à suivre

#### Étape 1 : Contacter le Service Informatique UCD

**Email à envoyer :**

```
À : support-informatique@ucd.ac.ma
CC : dsi@ucd.ac.ma
De : tahiri.abdellah@ucd.ac.ma

Objet : Demande d'hébergement pour plateforme pédagogique

Bonjour,

Je suis Pr. Abdellah Tahiri, enseignant à la Faculté des Sciences El Jadida.

Je souhaite héberger une plateforme web d'évaluation en physique pour mes 
étudiants de S2 (2025/2026).

Caractéristiques du projet :
- Type : Site web éducatif (HTML/CSS/JavaScript)
- Utilisateurs : ~150-200 étudiants
- Fonctionnalités : Tests QCM, simulations PhET, ressources PDF
- Espace nécessaire : ~500 MB
- Base de données : MySQL/PostgreSQL (si disponible)

Pourriez-vous m'indiquer :
1. La procédure pour obtenir un espace d'hébergement ?
2. Un sous-domaine possible (ex: physique.fs-eljadida.ucd.ac.ma) ?
3. Les accès FTP/SFTP pour le déploiement ?
4. La disponibilité d'une base de données ?

Merci pour votre aide.

Cordialement,
Pr. Abdellah Tahiri
Faculté des Sciences El Jadida
```

#### Étape 2 : Préparer les fichiers

Une fois l'accès obtenu, organisez vos fichiers :

```
📁 plateforme-physique/
  📄 index.html
  📄 dashboard.html
  📄 test.html
  📄 results.html
  📄 simulations.html
  📄 admin.html
  📁 css/ (tous les fichiers .css)
  📁 js/ (tous les fichiers .js)
  📁 resources/ (vos PDF)
  📁 images/
```

#### Étape 3 : Upload via FTP

1. Télécharger **FileZilla** (gratuit)
2. Connectez-vous avec les identifiants fournis par UCD
3. Uploadez tous les fichiers
4. Testez sur l'URL fournie

---

## 🌐 Option 2 : GitHub Pages (Gratuit)

**Avantages :**
- ✅ **100% Gratuit**
- ✅ **HTTPS automatique**
- ✅ **Déploiement instantané**
- ✅ **Bon pour mockups/démo**

**Limitations :**
- ⚠️ Pas de backend (pas de base de données)
- ⚠️ URL : username.github.io/projet

### 📝 Étapes de déploiement

#### 1. Créer un compte GitHub
- Allez sur https://github.com
- Créez un compte avec votre email UCD

#### 2. Créer un repository
```bash
# Sur votre PC, installer Git puis :
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/plateforme-physique.git
git push -u origin main
```

#### 3. Activer GitHub Pages
- Allez dans **Settings** > **Pages**
- Source : **Deploy from branch**
- Branch : **main** / **root**
- Cliquez sur **Save**

#### 4. Accéder au site
- URL : `https://VOTRE_USERNAME.github.io/plateforme-physique/`
- Attendre 2-3 minutes pour le déploiement

---

## 🚀 Option 3 : Netlify (Gratuit + Facile)

**Avantages :**
- ✅ **Gratuit**
- ✅ **Déploiement en 1 clic**
- ✅ **Domaine personnalisé possible**
- ✅ **HTTPS automatique**
- ✅ **Formulaires (contactez-nous)**

### 📝 Déploiement Netlify

#### Méthode 1 : Drag & Drop (Le plus simple)

1. Allez sur https://netlify.com
2. Créez un compte gratuit
3. Cliquez sur **"Add new site"** > **"Deploy manually"**
4. **Glissez-déposez** votre dossier complet
5. Attendez 30 secondes
6. ✅ **Site en ligne !**

**URL générée :** `random-name-123.netlify.app`

#### Méthode 2 : Via GitHub (Recommandé)

1. Créez un repo GitHub (voir Option 2)
2. Sur Netlify : **"Import from Git"**
3. Sélectionnez votre repo
4. Déploiement automatique à chaque modification

### Domaine personnalisé

Sur Netlify, vous pouvez utiliser :
- Sous-domaine gratuit : `physique-ucd.netlify.app`
- Votre domaine : `physique.votredomaine.ma` (si vous en avez un)

---

## 🔥 Option 4 : Firebase Hosting (Google)

**Avantages :**
- ✅ **Gratuit** (10 GB/mois)
- ✅ **Très rapide** (CDN mondial)
- ✅ **Backend inclus** (si vous ajoutez Firestore)
- ✅ **Authentification intégrée**

### 📝 Déploiement Firebase

#### 1. Installer Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. Initialiser le projet
```bash
firebase login
firebase init hosting
# Sélectionnez : Create new project
# Public directory : . (point)
# Single page app : No
```

#### 3. Déployer
```bash
firebase deploy
```

**URL générée :** `votre-projet.web.app`

---

## 💰 Option 5 : Hébergement Payant

Si l'université a un budget, voici des options professionnelles :

### Maroc (Hébergement Local)
- **Genious** : ~200 DH/an
- **MegaHost** : ~300 DH/an
- **Hostinger Maroc** : ~400 DH/an

### International
- **DigitalOcean** : $5/mois (~50 DH)
- **Heroku** : $7/mois
- **AWS EC2** : Variable

---

## 📋 Checklist avant déploiement

### Fichiers à vérifier
- [ ] Tous les liens sont relatifs (pas de `C:\Users\...`)
- [ ] Images/CSS/JS référencés correctement
- [ ] Tester localement dans le navigateur
- [ ] Vérifier les liens entre pages
- [ ] Simulations PhET pointent vers les URLs en ligne

### Modifications nécessaires

#### 1. Corriger les chemins CSS dans les HTML

**Dans `dashboard.html`, `test.html`, etc. :**

Remplacez :
```html
<link rel="stylesheet" href="dashboard.css">
```

Par (si vous utilisez une structure avec dossier `css/`) :
```html
<link rel="stylesheet" href="css/dashboard.css">
```

OU gardez les fichiers CSS à la racine.

#### 2. Vérifier les chemins JavaScript

**Dans `test.html` :**
```html
<script src="test.js"></script>
```

Ou :
```html
<script src="js/test.js"></script>
```

#### 3. Liens de navigation

Assurez-vous que tous les liens utilisent des chemins relatifs :
```html
<a href="dashboard.html">Tableau de bord</a>
<a href="test.html">Test</a>
<a href="simulations.html">Simulations</a>
```

---

## 🧪 Tester le site

### Test local (avant déploiement)

1. **Serveur local simple :**
```bash
# Python 3
python -m http.server 8000

# Ou Node.js
npx http-server
```

2. Ouvrir : `http://localhost:8000`

3. Vérifier :
   - ✅ Page de connexion s'affiche
   - ✅ Navigation fonctionne
   - ✅ Test interactif fonctionne
   - ✅ Simulations s'ouvrent
   - ✅ CSS/images chargent correctement

---

## 📞 Contacts UCD

### Service Informatique
- **Email général** : support@ucd.ac.ma
- **DSI** : dsi@ucd.ac.ma

### Faculté des Sciences El Jadida
- **Email** : contact@fs-eljadida.ucd.ac.ma
- **Site web** : http://fs-eljadida.ucd.ac.ma

*Note : Ces emails sont indicatifs. Vérifiez les contacts actuels sur le site UCD.*

---

## ✅ Ma recommandation pour vous

**Étape 1 (Immédiat) :**
- Déployer sur **Netlify** (gratuit, 5 minutes)
- Tester la plateforme avec quelques étudiants
- Partager le lien : `physique-ucd.netlify.app`

**Étape 2 (Officiel) :**
- Contacter le service informatique UCD
- Demander hébergement institutionnel
- Obtenir domaine officiel : `physique.ucd.ac.ma`

**Étape 3 (Backend) :**
- Implémenter Firebase pour le suivi des résultats
- Activer l'interface administrateur
- Centraliser les données

---

## 🎁 Fichiers prêts pour déploiement

Tous vos fichiers sont dans :
```
C:\Users\pc\.gemini\antigravity\brain\3c3e3ff5-8526-46a0-add4-1a81fcac672f\
```

**Vous pouvez déployer immédiatement sur Netlify en glissant-déposant ce dossier !**

---

## 🆘 Besoin d'aide ?

Je peux vous aider avec :
1. Configuration du déploiement
2. Résolution de problèmes
3. Ajout du backend
4. Formation pour la maintenance

**Prochaine étape : Quelle option préférez-vous ?**
- A) Netlify (5 minutes, gratuit)
- B) Contacter UCD d'abord
- C) Firebase (avec backend)
