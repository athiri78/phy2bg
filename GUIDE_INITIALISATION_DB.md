# Guide d'Initialisation de la Base de Données - Admin

## 🔐 Accès Administrateur

Cette fonctionnalité est **réservée aux administrateurs** et protégée par mot de passe.

---

## 📊 Fonctionnalités disponibles

### 1. **Initialiser la base de données**

Crée automatiquement des données d'exemple pour tester la plateforme.

#### Données générées :
- ✅ **50 étudiants fictifs** avec :
  - Noms et prénoms marocains réalistes
  - Adresses email UCD (@etu.ucd.ac.ma)
  - Identifiants uniques (ETU0001, ETU0002, etc.)
  
- ✅ **200+ résultats de tests** avec :
  - Scores réalistes (entre 60% et 100%)
  - Répartition sur les 4 modules de physique
  - Dates de passage variées
  - Durées de test (15-25 minutes)

#### Comment l'utiliser :
1. Ouvrir la page `admin.html`
2. Descendre jusqu'à la section **"Gestion de la Base de Données"**
3. Cliquer sur **"Initialiser les données"**
4. Entrer le mot de passe : `admin123`
5. Confirmer l'action
6. La page se rechargera avec les nouvelles données

---

### 2. **Réinitialiser tout**

Supprime **toutes les données** de la plateforme (action irréversible).

#### Ce qui est supprimé :
- ⚠️ Tous les étudiants
- ⚠️ Tous les résultats de tests
- ⚠️ Toutes les configurations
- ⚠️ Retour à l'état initial vide

#### Comment l'utiliser :
1. Ouvrir la page `admin.html`
2. Cliquer sur **"Tout réinitialiser"**
3. Entrer le mot de passe : `admin123`
4. Taper **"SUPPRIMER"** en majuscules pour confirmer
5. La page se rechargera avec une base vide

---

## 🔑 Mot de passe administrateur

**Mot de passe par défaut** : `admin123`

> ⚠️ **Important** : Pour la production, changez ce mot de passe dans le fichier `admin.js` (lignes 48 et 84).

---

## 📁 Stockage des données

Les données sont stockées dans `localStorage` :

| Clé | Contenu |
|-----|---------|
| `students_db` | Liste des étudiants (JSON) |
| `test_results_db` | Liste des résultats de tests (JSON) |
| `db_initialized` | Indicateur d'initialisation |
| `db_init_date` | Date d'initialisation |

---

## 🛡️ Sécurité

### Mesures de protection :
1. ✅ **Mot de passe requis** pour toute action
2. ✅ **Double confirmation** pour la réinitialisation
3. ✅ **Avertissements visuels** avant actions dangereuses
4. ✅ **Badge "ADMIN UNIQUEMENT"** visible

### Pour renforcer la sécurité :
```javascript
// Dans admin.js, ligne 48 et 84, remplacez :
if (password === 'admin123') {
// Par :
if (password === 'VotreMotDePasseSecurise2026!') {
```

---

## 🧪 Exemple de données générées

### Étudiant exemple :
```json
{
  "id": "ETU0012",
  "nom": "Alami",
  "prenom": "Ahmed",
  "email": "ahmed.alami12@etu.ucd.ac.ma",
  "dateInscription": "2025-09-15T10:30:00.000Z"
}
```

### Résultat de test exemple :
```json
{
  "studentId": "ETU0012",
  "studentName": "Ahmed Alami",
  "studentEmail": "ahmed.alami12@etu.ucd.ac.ma",
  "module": "Électrostatique",
  "score": 85,
  "maxScore": 100,
  "date": "2025-10-20T14:30:00.000Z",
  "duration": 22,
  "questionsTotal": 20,
  "questionsCorrect": 17
}
```

---

## 📊 Vérification dans la console

Après initialisation, ouvrez la console navigateur (F12) pour voir :

```
📊 Base de données initialisée
   Étudiants: 50
   Résultats: 234
   Date d'initialisation: 06/02/2026 13:30:45
```

---

## 🔄 Intégration avec le backend

Actuellement, les données sont stockées en **localStorage** (côté client).

Pour migrer vers un vrai backend :
1. Consultez `GUIDE_BACKEND.md`
2. Remplacez les appels `localStorage` par des requêtes API
3. Adaptez les fonctions dans `admin.js`

---

## ❓ Questions fréquentes

**Q: Combien d'étudiants sont créés ?**  
R: 50 étudiants avec des noms et emails réalistes.

**Q: Les données sont-elles permanentes ?**  
R: Oui, elles restent dans localStorage jusqu'à réinitialisation ou suppression du cache navigateur.

**Q: Puis-je modifier le nombre d'étudiants ?**  
R: Oui, dans `admin.js` ligne 13, changez `i <= 50` à la valeur souhaitée.

**Q: Comment visualiser les données ?**  
R: Allez sur `admin.html` et `stats.html` après initialisation, ou ouvrez la console (F12) puis `localStorage`.

---

## 🚀 Après initialisation

Vous pouvez maintenant :
- ✅ Voir les statistiques dans `stats.html`
- ✅ Consulter la liste des étudiants dans `admin.html`
- ✅ Tester les graphiques et tableaux
- ✅ Démontrer la plateforme avec des données réalistes

---

**Développé pour la plateforme d'évaluation UCD**  
*Section Admin - Gestion Base de Données*
