# 🏋️ BartFit v3

> Application fitness premium, 100% personnalisée, science-based.
> Séances optimisées · Nutrition adaptée · Suivi sommeil · Inspiration champions

![BartFit](https://img.shields.io/badge/BartFit-v3.0-BCFF3C?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## ✨ Fonctionnalités

### 🎯 Onboarding personnalisé (6 étapes)
- Profil complet : nom, âge, genre, poids, taille
- Calcul automatique **IMC** et **TDEE** (dépense énergétique)
- Choix du niveau (Débutant / Intermédiaire / Avancé)
- Équipement disponible (Maison / Salle / Les deux)
- Modèle d'inspiration parmi 5 athlètes de classe mondiale

### 🏋️ Séances science-based
- 6 programmes : Masse · Sèche · Cuisses & Fessiers · Full Body · Cardio · Stretching
- **Principe MEV** (minimum effective volume) — maximum de résultats en minimum de temps
- Illustrations SVG pour chaque exercice (21 types de silhouettes distinctes)
- Adaptations **Maison** (avec alternatives quotidiennes) et **Salle** (badges équipement)
- Sets/reps adaptés dynamiquement au niveau de l'utilisateur
- **Mode Découverte** : 3 exercices · 2 séries · ~15 min · idéal pour commencer
- Feedback post-séance (Facile/Bien/Difficile) pour adapter la prochaine

### 🥗 Nutrition personnalisée
- Calcul TDEE (formule Mifflin-St Jeor + coefficient d'activité)
- Macros calculées selon l'objectif (masse/sèche/équilibre)
- Plan repas journalier détaillé avec horaires et calories
- Régimes inspirés des athlètes de référence

### 😴 Suivi du sommeil
- Saisie coucher + réveil → calcul automatique des heures
- Grille hebdomadaire colorée (vert/orange/rouge selon la qualité)
- Analyse de la semaine avec conseils personnalisés
- Notification bilan hebdomadaire le dimanche
- Référentiel "sommeil des champions" (Ronaldo, LeBron, etc.)

### 🔔 Rappels intelligents
- 8 rappels configurables avec horaires personnalisables
- Détection de séance manquée avec messages de motivation
- Notification de mise à jour du profil tous les 60 jours

### 📤 Partage social
- **WhatsApp**, **Facebook**, **Twitter/X**
- Partage natif iOS/Android (Web Share API)
- Copie presse-papier — carte de progrès formatée

### 🏆 Inspiration 5 athlètes d'élite
- Cristiano Ronaldo · LeBron James · Usain Bolt · Serena Williams · Michael Phelps
- Routine d'entraînement · Régime alimentaire · Habitudes sommeil · Philosophie

---

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Démarrage rapide

```bash
# Cloner le repository
git clone https://github.com/votre-username/bartfit.git
cd bartfit

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

### Build production

```bash
npm run build
# Les fichiers sont générés dans dist/
```

---

## 🗂️ Structure du projet

```
bartfit/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Application BartFit complète
│   └── main.jsx         # Point d'entrée React
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧪 Stack technique

| Technologie | Usage |
|---|---|
| React 18 | Interface utilisateur |
| Vite 5 | Build tool & dev server |
| Google Fonts | Barlow Condensed + Plus Jakarta Sans |
| LocalStorage | Persistance des données (profil, séances, sommeil) |
| Web Notifications API | Rappels et notifications |
| Web Share API | Partage social natif |
| SVG pur | Illustrations stick figures |

> Aucune dépendance externe autre que React — 0 bibliothèques UI tierces.

---

## 📱 Design

- **Mobile-first** — optimisé pour 375–430px
- **Dark premium** — fond `#05090F`, accent `#BCFF3C`
- **Typographie** — Barlow Condensed (titres) + Plus Jakarta Sans (corps)
- **Navigation** — bottom bar fixe, 5 onglets

---

## 🔄 Mise à jour du profil

L'app rappelle automatiquement de mettre à jour les données tous les **60 jours** pour suivre l'évolution (poids, niveau, objectifs).

---

## 📊 Données stockées (LocalStorage)

| Clé | Contenu |
|---|---|
| `bartfit_profile` | Profil utilisateur complet |
| `fitapp_wlog` | Journal des séances par date |
| `fitapp_sleep` | Journal du sommeil par date |
| `fitapp_rappels` | Configuration des rappels |
| `bartfit_starter` | Mode Découverte actif/inactif |

---

## 🤝 Contribution

Les PR sont les bienvenues ! Pour les changements majeurs, ouvre d'abord une issue pour discuter des modifications souhaitées.

1. Fork le projet
2. Crée ta branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit tes changements (`git commit -m 'feat: ajoute ma fonctionnalité'`)
4. Push sur la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvre une Pull Request

---

## 📄 Licence

MIT © BartFit — Fait avec 💪 et ☕
