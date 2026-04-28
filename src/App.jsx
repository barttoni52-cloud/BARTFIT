import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   FONTS
═══════════════════════════════════════════ */
const FontLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);
  return null;
};

/* ═══════════════════════════════════════════
   DESIGN SYSTEM
═══════════════════════════════════════════ */
const C = {
  bg:"#05090F",card:"#0C1520",card2:"#111E30",border:"#1A2B42",
  accent:"#BCFF3C",accentDim:"#1A2800",accentGlow:"rgba(188,255,60,0.15)",
  blue:"#40C4FF",blueDim:"#001B2B",
  text:"#EDF2FF",muted:"#5B6B8A",muted2:"#2E3F58",
  red:"#FF3D5C",orange:"#FF8C40",purple:"#8855FF",
  teal:"#00E5AA",pink:"#FF5BC8",yellow:"#FFD93D",
};
const F = { t:"'Barlow Condensed',sans-serif", b:"'Plus Jakarta Sans',sans-serif" };

/* ═══════════════════════════════════════════
   MESSAGES
═══════════════════════════════════════════ */
const MOTIV = [
  "Il n'est pas trop tard — lance-toi maintenant 🏃","Ta séance t'attend encore !",
  "Un entraînement tardif vaut mieux qu'aucun 💪","Go ! Même 30 min feront la différence.",
  "Courage champion(ne) ! C'est l'heure 🔥","Tu es plus fort que tes excuses. Allez !",
  "5 minutes pour commencer, tu ne t'arrêteras plus 🚀","Le plus dur c'est de commencer.",
];
const SLEEP_TIPS = [
  "Couche-toi 30 min plus tôt cette semaine","Évite les écrans 1h avant de dormir",
  "Garde des horaires réguliers même le week-end","Température idéale : 18–19°C",
  "Limite la caféine après 15h","5 min de respiration profonde avant de dormir",
  "Le sommeil améliore les perfs sportives de +30%","7 à 9h par nuit = objectif sportif",
];
const rand = arr => arr[Math.floor(Math.random()*arr.length)];

/* ═══════════════════════════════════════════
   ATHLETE DATA
═══════════════════════════════════════════ */
const ATHLETES = [
  {
    id:"ronaldo",nom:"Cristiano Ronaldo",emoji:"⚽",sport:"Football",
    color:C.yellow,tagline:"La discipline est la clé de tout",
    avatar:"🇵🇹",
    training:{ sessions:"3–5 séances/jour", duration:"3–4h total", focus:"Cardio · Explosivité · Technique · Abdo quotidiens" },
    diet:{ kcal:"3 000–4 000 kcal", protein:"2.5g/kg", pattern:"6 petits repas/jour, 0 alcool, 0 fast food",
      top:["Blanc de poulet grillé","Salade de thon","Yaourt grec","Fruits frais","Légumes vapeur"] },
    sleep:"7–8h/nuit + 5 naps de 90 min",
    philosophy:"Je ne me repose jamais sur mes acquis. Chaque jour est une chance de devenir meilleur.",
    tips:["Pompes quotidiennes (200–300/jour en séries)","Sprint en côte 2×/semaine","Abdos chaque matin à jeun","Aucun sucre raffiné, aucun alcool"],
  },
  {
    id:"lebron",nom:"LeBron James",emoji:"🏀",sport:"Basketball",
    color:C.red,tagline:"Recovery is training",
    avatar:"🇺🇸",
    training:{ sessions:"2 séances/jour", duration:"2–3h", focus:"Force · Pliométrie · Yoga · Cardio" },
    diet:{ kcal:"4 000–5 000 kcal (match)", protein:"2.0–2.5g/kg", pattern:"Anti-inflammatoire, timing précis",
      top:["Saumon grillé","Brocoli vapeur","Riz complet","Poulet","Fruits frais"] },
    sleep:"8–12h (investit 1.5M€/an dans son corps)",
    philosophy:"Je traite mon corps comme un temple. Sommeil, nutrition, récup — c'est mon vrai entraînement.",
    tips:["Le sommeil est ton investissement #1","Yoga 3×/semaine pour la mobilité","Musculation fonctionnelle avant isolation","Récupération active > repos total"],
  },
  {
    id:"bolt",nom:"Usain Bolt",emoji:"⚡",sport:"Sprint",
    color:C.orange,tagline:"Explosivité avant tout",
    avatar:"🇯🇲",
    training:{ sessions:"1–2 séances/jour", duration:"2h", focus:"Explosivité · Force · Technique · Mobilité" },
    diet:{ kcal:"3 000–3 500 kcal", protein:"1.8–2.0g/kg", pattern:"3 repas + collations",
      top:["Ignames jamaïcaines","Riz & pois","Poulet grillé","Poisson frais"] },
    sleep:"8–10h/nuit",
    philosophy:"L'entraînement explosif crée des athlètes explosifs. Qualité > quantité toujours.",
    tips:["Squats explosifs 3×/semaine","Travail de mobilité des hanches quotidien","Sprints courts (30–60m) > longs","Marche 30 min après chaque repas"],
  },
  {
    id:"serena",nom:"Serena Williams",emoji:"🎾",sport:"Tennis",
    color:C.pink,tagline:"Force + Mental = Victoire",
    avatar:"🇺🇸",
    training:{ sessions:"2 séances/jour", duration:"5–6h", focus:"Cardio · Force fonctionnelle · Coordination · Yoga" },
    diet:{ kcal:"2 500–3 500 kcal", protein:"1.8–2.0g/kg", pattern:"Végétalien en sèche",
      top:["Smoothies protéinés","Légumes verts","Quinoa","Avocats","Fruits"] },
    sleep:"8–9h + méditation quotidienne",
    philosophy:"Je suis une femme, une mère, et la meilleure. Rien ne peut m'arrêter.",
    tips:["Méditation 10 min chaque matin","Renforcement des poignets et épaules","Yoga 2×/semaine pour la souplesse","Visualisation avant chaque défi"],
  },
  {
    id:"phelps",nom:"Michael Phelps",emoji:"🏊",sport:"Natation",
    color:C.blue,tagline:"Volume extrême + récupération",
    avatar:"🇺🇸",
    training:{ sessions:"2–3 séances/jour", duration:"5–6h", focus:"Endurance · Force haut du corps · Étirements" },
    diet:{ kcal:"12 000 kcal (compét!) / 4 000 normal", protein:"3.0g/kg", pattern:"6 repas massifs/jour",
      top:["Pâtes","Œufs brouillés (×5)","Sandwichs protéinés","Pizzas","Pain de mie"] },
    sleep:"8–10h + chambre hyperbare",
    philosophy:"Si tu veux être le meilleur, entraîne-toi comme si tu l'étais déjà.",
    tips:["Volume haut du corps 4×/semaine","Natation ou natation sèche active","Alimentation strictement planifiée","Jamais un entraînement sans échauffement"],
  },
];

/* ═══════════════════════════════════════════
   OPTIMIZED WORKOUT DATA
   Science: MEV (minimum effective volume)
   Compound first, progressive overload
═══════════════════════════════════════════ */

const WORKOUTS = [
  {
    id:"masse",label:"Prise de masse",emoji:"💪",color:C.accent,colorDim:C.accentDim,
    science:"Hypertrophie : 3–5 sets · 6–12 reps · 60–90s repos · Surcharge progressive chaque semaine",
    tempsEst:50,
    maison:[
      { nom:"Pompes larges",figure:"pushup",muscle:"Pectoraux / Triceps",
        conseil:"Mains +larges épaules. Descends la poitrine à 2cm du sol. Corps rigide.",
        alternatif:"Pompes inclinées sur canapé = cible le bas des pecs",
        setsBase:4 },
      { nom:"Dips entre chaises",figure:"dip",muscle:"Triceps / Pecs",
        conseil:"Penche légèrement en avant pour cibler plus les pecs. Descends lentement 3s.",
        alternatif:"Bord d'une table solide ou rebord de lit. Vérifie la stabilité !",
        setsBase:3 },
      { nom:"Row serviette",figure:"row",muscle:"Dos / Biceps",
        conseil:"Corps droit comme une planche. Tire poitrine vers table. Omoplate vers colonne.",
        alternatif:"Plus ton corps est horizontal, plus c'est difficile — règle la hauteur",
        setsBase:4 },
      { nom:"Squat bulgare",figure:"squat",muscle:"Quadriceps / Fessiers",
        conseil:"Pied arrière sur chaise. Genou avant ne dépasse pas l'orteil. Dos droit.",
        alternatif:"Sac à dos lesté (5–15kg) = résistance progressive sans équipement",
        setsBase:3 },
      { nom:"Pike push-ups",figure:"press",muscle:"Épaules",
        conseil:"Hanches en l'air, corps en V. Descends le front vers le sol — lent.",
        alternatif:"Pieds sur une chaise pour version plus intense",
        setsBase:3 },
      { nom:"Gainage dynamique",figure:"plank",muscle:"Core",
        conseil:"Depuis planche : lève bras + jambe opposés. Mouvement lent, hanche stable.",
        alternatif:"Planche statique si tu démarres — augmente la durée de 5s/semaine",
        setsBase:3 },
    ],
    salle:[
      { nom:"Développé couché barre",figure:"bench",muscle:"Pectoraux",
        equipement:["🏋️ Barre","🪑 Banc","🔩 Rack"],
        conseil:"Scapulas rétractées. Barre au niveau des mamelons. Prise légèrement + large que les épaules.",
        setsBase:4 },
      { nom:"Squat barre",figure:"squat",muscle:"Quadriceps / Fessiers",
        equipement:["🏋️ Barre","🔩 Rack de squat"],
        conseil:"Pieds à 15° vers l'extérieur. Genou suit l'orteil. Descends jusqu'aux cuisses parallèles.",
        setsBase:4 },
      { nom:"Soulevé de terre",figure:"deadlift",muscle:"Chaîne postérieure",
        equipement:["🏋️ Barre"],
        conseil:"Dos neutre, barre contre tibias. Pousse le sol (ne tire pas avec le dos). Le roi des exercices.",
        setsBase:4 },
      { nom:"Tirage vertical",figure:"row",muscle:"Grand dorsal",
        equipement:["🔗 Poulie haute"],
        conseil:"Légèrement penché en arrière. Tire jusqu'au menton. Coudes vers les hanches.",
        setsBase:4 },
      { nom:"Développé militaire",figure:"press",muscle:"Épaules",
        equipement:["🏋️ Barre / 🔵 Haltères"],
        conseil:"Gainage fort. Ne bombe pas les lombaires. La barre passe devant le visage en montant.",
        setsBase:3 },
      { nom:"Curl barre EZ",figure:"curl",muscle:"Biceps",
        equipement:["💪 Barre EZ"],
        conseil:"Coudes fixes contre le corps. Contraction maximale au sommet. Redescente lente 3s.",
        setsBase:3 },
    ],
  },
  {
    id:"seche",label:"Sèche / Dessiné",emoji:"✂️",color:C.red,colorDim:"#200010",
    science:"Fat loss : Déficit 300–500 kcal · HIIT + composés · Protéines élevées pour préserver le muscle",
    tempsEst:40,
    maison:[
      { nom:"Burpees",figure:"run",muscle:"Full body",
        conseil:"1 toutes les 2s = rythme optimal cardio. Saut explosif + planche parfaite.",
        alternatif:"Burpee sans saut (step-burpee) si articulations sensibles",
        setsBase:4 },
      { nom:"Mountain climbers",figure:"crunch",muscle:"Abdos / Cardio",
        conseil:"Hanches basses ! Genoux alternés vers poitrine, rythme soutenu.",
        alternatif:"Ralentis pour cibler les abdos plutôt que le cardio",
        setsBase:4 },
      { nom:"Jump squats",figure:"run",muscle:"Jambes / Cardio",
        conseil:"Réception silencieuse = articulations protégées. Fléchis avant de sauter.",
        alternatif:"Squats rapides si problèmes de genoux",
        setsBase:4 },
      { nom:"Pompes avec rotation",figure:"pushup",muscle:"Pecs / Obliques",
        conseil:"Au sommet, rotation en T, bras vers plafond. Gainage permanent.",
        alternatif:"Réduis l'amplitude de rotation au départ",
        setsBase:3 },
      { nom:"Fentes sautées",figure:"lunge",muscle:"Jambes / Cardio",
        conseil:"Change de jambe dans les airs. Réception souple sur l'avant-pied.",
        alternatif:"Fentes normales alternées si genoux fragiles",
        setsBase:3 },
      { nom:"Gainage + élévation latérale",figure:"plank",muscle:"Core / Épaules",
        conseil:"Planche + lève un bras à 90° sur le côté. Hanche stable. Lent.",
        alternatif:"Commence planche statique, introduis le mouvement progressivement",
        setsBase:3 },
    ],
    salle:[
      { nom:"Circuit 5 haltères sans repos",figure:"generic",muscle:"Full body",
        equipement:["🔵 Haltères"],
        conseil:"Charge légère = intensité soutenue. 90s entre circuits. Brûle +35% de plus qu'isolé.",
        setsBase:4 },
      { nom:"Rameur sprint",figure:"run",muscle:"Cardio / Dos",
        equipement:["⚓ Rameur"],
        conseil:"65% jambes · 25% dos · 10% bras. Cadence ~22 coups/min. Meilleur cardio complet.",
        setsBase:4 },
      { nom:"Développé couché léger tempo",figure:"bench",muscle:"Pectoraux",
        equipement:["🏋️ Barre","🪑 Banc"],
        conseil:"60% du max. Tempo 3-1-1 : 3s descente, 1s pause, 1s montée.",
        setsBase:4 },
      { nom:"Leg press pieds hauts",figure:"squat",muscle:"Fessiers / Cuisses",
        equipement:["🦿 Machine leg press"],
        conseil:"Pieds dans le tiers supérieur = plus de fessiers. Descends profond.",
        setsBase:4 },
      { nom:"Corde à sauter HIIT",figure:"run",muscle:"Cardio total",
        equipement:["🪢 Corde à sauter"],
        conseil:"Alterne simple et double saut. Brûle jusqu'à 800 kcal/h. Le meilleur brûleur de graisses.",
        setsBase:5 },
      { nom:"Abdos machine",figure:"crunch",muscle:"Abdominaux",
        equipement:["🎯 Machine abdos"],
        conseil:"Focus sur la contraction, pas sur le poids. Expire fort. Maintiens 1s en bas.",
        setsBase:4 },
    ],
  },
  {
    id:"cuisses",label:"Cuisses & Fessiers",emoji:"🦵",color:C.pink,colorDim:"#200018",
    science:"Glutes : Hip thrust = exercice #1 (activation EMG max) · Squat pour quadriceps · RDL pour ischios",
    tempsEst:45,
    maison:[
      { nom:"Hip thrust au sol",figure:"hipthrust",muscle:"Fessiers (95% activation EMG)",
        conseil:"Dos au sol, pieds à plat. Soulève hanches, contracte fessiers 2s au sommet.",
        alternatif:"Sac à dos lesté sur les hanches pour progresser — commence léger",
        setsBase:4 },
      { nom:"Squat sumo lent",figure:"squat",muscle:"Fessiers / Adducteurs",
        conseil:"Pieds très écartés, orteils à 45°. Descends lentement 4s. Genoux vers l'extérieur.",
        alternatif:"Tiens une bouteille 1.5L contre la poitrine comme contre-poids",
        setsBase:4 },
      { nom:"Fentes arrière",figure:"lunge",muscle:"Quadriceps / Fessiers",
        conseil:"Pas arrière profond. Genou avant à 90°. Buste droit, regarde devant.",
        alternatif:"Bouteilles d'eau pleines = haltères improvisés efficaces",
        setsBase:3 },
      { nom:"Donkey kicks",figure:"hipthrust",muscle:"Fessiers isolés",
        conseil:"À quatre pattes. Pousse le pied vers le plafond. Dos plat. Contracte 2s en haut.",
        alternatif:"Élastique de résistance derrière le genou = intensité ×2",
        setsBase:3 },
      { nom:"Clamshells",figure:"stretch",muscle:"Abducteurs / Fessiers médian",
        conseil:"Sur le côté, genoux fléchis 45°. Ouvre les genoux sans bouger les hanches.",
        alternatif:"Élastique autour des genoux = résistance significative",
        setsBase:3 },
      { nom:"Wall sit",figure:"squat",muscle:"Quadriceps (endurance)",
        conseil:"Dos plat au mur, cuisses parallèles au sol. La brûlure = le progrès.",
        alternatif:"N'importe quel mur. Augmente la durée de 5s par semaine.",
        setsBase:3 },
    ],
    salle:[
      { nom:"Hip thrust barre",figure:"hipthrust",muscle:"Fessiers #1",
        equipement:["🏋️ Barre","🪑 Banc","🛡️ Pad lombaire"],
        conseil:"Barre sur hanches avec pad. Dos sur banc à hauteur d'omoplate. Contraction 2s.",
        setsBase:4 },
      { nom:"Romanian deadlift",figure:"deadlift",muscle:"Ischios / Fessiers",
        equipement:["🔵 Haltères ou 🏋️ Barre"],
        conseil:"Hanches en arrière, haltères le long des jambes. Ressens l'étirement des ischios.",
        setsBase:4 },
      { nom:"Squat gobelet",figure:"squat",muscle:"Quadriceps / Fessiers",
        equipement:["🔔 Kettlebell"],
        conseil:"Kettlebell contre la poitrine. Descends entre les jambes. Genoux à l'extérieur.",
        setsBase:4 },
      { nom:"Leg curl couché",figure:"stretch",muscle:"Ischios (isolé)",
        equipement:["🎯 Machine leg curl"],
        conseil:"Pas d'à-coups. Mouvement lent et contrôlé. Contraction au sommet, descente 3s.",
        setsBase:3 },
      { nom:"Abducteur machine",figure:"hipthrust",muscle:"Abducteurs / Fessier médian",
        equipement:["🎯 Machine abducteur"],
        conseil:"Pousse les jambes vers l'extérieur. Maintiens 1s à l'ouverture max.",
        setsBase:3 },
      { nom:"Leg press pieds hauts",figure:"squat",muscle:"Fessiers / Quadriceps",
        equipement:["🦿 Machine leg press"],
        conseil:"Pieds dans le tiers supérieur. Descends profond. Pousse sur les talons.",
        setsBase:4 },
    ],
  },
  {
    id:"fullbody",label:"Full Body",emoji:"🏋️",color:C.blue,colorDim:C.blueDim,
    science:"Full body : 1 mouvement par pattern (pousser/tirer/squat/charnière/core) = maximum efficacité en minimum de temps",
    tempsEst:55,
    maison:[
      { nom:"Pompes",figure:"pushup",muscle:"Pectoraux / Triceps / Épaules",
        conseil:"Gainage total corps. Coudes à 45°. Corps rigide de la tête aux pieds.",
        alternatif:"Commence à genoux si nécessaire. Monte progressivement.",
        setsBase:3 },
      { nom:"Squat",figure:"squat",muscle:"Jambes / Fessiers",
        conseil:"Poids sur les talons. Descends cuisses parallèles. Regarde devant toi.",
        alternatif:"Sac à dos lesté pour progresser. +2kg/semaine = surcharge progressive.",
        setsBase:3 },
      { nom:"Row serviette",figure:"row",muscle:"Dos / Biceps",
        conseil:"Corps droit comme planche. Tire la poitrine vers la table.",
        alternatif:"Hauteur de table réglable = difficulté réglable",
        setsBase:3 },
      { nom:"Superman",figure:"plank",muscle:"Lombaires / Fessiers",
        conseil:"À plat ventre. Lève bras ET jambes simultanément. Tiens 2s. Atterris doucement.",
        alternatif:"Commence en alternant bras/jambe opposés",
        setsBase:3 },
      { nom:"Crunchs",figure:"crunch",muscle:"Abdominaux",
        conseil:"Mains derrière oreilles. Monte les épaules, pas la tête. Expire fort.",
        alternatif:"Pieds sur une chaise pour moins de tension lombaire",
        setsBase:3 },
      { nom:"Inchworm",figure:"stretch",muscle:"Full body / Mobilité",
        conseil:"Depuis debout, marche avec les mains en planche. Ajoute une pompe. Reviens debout.",
        alternatif:"Excellent échauffement — parfait en début de séance",
        setsBase:3 },
    ],
    salle:[
      { nom:"Développé couché",figure:"bench",muscle:"Pectoraux / Triceps",
        equipement:["🏋️ Barre","🪑 Banc"],
        conseil:"Prise à largeur d'épaules. Descends contrôlé, pousse explosif. Scapulas rétractées.",
        setsBase:3 },
      { nom:"Squat barre",figure:"squat",muscle:"Jambes",
        equipement:["🏋️ Barre","🔩 Rack"],
        conseil:"Échauffement obligatoire : 40% → 60% → séries de travail.",
        setsBase:3 },
      { nom:"Soulevé de terre",figure:"deadlift",muscle:"Chaîne postérieure",
        equipement:["🏋️ Barre"],
        conseil:"1 grand mouvement = tout le dos, fessiers, ischios. Dos neutre obligatoire.",
        setsBase:3 },
      { nom:"Tirage horizontal",figure:"row",muscle:"Dos / Biceps",
        equipement:["🔗 Poulie basse ou 🔵 Haltères"],
        conseil:"Tire les coudes vers les hanches. Omoplate vers la colonne.",
        setsBase:3 },
      { nom:"Développé épaules",figure:"press",muscle:"Épaules",
        equipement:["🔵 Haltères"],
        conseil:"Assis ou debout. Coudes légèrement en avant. Pousse en arc.",
        setsBase:3 },
      { nom:"Planche + Russian twist",figure:"plank",muscle:"Core",
        equipement:["🪑 Tapis"],
        conseil:"Planche 30s + Russian twist ×20. Enchaine sans pause.",
        setsBase:3 },
    ],
  },
  {
    id:"cardio",label:"Cardio / Endurance",emoji:"🏃",color:C.orange,colorDim:"#200D00",
    science:"Zone 2 (60–70% FCmax) pour la lipolyse + HIIT (85–95%) pour l'VO2max = combinaison optimale",
    tempsEst:35,
    maison:[
      { nom:"HIIT Tabata",figure:"run",muscle:"Full body / Cardio",
        conseil:"20s effort max + 10s repos × 8 rounds = 4 min intenses. FC cible 85–90% max.",
        alternatif:"Jumping jacks, high knees ou mountain climbers selon l'espace",
        setsBase:4 },
      { nom:"High knees",figure:"run",muscle:"Cardio / Abdos",
        conseil:"Genoux à hauteur des hanches. Bras actifs. Pose sur l'avant-pied.",
        alternatif:"Marche rapide genoux hauts si articulations sensibles",
        setsBase:4 },
      { nom:"Skater jumps",figure:"run",muscle:"Jambes / Cardio",
        conseil:"Saut latéral sur un pied. Pose douce. Imite un patineur. Amplitude max.",
        alternatif:"Déplacements latéraux sans saut au départ",
        setsBase:4 },
      { nom:"Bear crawl",figure:"plank",muscle:"Full body",
        conseil:"À quatre pattes, genoux à 5cm du sol. Bouge bras et jambe opposés.",
        alternatif:"Dans un couloir ou autour d'une table",
        setsBase:3 },
      { nom:"Sprint escaliers",figure:"run",muscle:"Jambes / Cardio",
        conseil:"Monte en sprint, descends en marchant (protection genoux). Repos 45s entre montées.",
        alternatif:"Fentes rapides alternées si pas d'escaliers",
        setsBase:6 },
      { nom:"Star jumps",figure:"run",muscle:"Full body / Cardio",
        conseil:"Depuis squat bas, explose en étoile. Réception en squat. Explosivité max.",
        alternatif:"Ouverture bras/jambes sans saut si trop intense",
        setsBase:4 },
    ],
    salle:[
      { nom:"Tapis HIIT (sprint/marche)",figure:"run",muscle:"Cardio",
        equipement:["🏃 Tapis de course"],
        conseil:"1 min sprint à 85% FCmax / 1 min marche. 3× plus efficace que 40 min constant.",
        setsBase:5 },
      { nom:"Rameur sprint",figure:"run",muscle:"Cardio / Dos / Jambes",
        equipement:["⚓ Rameur"],
        conseil:"65% jambes · 25% dos · 10% bras. Le meilleur exercice cardio complet.",
        setsBase:4 },
      { nom:"Elliptique résistance élevée",figure:"run",muscle:"Full body / Cardio",
        equipement:["🚴 Elliptique"],
        conseil:"Résistance 7/10. Tiens les poignées mobiles pour activer les bras. 65rpm.",
        setsBase:1 },
      { nom:"Battle ropes",figure:"generic",muscle:"Cardio / Épaules",
        equipement:["🪢 Battle ropes"],
        conseil:"Vagues alternées. Genoux fléchis, gainage. L'exercice le plus intense.",
        setsBase:5 },
      { nom:"Spinning",figure:"run",muscle:"Jambes / Cardio",
        equipement:["🚴 Vélo spinning"],
        conseil:"Cadence cible 80–100rpm. N'utilise pas les barres pour te tenir !",
        setsBase:1 },
      { nom:"Stairmaster",figure:"run",muscle:"Fessiers / Cardio",
        equipement:["🪜 Stairmaster"],
        conseil:"NE T'APPUIE PAS sur les barres ! Juste pour l'équilibre.",
        setsBase:1 },
    ],
  },
  {
    id:"stretching",label:"Stretching / Récup",emoji:"🧘",color:C.teal,colorDim:"#002820",
    science:"Récupération active : stretching PNF + foam rolling + mobilité = -40% blessures, +15% performance",
    tempsEst:30,
    maison:[
      { nom:"Pigeon yoga",figure:"stretch",muscle:"Fessiers / Hanches",
        conseil:"Genou fléchi sous l'épaule opposée. Laisse la gravité travailler. Respiration profonde.",
        alternatif:"Figure 4 allongé au sol = version plus facile et moins contraignante",
        setsBase:2 },
      { nom:"Étirement quadriceps",figure:"stretch",muscle:"Quadriceps",
        conseil:"Debout, talon aux fesses. Genoux joints. Gainage pour stabiliser.",
        alternatif:"Allongé sur le ventre pour une version plus facile",
        setsBase:2 },
      { nom:"Cobra yoga",figure:"plank",muscle:"Lombaires / Abdos",
        conseil:"Bras tendus, hanches au sol. Ouvre la poitrine. Respiration lente et profonde.",
        alternatif:"Sphinx (coudes au sol) si poignets fatigués",
        setsBase:3 },
      { nom:"Étirement ischios",figure:"stretch",muscle:"Ischios-jambiers",
        conseil:"Assis, jambe tendue. Penche-toi sans arrondir le dos. Tu dois sentir l'étirement.",
        alternatif:"Serviette ou ceinture autour du pied pour les moins flexibles",
        setsBase:2 },
      { nom:"Rotation thoracique",figure:"stretch",muscle:"Colonne thoracique",
        conseil:"À quatre pattes. Main derrière l'oreille. Ouvre poitrine vers le plafond. Très lent.",
        alternatif:"Assis sur chaise avec bras croisés sur poitrine",
        setsBase:2 },
      { nom:"Posture de l'enfant",figure:"stretch",muscle:"Dos / Hanches",
        conseil:"Fesses sur les talons, bras tendus. Respire profondément. Détends tout.",
        alternatif:"Écarte les genoux pour inclure un étirement des hanches",
        setsBase:2 },
    ],
    salle:[
      { nom:"Foam roller dos thoracique",figure:"stretch",muscle:"Thoracique",
        equipement:["🪵 Foam roller"],
        conseil:"Roule lentement de bas en haut. Pause 30s sur les zones tendues. Évite les lombaires.",
        setsBase:1 },
      { nom:"Foam roller IT band",figure:"stretch",muscle:"Fascia latéral",
        equipement:["🪵 Foam roller"],
        conseil:"Allongé sur le côté, rouleau sous la cuisse. Zone souvent douloureuse chez les sportifs.",
        setsBase:1 },
      { nom:"Hip flexor fente basse",figure:"lunge",muscle:"Fléchisseurs de la hanche",
        equipement:["🪑 Tapis"],
        conseil:"Fente basse, genou arrière au sol. Pousse les hanches en avant. Ressens l'aine.",
        setsBase:2 },
      { nom:"Cat-cow",figure:"stretch",muscle:"Colonne vertébrale",
        equipement:["🪑 Tapis"],
        conseil:"À quatre pattes. Dos creux (vache) puis dos rond (chat). Synchronise la respiration.",
        setsBase:3 },
      { nom:"Shoulder cross stretch",figure:"generic",muscle:"Deltoïdes",
        equipement:["Aucun"],
        conseil:"Bras à travers la poitrine, maintenu par l'autre coude. Pression douce.",
        setsBase:2 },
      { nom:"Étirement mollets mur",figure:"stretch",muscle:"Gastrocnémiens",
        equipement:["Mur"],
        conseil:"Mains au mur, jambe arrière tendue, talon au sol. Penche le corps en avant.",
        setsBase:2 },
    ],
  },
];

/* ═══════════════════════════════════════════
   NUTRITION DATA
═══════════════════════════════════════════ */
const NUTRITION_BASE = [
  {
    id:"masse",label:"Prise de masse",color:C.accent,icon:"💪",adj:+350,
    repas:[
      {h:"07h00",nom:"Petit-déj",desc:"4 œufs + flocons avoine + banane + yaourt grec",kcal:680},
      {h:"10h00",nom:"Collation",desc:"100g fromage blanc + 30g noix + 1 pomme",kcal:320},
      {h:"13h00",nom:"Déjeuner",desc:"200g poulet + 200g riz complet + légumes poêlés",kcal:750},
      {h:"16h00",nom:"Pré-workout",desc:"1 banane + 30g protéine + 50g flocons avoine",kcal:420},
      {h:"19h00",nom:"Dîner post-WO",desc:"200g saumon + 200g patate douce + épinards + avocat",kcal:680},
      {h:"21h30",nom:"Collation soir",desc:"200g fromage blanc + 20g amandes + beurre cacahuète",kcal:340},
    ],
    conseils:["Mange toutes les 3h pour un environnement anabolique","Protéines dans chaque repas","Ne saute jamais le repas post-workout","Favorise les glucides complexes (riz, avoine, patate douce)"],
  },
  {
    id:"seche",label:"Sèche / Définition",color:C.red,icon:"✂️",adj:-400,
    repas:[
      {h:"07h00",nom:"Petit-déj",desc:"3 blancs d'œufs + 1 entier + épinards sautés + café noir",kcal:280},
      {h:"10h00",nom:"Collation",desc:"150g fromage blanc 0% + amandes + baies",kcal:220},
      {h:"13h00",nom:"Déjeuner",desc:"200g blanc de poulet + grande salade + 100g quinoa",kcal:520},
      {h:"16h00",nom:"Pré-workout",desc:"30g protéine isolate + 1 pomme",kcal:200},
      {h:"19h00",nom:"Dîner",desc:"200g thon + 200g légumes vapeur + 1c. huile olive",kcal:400},
      {h:"21h30",nom:"Collation",desc:"200g fromage blanc 0% + cannelle",kcal:120},
    ],
    conseils:["Monte les protéines pour préserver le muscle","Légumes à haute satiété à volonté","Bois 3L d'eau/jour (réduit la rétention)","Cardio à jeun 2×/semaine pour la lipolyse"],
  },
];

/* ═══════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════ */
function calcTDEE(p) {
  const w=parseFloat(p.weight),h=parseFloat(p.height),a=parseInt(p.age);
  if(!w||!h||!a) return null;
  const bmr = p.gender==="femme" ? 10*w+6.25*h-5*a-161 : 10*w+6.25*h-5*a+5;
  const mult = {debutant:1.375,intermediaire:1.55,avance:1.725};
  return Math.round(bmr*(mult[p.level]||1.55));
}
function getCalTarget(tdee,goal) {
  const adj={masse:350,seche:-400,fullbody:100,cardio:-200,cuisses:0,stretching:0};
  return tdee+(adj[goal]||0);
}
function getMacros(kcal,w,goal) {
  const prot = goal==="seche" ? w*2.5 : w*2.0;
  const fat = w*1.0;
  const carbs = Math.max(0,(kcal-prot*4-fat*9)/4);
  return {prot:Math.round(prot),fat:Math.round(fat),carbs:Math.round(carbs)};
}
function calcBMI(w,h) { if(!w||!h) return null; return (w/((h/100)**2)).toFixed(1); }
function calcSleepH(bed,wake) {
  const [bh,bm]=bed.split(":").map(Number),[wh,wm]=wake.split(":").map(Number);
  let m=(wh*60+wm)-(bh*60+bm); if(m<0) m+=1440;
  return Math.round(m/60*10)/10;
}
function analyzeWeeklySleep(log) {
  const days=[];
  for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().split("T")[0];if(log[k])days.push(log[k].hours);}
  if(days.length<2) return null;
  const avg=days.reduce((a,b)=>a+b,0)/days.length;
  return {avg:avg.toFixed(1),bad:days.filter(h=>h<7).length,days:days.length};
}
function sendNotif(title,body) {
  if(typeof Notification==="undefined"||Notification.permission!=="granted") return;
  const n=new Notification(`BartFit — ${title}`,{body,tag:"bartfit"});
  setTimeout(()=>n.close(),8000);
}
async function askPerm(){if(typeof Notification==="undefined")return "denied";if(Notification.permission==="default")return await Notification.requestPermission();return Notification.permission;}
function getStreak(log) {
  let s=0;const today=new Date();
  for(let i=0;i<60;i++){const d=new Date(today);d.setDate(d.getDate()-i);const k=d.toISOString().split("T")[0];if(log[k]?.done)s++;else if(i>0)break;}
  return s;
}
function shareText(profile,log,sleepLog,pas) {
  const g=WORKOUTS.find(w=>w.id===profile.goal);
  const streak=getStreak(log);
  const sl=analyzeWeeklySleep(sleepLog);
  const wk=Object.values(log).filter(x=>x.done).length;
  return `💪 Ma semaine BartFit — ${profile.name||"Sportif"}

🏋️ ${wk} séances cette semaine
🔥 ${streak} jours de streak
👣 ${pas.toLocaleString()} pas aujourd'hui
😴 ${sl?.avg||"—"}h de sommeil en moy.
🎯 Objectif : ${g?.label||"Fitness"}

Je m'entraîne avec BartFit ! 💥
#BartFit #Fitness #Sport`;
}

/* ═══════════════════════════════════════════
   STICK FIGURES (14 types)
═══════════════════════════════════════════ */
function getFigType(nom){
  const n=(nom||"").toLowerCase();
  if(/pompe|push/.test(n))return "pushup";
  // Priorités avant "squat" générique
  if(/wall sit/.test(n))return "wallsit";
  if(/gobelet|goblet/.test(n))return "goblet";
  if(/leg press/.test(n))return "legpress";
  if(/squat/.test(n))return "squat";
  if(/soulevé|deadlift|romanian/.test(n))return "deadlift";
  if(/développé couché|bench/.test(n))return "bench";
  if(/développé militaire|overhead|press|pike/.test(n))return "press";
  if(/tirage|row|pull|\bchin/.test(n))return "row";
  if(/planche|gainage|superman|bear/.test(n))return "plank";
  if(/fente|lunge/.test(n))return "lunge";
  // Priorités avant "hipthrust" générique
  if(/donkey kick/.test(n))return "donkeykick";
  if(/clamshell/.test(n))return "clamshell";
  if(/abducteur|abductor/.test(n))return "abductor";
  if(/hip thrust|hip|glute/.test(n))return "hipthrust";
  // leg curl AVANT curl/bicep pour éviter le mauvais mapping
  if(/leg curl/.test(n))return "legcurl";
  if(/burpee|saut|jumping|star|skater|high knee|sprint|course|rameur|battle|elliptique|vélo|tapis|escalier|spinning|stairmaster/.test(n))return "run";
  if(/étirement|stretch|cobra|pigeon|cat|child|rotation|foam|mollet|inchworm/.test(n))return "stretch";
  if(/curl|bicep/.test(n))return "curl";
  if(/crunch|abdo|sit.up|mountain|leg raise|russian/.test(n))return "crunch";
  if(/dip/.test(n))return "dip";
  return "generic";
}

function StickFigure({type="generic",color=C.accent,size=64}){
  const s={stroke:color,strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"};
  const hd={fill:color,stroke:"none"};const gr={...s,strokeWidth:"1",strokeOpacity:"0.2"};
  const bar={...s,strokeWidth:"3.5"};const pl={...s,strokeWidth:"4"};
  const figs={
    generic:(<g {...s}><circle cx="40" cy="9" r="8" {...hd}/><line x1="40" y1="17" x2="40" y2="46"/><line x1="26" y1="24" x2="54" y2="24"/><line x1="26" y1="24" x2="18" y2="40"/><line x1="18" y1="40" x2="14" y2="52"/><line x1="54" y1="24" x2="62" y2="40"/><line x1="62" y1="40" x2="66" y2="52"/><line x1="33" y1="46" x2="26" y2="64"/><line x1="26" y1="64" x2="22" y2="78"/><line x1="47" y1="46" x2="54" y2="64"/><line x1="54" y1="64" x2="58" y2="78"/></g>),
    pushup:(<g {...s}><circle cx="10" cy="30" r="7" {...hd}/><line x1="10" y1="37" x2="17" y2="40"/><line x1="17" y1="40" x2="56" y2="48"/><line x1="27" y1="42" x2="24" y2="55"/><line x1="24" y1="55" x2="19" y2="62"/><line x1="44" y1="46" x2="42" y2="58"/><line x1="42" y1="58" x2="37" y2="64"/><line x1="56" y1="48" x2="64" y2="42"/><line x1="64" y1="42" x2="70" y2="53"/><line x1="56" y1="50" x2="63" y2="44"/><line x1="63" y1="44" x2="69" y2="55"/><line x1="14" y1="65" x2="72" y2="65" {...gr}/></g>),
    squat:(<g {...s}><circle cx="40" cy="10" r="8" {...hd}/><line x1="40" y1="18" x2="40" y2="45"/><line x1="28" y1="27" x2="18" y2="35"/><line x1="18" y1="35" x2="13" y2="45"/><line x1="52" y1="27" x2="62" y2="35"/><line x1="62" y1="35" x2="67" y2="45"/><line x1="33" y1="45" x2="18" y2="58"/><line x1="18" y1="58" x2="16" y2="76"/><line x1="47" y1="45" x2="62" y2="58"/><line x1="62" y1="58" x2="64" y2="76"/><line x1="10" y1="77" x2="70" y2="77" {...gr}/></g>),
    deadlift:(<g {...s}><circle cx="15" cy="18" r="7" {...hd}/><line x1="15" y1="25" x2="20" y2="28"/><line x1="20" y1="28" x2="50" y2="54"/><line x1="26" y1="34" x2="28" y2="58"/><line x1="40" y1="44" x2="42" y2="63"/><line x1="22" y1="60" x2="48" y2="60" {...bar}/><line x1="20" y1="56" x2="20" y2="64" {...pl}/><line x1="50" y1="56" x2="50" y2="64" {...pl}/><line x1="50" y1="54" x2="44" y2="68"/><line x1="44" y1="68" x2="42" y2="80"/><line x1="50" y1="56" x2="56" y2="68"/><line x1="56" y1="68" x2="58" y2="80"/></g>),
    bench:(<g {...s}><circle cx="9" cy="44" r="7" {...hd}/><line x1="9" y1="51" x2="58" y2="54"/><rect x="4" y="57" width="58" height="5" rx="2" {...s} strokeWidth="2"/><line x1="22" y1="52" x2="20" y2="30"/><line x1="42" y1="53" x2="42" y2="30"/><line x1="14" y1="30" x2="48" y2="30" {...bar}/><line x1="12" y1="26" x2="12" y2="34" {...pl}/><line x1="50" y1="26" x2="50" y2="34" {...pl}/><line x1="58" y1="54" x2="65" y2="60"/><line x1="65" y1="60" x2="68" y2="72"/></g>),
    press:(<g {...s}><circle cx="40" cy="12" r="8" {...hd}/><line x1="40" y1="20" x2="40" y2="50"/><line x1="28" y1="26" x2="20" y2="14"/><line x1="20" y1="14" x2="18" y2="5"/><line x1="52" y1="26" x2="60" y2="14"/><line x1="60" y1="14" x2="62" y2="5"/><line x1="12" y1="5" x2="68" y2="5" {...bar}/><line x1="10" y1="1" x2="10" y2="9" {...pl}/><line x1="70" y1="1" x2="70" y2="9" {...pl}/><line x1="34" y1="50" x2="28" y2="66"/><line x1="28" y1="66" x2="24" y2="80"/><line x1="46" y1="50" x2="52" y2="66"/><line x1="52" y1="66" x2="56" y2="80"/></g>),
    row:(<g {...s}><circle cx="14" cy="16" r="7" {...hd}/><line x1="14" y1="23" x2="20" y2="26"/><line x1="20" y1="26" x2="52" y2="54"/><line x1="30" y1="36" x2="40" y2="29"/><line x1="40" y1="29" x2="46" y2="24"/><line x1="40" y1="44" x2="50" y2="38"/><line x1="50" y1="38" x2="55" y2="32"/><line x1="43" y1="22" x2="54" y2="22" {...bar}/><circle cx="41" cy="22" r="3.5" fill={color}/><circle cx="56" cy="22" r="3.5" fill={color}/><line x1="52" y1="54" x2="46" y2="68"/><line x1="46" y1="68" x2="44" y2="80"/><line x1="52" y1="56" x2="58" y2="68"/><line x1="58" y1="68" x2="60" y2="80"/></g>),
    plank:(<g {...s}><circle cx="10" cy="36" r="7" {...hd}/><line x1="10" y1="43" x2="17" y2="46"/><line x1="17" y1="46" x2="62" y2="50"/><line x1="28" y1="47" x2="26" y2="64"/><line x1="46" y1="49" x2="44" y2="64"/><line x1="62" y1="50" x2="70" y2="46"/><line x1="70" y1="46" x2="74" y2="56"/><line x1="62" y1="52" x2="69" y2="48"/><line x1="69" y1="48" x2="73" y2="58"/><line x1="22" y1="66" x2="76" y2="66" {...gr}/></g>),
    lunge:(<g {...s}><circle cx="40" cy="9" r="8" {...hd}/><line x1="40" y1="17" x2="40" y2="46"/><line x1="28" y1="24" x2="22" y2="38"/><line x1="22" y1="38" x2="24" y2="46"/><line x1="52" y1="24" x2="58" y2="38"/><line x1="58" y1="38" x2="56" y2="46"/><line x1="46" y1="46" x2="60" y2="58"/><line x1="60" y1="58" x2="60" y2="78"/><line x1="56" y1="78" x2="64" y2="78"/><line x1="34" y1="46" x2="20" y2="58"/><line x1="20" y1="58" x2="22" y2="76"/><line x1="18" y1="76" x2="26" y2="76"/></g>),
    hipthrust:(<g {...s}><rect x="3" y="32" width="7" height="32" rx="2" strokeWidth="1.5" stroke={color} fillOpacity="0.2" fill={color}/><circle cx="13" cy="38" r="7" {...hd}/><line x1="13" y1="45" x2="20" y2="48"/><line x1="20" y1="48" x2="36" y2="44"/><line x1="36" y1="44" x2="50" y2="56"/><line x1="50" y1="56" x2="46" y2="72"/><line x1="42" y1="72" x2="50" y2="72"/><line x1="36" y1="46" x2="48" y2="58"/><line x1="48" y1="58" x2="44" y2="74"/><line x1="40" y1="74" x2="48" y2="74"/><line x1="8" y1="75" x2="56" y2="75" {...gr}/></g>),
    run:(<g {...s}><circle cx="46" cy="10" r="8" {...hd}/><line x1="46" y1="18" x2="42" y2="48"/><line x1="36" y1="28" x2="26" y2="38"/><line x1="26" y1="38" x2="22" y2="30"/><line x1="40" y1="30" x2="52" y2="34"/><line x1="52" y1="34" x2="56" y2="24"/><line x1="46" y1="48" x2="58" y2="60"/><line x1="58" y1="60" x2="62" y2="76"/><line x1="58" y1="76" x2="66" y2="74"/><line x1="38" y1="48" x2="26" y2="60"/><line x1="26" y1="60" x2="18" y2="72"/><line x1="14" y1="72" x2="22" y2="70"/></g>),
    stretch:(<g {...s}><circle cx="12" cy="30" r="7" {...hd}/><line x1="12" y1="37" x2="16" y2="42"/><line x1="16" y1="42" x2="26" y2="52"/><line x1="26" y1="52" x2="44" y2="58"/><line x1="20" y1="44" x2="52" y2="60"/><line x1="22" y1="47" x2="55" y2="62"/><line x1="44" y1="60" x2="68" y2="60"/><line x1="44" y1="62" x2="68" y2="62"/><line x1="64" y1="57" x2="70" y2="63"/><line x1="10" y1="65" x2="70" y2="65" {...gr}/></g>),
    curl:(<g {...s}><circle cx="40" cy="9" r="8" {...hd}/><line x1="40" y1="17" x2="40" y2="48"/><line x1="28" y1="24" x2="20" y2="40"/><line x1="20" y1="40" x2="18" y2="52"/><line x1="52" y1="24" x2="58" y2="40"/><line x1="58" y1="40" x2="50" y2="24"/><line x1="44" y1="22" x2="56" y2="22" {...bar}/><circle cx="43" cy="22" r="4" fill={color}/><circle cx="57" cy="22" r="4" fill={color}/><line x1="34" y1="48" x2="28" y2="65"/><line x1="28" y1="65" x2="24" y2="80"/><line x1="46" y1="48" x2="52" y2="65"/><line x1="52" y1="65" x2="56" y2="80"/></g>),
    crunch:(<g {...s}><circle cx="14" cy="28" r="7" {...hd}/><line x1="14" y1="35" x2="20" y2="40"/><line x1="20" y1="40" x2="36" y2="46"/><line x1="14" y1="35" x2="10" y2="26"/><line x1="10" y1="26" x2="20" y2="22"/><line x1="20" y1="40" x2="22" y2="30"/><line x1="36" y1="46" x2="56" y2="44"/><line x1="56" y1="44" x2="60" y2="58"/><line x1="56" y1="58" x2="64" y2="62"/><line x1="36" y1="48" x2="52" y2="47"/><line x1="52" y1="47" x2="56" y2="62"/><line x1="10" y1="65" x2="66" y2="65" {...gr}/></g>),
    dip:(<g {...s}><line x1="8" y1="36" x2="28" y2="36" strokeWidth="3"/><line x1="52" y1="36" x2="72" y2="36" strokeWidth="3"/><circle cx="40" cy="9" r="8" {...hd}/><line x1="40" y1="17" x2="40" y2="46"/><line x1="28" y1="24" x2="20" y2="36"/><line x1="20" y1="36" x2="18" y2="48"/><line x1="52" y1="24" x2="60" y2="36"/><line x1="60" y1="36" x2="62" y2="48"/><line x1="34" y1="46" x2="30" y2="60"/><line x1="30" y1="60" x2="34" y2="72"/><line x1="46" y1="46" x2="50" y2="60"/><line x1="50" y1="60" x2="46" y2="72"/></g>),

    // ── Nouvelles figures pour Cuisses & Fessiers ──

    // WALL SIT : dos au mur, genoux 90°, cuisses horizontales, tibias verticaux
    wallsit:(<g {...s}>
      {/* Mur vertical */}
      <line x1="6" y1="8" x2="6" y2="78" stroke={color} strokeWidth="3" strokeOpacity="0.35"/>
      {/* Tête appuyée au mur */}
      <circle cx="20" cy="14" r="8" {...hd}/>
      {/* Corps VERTICAL (dos au mur) */}
      <line x1="20" y1="22" x2="20" y2="50"/>
      {/* Bras posés sur les cuisses */}
      <line x1="20" y1="34" x2="38" y2="50"/>
      <line x1="20" y1="36" x2="36" y2="52"/>
      {/* Cuisse avantbras HORIZONTALE */}
      <line x1="20" y1="50" x2="56" y2="50"/>
      <line x1="20" y1="52" x2="54" y2="52"/>
      {/* Tibia VERTICAL (genou à 90°) */}
      <line x1="56" y1="50" x2="56" y2="74"/>
      <line x1="54" y1="52" x2="54" y2="76"/>
      {/* Pied */}
      <line x1="50" y1="74" x2="60" y2="74"/>
      <line x1="8" y1="76" x2="62" y2="76" {...gr}/>
    </g>),

    // DONKEY KICK : à 4 pattes, une jambe poussée vers le plafond
    donkeykick:(<g {...s}>
      {/* Tête penchée (face vers le bas) */}
      <circle cx="12" cy="42" r="6" {...hd}/>
      <line x1="12" y1="48" x2="18" y2="52"/>
      {/* Corps horizontal */}
      <line x1="18" y1="52" x2="48" y2="54"/>
      {/* Bras avant (main au sol) */}
      <line x1="22" y1="52" x2="20" y2="66"/>
      <line x1="32" y1="52" x2="30" y2="66"/>
      {/* Jambe de support (genou au sol) */}
      <line x1="48" y1="54" x2="46" y2="66"/>
      <line x1="46" y1="66" x2="42" y2="74"/>
      {/* Jambe BOTTÉE vers le haut ↑ */}
      <line x1="48" y1="54" x2="60" y2="40"/>
      <line x1="60" y1="40" x2="66" y2="30"/>
      {/* Indicateur de direction */}
      <line x1="62" y1="24" x2="68" y2="28" strokeWidth="1.5"/>
      <line x1="62" y1="24" x2="66" y2="18" strokeWidth="1.5"/>
      <line x1="62" y1="24" x2="56" y2="20" strokeWidth="1.5"/>
      <line x1="16" y1="68" x2="48" y2="68" {...gr}/>
    </g>),

    // CLAMSHELL : allongé sur le côté, genou du dessus levé (ouverture en coquillage)
    clamshell:(<g {...s}>
      {/* Tête reposant sur le bras */}
      <circle cx="12" cy="46" r="7" {...hd}/>
      {/* Bras support sous la tête */}
      <line x1="12" y1="53" x2="8" y2="44"/>
      <line x1="8" y1="44" x2="16" y2="40"/>
      {/* Corps horizontal (allongé sur le côté) */}
      <line x1="12" y1="53" x2="44" y2="58"/>
      {/* Jambe BASSE (au sol) — genou fléchi vers l'avant */}
      <line x1="44" y1="58" x2="56" y2="66"/>
      <line x1="56" y1="66" x2="54" y2="76"/>
      {/* Jambe HAUTE (genou levé vers le plafond) */}
      <line x1="44" y1="56" x2="58" y2="44"/>
      <line x1="58" y1="44" x2="56" y2="58"/>
      {/* Flèche indiquant le mouvement d'ouverture ↑ */}
      <line x1="56" y1="38" x2="60" y2="42" strokeWidth="1.5"/>
      <line x1="56" y1="38" x2="50" y2="36" strokeWidth="1.5"/>
      {/* Sol */}
      <line x1="6" y1="78" x2="66" y2="78" {...gr}/>
    </g>),

    // LEG CURL : allongé sur le ventre, jambe repliée vers les fessiers
    legcurl:(<g {...s}>
      {/* Tête tournée de côté (allongé face vers le bas) */}
      <circle cx="11" cy="38" r="6" {...hd}/>
      <line x1="11" y1="44" x2="16" y2="48"/>
      {/* Corps allongé FACE VERS LE BAS (prone) */}
      <line x1="16" y1="48" x2="54" y2="52"/>
      {/* Banc / surface */}
      <line x1="6" y1="56" x2="68" y2="56" stroke={color} strokeWidth="1.5" strokeOpacity="0.3"/>
      {/* Bras pliés sous le corps */}
      <line x1="22" y1="50" x2="20" y2="60"/>
      {/* Jambe droite (référence, au repos) */}
      <line x1="54" y1="52" x2="62" y2="54"/>
      <line x1="62" y1="54" x2="64" y2="62"/>
      {/* Jambe REPLIÉE vers les fessiers ↑ (le mouvement) */}
      <line x1="54" y1="52" x2="62" y2="44"/>
      <line x1="62" y1="44" x2="66" y2="34"/>
      <line x1="64" y1="30" x2="70" y2="34" strokeWidth="1.5"/>
      <line x1="64" y1="30" x2="60" y2="26" strokeWidth="1.5"/>
    </g>),

    // GOBLET SQUAT : squat profond en tenant un poids contre la poitrine
    goblet:(<g {...s}>
      <circle cx="40" cy="9" r="8" {...hd}/>
      <line x1="40" y1="17" x2="40" y2="44"/>
      {/* Bras tenant le poids (kettlebell) face à la poitrine */}
      <line x1="28" y1="26" x2="32" y2="33"/>
      <line x1="52" y1="26" x2="48" y2="33"/>
      {/* Kettlebell (poids arrondi) */}
      <circle cx="40" cy="31" r="7" {...s} strokeWidth="2.5" fill={color} fillOpacity="0.18"/>
      <circle cx="40" cy="26" r="2.5" fill={color}/>
      {/* Squat très profond (stance large) */}
      <line x1="33" y1="44" x2="12" y2="60"/>
      <line x1="12" y1="60" x2="10" y2="78"/>
      <line x1="47" y1="44" x2="68" y2="60"/>
      <line x1="68" y1="60" x2="70" y2="78"/>
      <line x1="6" y1="79" x2="74" y2="79" {...gr}/>
    </g>),

    // LEG PRESS : assis/incliné dans la machine, jambes poussant la plateforme
    legpress:(<g {...s}>
      {/* Structure machine (dossier incliné) */}
      <line x1="4" y1="44" x2="34" y2="70" stroke={color} strokeWidth="2" strokeOpacity="0.3"/>
      <line x1="32" y1="68" x2="56" y2="68" stroke={color} strokeWidth="1.5" strokeOpacity="0.25"/>
      {/* Tête inclinée */}
      <circle cx="10" cy="40" r="7" {...hd}/>
      {/* Corps incliné à ~40° */}
      <line x1="10" y1="47" x2="36" y2="64"/>
      {/* Bras sur les accoudoirs */}
      <line x1="16" y1="52" x2="12" y2="62"/>
      <line x1="26" y1="58" x2="24" y2="66"/>
      {/* Cuisse proche du torse (position basse) */}
      <line x1="36" y1="62" x2="52" y2="50"/>
      <line x1="36" y1="64" x2="50" y2="54"/>
      {/* Tibia allant vers la plateforme */}
      <line x1="52" y1="50" x2="64" y2="42"/>
      <line x1="50" y1="54" x2="62" y2="46"/>
      {/* Plateforme (footplate) */}
      <line x1="60" y1="38" x2="70" y2="38" strokeWidth="3"/>
      <line x1="60" y1="40" x2="70" y2="40"/>
    </g>),

    // ABDUCTOR MACHINE : assis, cuisses qui s'écartent vers l'extérieur
    abductor:(<g {...s}>
      {/* Siège de la machine */}
      <line x1="22" y1="54" x2="58" y2="54" strokeWidth="2.5"/>
      {/* Dossier */}
      <line x1="40" y1="54" x2="40" y2="62" strokeWidth="2" strokeOpacity="0.3"/>
      <circle cx="40" cy="9" r="8" {...hd}/>
      <line x1="40" y1="17" x2="40" y2="52"/>
      {/* Bras sur les accoudoirs */}
      <line x1="28" y1="28" x2="20" y2="48"/>
      <line x1="52" y1="28" x2="60" y2="48"/>
      {/* Cuisses très ÉCARTÉES (abduction) */}
      <line x1="34" y1="54" x2="10" y2="64"/>
      <line x1="10" y1="64" x2="8" y2="78"/>
      <line x1="46" y1="54" x2="70" y2="64"/>
      <line x1="70" y1="64" x2="72" y2="78"/>
      {/* Pads de résistance (petites lignes contre les cuisses) */}
      <line x1="26" y1="56" x2="20" y2="60" strokeWidth="3" strokeOpacity="0.5"/>
      <line x1="54" y1="56" x2="60" y2="60" strokeWidth="3" strokeOpacity="0.5"/>
      {/* Flèches d'écartement */}
      <line x1="18" y1="58" x2="12" y2="62" strokeWidth="1.5"/>
      <line x1="62" y1="58" x2="68" y2="62" strokeWidth="1.5"/>
    </g>),
  };
  return (<svg viewBox="0 0 80 85" width={size} height={size} style={{display:"block",flexShrink:0}}>{figs[type]||figs.generic}</svg>);
}

/* ═══════════════════════════════════════════
   ONBOARDING
═══════════════════════════════════════════ */
const ONBOARDING_STEPS = [
  { id:"welcome", title:"Bienvenue 👋", sub:"Ton coach de poche commence ici" },
  { id:"identity", title:"Qui es-tu ?", sub:"Personnalise ton expérience" },
  { id:"body", title:"Ton corps", sub:"Pour calculer tes besoins précis" },
  { id:"goal", title:"Ton objectif", sub:"On va tout adapter pour toi" },
  { id:"training", title:"Ton entraînement", sub:"Où et combien de fois ?" },
  { id:"inspiration", title:"Qui t'inspire ?", sub:"Ton modèle de champion" },
];

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [p, setP] = useState({ name:"",age:"",gender:"homme",weight:"",height:"",level:"intermediaire",goal:"masse",equipment:"les_deux",daysPerWeek:4,inspiration:"ronaldo" });
  const up = (k,v) => setP(x=>({...x,[k]:v}));
  const next = () => { if(step<ONBOARDING_STEPS.length-1) setStep(s=>s+1); else finish(); };
  const back = () => setStep(s=>Math.max(0,s-1));
  const finish = () => {
    const profile = { ...p, createdAt:Date.now(), lastUpdated:Date.now() };
    localStorage.setItem("bartfit_profile", JSON.stringify(profile));
    onDone(profile);
  };
  const canNext = () => {
    if(step===1) return p.name.trim().length>0;
    if(step===2) return p.weight&&p.height&&p.age;
    return true;
  };

  const inputStyle = { width:"100%", background:C.card2, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"14px 16px", color:C.text, fontSize:16, fontFamily:F.b, fontWeight:500, outline:"none", boxSizing:"border-box" };
  const optBtn = (val, cur, set, label, icon) => (
    <button key={val} onClick={()=>set(val)} style={{ flex:1, padding:"12px 6px", borderRadius:14, border:`1.5px solid ${cur===val?C.accent:C.border}`, background:cur===val?C.accentDim:"transparent", color:cur===val?C.accent:C.muted, fontFamily:F.t, fontWeight:700, fontSize:15, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"all 0.2s" }}>
      <span style={{fontSize:22}}>{icon}</span>{label}
    </button>
  );
  const dayBtn = (d) => (
    <button key={d} onClick={()=>up("daysPerWeek",d)} style={{ width:40, height:40, borderRadius:10, border:`1.5px solid ${p.daysPerWeek===d?C.accent:C.border}`, background:p.daysPerWeek===d?C.accentDim:"transparent", color:p.daysPerWeek===d?C.accent:C.muted, fontFamily:F.t, fontWeight:700, fontSize:16, cursor:"pointer" }}>{d}</button>
  );

  const stepContent = [
    /* Welcome */
    <div style={{textAlign:"center",padding:"40px 0 20px"}}>
      <div style={{fontSize:72,marginBottom:16}}>🏋️</div>
      <div style={{fontFamily:F.t,fontWeight:800,fontSize:42,background:`linear-gradient(135deg,${C.accent},${C.blue})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:1}}>BARTFIT</div>
      <div style={{color:C.muted,fontSize:14,marginTop:12,lineHeight:1.7,maxWidth:280,margin:"12px auto 0"}}>Ton compagnon fitness intelligent. Séances, nutrition, sommeil — tout personnalisé pour toi.</div>
      <div style={{marginTop:32,display:"flex",flexDirection:"column",gap:10}}>
        {[["🏆","Entraînements science-based"],["🥗","Nutrition personnalisée"],["😴","Suivi sommeil expert"],["📊","Suivi de tes progrès"]].map(([e,t])=>(<div key={t} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:C.card2,borderRadius:12,border:`1px solid ${C.border}`}}><span style={{fontSize:20}}>{e}</span><span style={{fontSize:13,color:C.muted}}>{t}</span></div>))}
      </div>
    </div>,

    /* Identity */
    <div style={{paddingTop:20}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:C.muted,marginBottom:6,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Prénom</div>
        <input style={inputStyle} placeholder="Ton prénom..." value={p.name} onChange={e=>up("name",e.target.value)} autoFocus/>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:C.muted,marginBottom:6,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Âge</div>
        <input style={inputStyle} type="number" placeholder="25" value={p.age} onChange={e=>up("age",e.target.value)}/>
      </div>
      <div>
        <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Genre</div>
        <div style={{display:"flex",gap:8}}>{["homme","femme"].map(g=>optBtn(g,p.gender,v=>up("gender",v),g==="homme"?"Homme":"Femme",g==="homme"?"🙋‍♂️":"🙋‍♀️"))}</div>
      </div>
    </div>,

    /* Body */
    <div style={{paddingTop:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{label:"Poids (kg)",key:"weight",ph:"75"},{label:"Taille (cm)",key:"height",ph:"175"}].map(({label,key,ph})=>(
          <div key={key}>
            <div style={{fontSize:12,color:C.muted,marginBottom:6,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{label}</div>
            <input style={inputStyle} type="number" placeholder={ph} value={p[key]} onChange={e=>up(key,e.target.value)}/>
          </div>
        ))}
      </div>
      {p.weight&&p.height&&p.age&&(()=>{
        const bmi=calcBMI(p.weight,p.height);
        const tdee=calcTDEE(p);
        return bmi&&tdee?(
          <div style={{background:C.card2,borderRadius:14,padding:14,border:`1px solid ${C.border}`}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:800,fontSize:26,color:parseFloat(bmi)<25?C.accent:C.orange}}>{bmi}</div><div style={{fontSize:11,color:C.muted}}>IMC</div></div>
              <div style={{textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:800,fontSize:26,color:C.blue}}>{tdee}</div><div style={{fontSize:11,color:C.muted}}>kcal/jour estimé</div></div>
            </div>
          </div>
        ):null;
      })()}
    </div>,

    /* Goal */
    <div style={{paddingTop:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {WORKOUTS.map(w=>(
          <button key={w.id} onClick={()=>up("goal",w.id)} style={{padding:"14px 8px",borderRadius:14,border:`1.5px solid ${p.goal===w.id?w.color:C.border}`,background:p.goal===w.id?w.colorDim:"transparent",color:p.goal===w.id?w.color:C.muted,fontFamily:F.b,fontWeight:600,fontSize:12,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:26,marginBottom:6}}>{w.emoji}</div>{w.label}
          </button>
        ))}
      </div>
      <div>
        <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Niveau actuel</div>
        <div style={{display:"flex",gap:8}}>{[["debutant","🌱","Débutant"],["intermediaire","⚡","Intermédiaire"],["avance","🏆","Avancé"]].map(([v,e,l])=>optBtn(v,p.level,v2=>up("level",v2),l,e))}</div>
      </div>
    </div>,

    /* Training */
    <div style={{paddingTop:20}}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Où t'entraînes-tu ?</div>
        <div style={{display:"flex",gap:8}}>{[["maison","🏠","Maison"],["salle","🏋️","Salle"],["les_deux","⚡","Les deux"]].map(([v,e,l])=>optBtn(v,p.equipment,v2=>up("equipment",v2),l,e))}</div>
      </div>
      <div>
        <div style={{fontSize:12,color:C.muted,marginBottom:8,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Jours d'entraînement par semaine</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{[2,3,4,5,6].map(d=>dayBtn(d))}</div>
        <div style={{fontSize:12,color:C.muted,marginTop:10}}>
          {p.daysPerWeek<=3?"🌱 Parfait pour débuter — récupération optimale":p.daysPerWeek<=4?"⚡ Programme standard — idéal pour progresser":"🔥 Programme intensif — focus sur la récupération !"}
        </div>
      </div>
    </div>,

    /* Inspiration */
    <div style={{paddingTop:16}}>
      <div style={{fontSize:13,color:C.muted,marginBottom:12,lineHeight:1.5}}>Ton modèle va influencer tes conseils et ton mindset chaque jour.</div>
      {ATHLETES.map(a=>(
        <button key={a.id} onClick={()=>up("inspiration",a.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:14,border:`1.5px solid ${p.inspiration===a.id?a.color:C.border}`,background:p.inspiration===a.id?a.color+"15":"transparent",cursor:"pointer",marginBottom:8,textAlign:"left",transition:"all 0.2s"}}>
          <div style={{width:44,height:44,borderRadius:12,background:a.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{a.emoji}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:p.inspiration===a.id?a.color:C.text}}>{a.nom}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:1}}>{a.sport} · « {a.tagline} »</div>
          </div>
          {p.inspiration===a.id&&<div style={{color:a.color,fontSize:16}}>✓</div>}
        </button>
      ))}
    </div>,
  ];

  return (
    <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:F.b,color:C.text}}>
      {/* Progress bar */}
      <div style={{padding:"16px 20px 0"}}>
        <div style={{display:"flex",gap:4,marginBottom:4}}>
          {ONBOARDING_STEPS.map((_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:3,background:i<=step?C.accent:C.border,transition:"background 0.3s"}}/>
          ))}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:600}}>{step+1} / {ONBOARDING_STEPS.length}</div>
          {step>0&&<button onClick={back} style={{background:"transparent",border:"none",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:F.b}}>← Retour</button>}
        </div>
      </div>
      <div style={{padding:"8px 20px 120px"}}>
        <div style={{marginBottom:20}}>
          <div style={{fontFamily:F.t,fontWeight:800,fontSize:30,letterSpacing:0.5}}>{ONBOARDING_STEPS[step].title}</div>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{ONBOARDING_STEPS[step].sub}</div>
        </div>
        {stepContent[step]}
      </div>
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,padding:"16px 20px",background:`linear-gradient(transparent,${C.bg} 30%)`,paddingTop:32}}>
        <button onClick={next} disabled={!canNext()} style={{width:"100%",padding:"16px 0",borderRadius:16,border:"none",background:canNext()?C.accent:"#1A2B42",color:canNext()?"#080B14":C.muted2,fontFamily:F.t,fontWeight:800,fontSize:18,cursor:canNext()?"pointer":"not-allowed",letterSpacing:0.5,transition:"all 0.2s"}}>
          {step===ONBOARDING_STEPS.length-1?"COMMENCER BARTFIT 🚀":"CONTINUER →"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════ */
function ProgressRing({value,max,size=110,stroke=8,color=C.accent,children}){
  const r=(size-stroke)/2,circ=2*Math.PI*r,prog=circ*(1-Math.min(value/max,1));
  return (
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={prog} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>{children}</div>
    </div>
  );
}
function Pill({text,color,bg,small}){return (<span style={{background:bg||color+"20",color,border:`1px solid ${color}33`,borderRadius:8,padding:small?"1px 7px":"3px 10px",fontSize:small?10:11,fontWeight:700,fontFamily:F.b,whiteSpace:"nowrap"}}>{text}</span>);}
function SectionHeader({title,sub}){return (<div style={{margin:"20px 0 14px"}}><div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,marginBottom:2}}>{sub}</div><div style={{fontFamily:F.t,fontWeight:800,fontSize:26,letterSpacing:0.3}}>{title}</div></div>);}

/* Rest Timer */
function RestTimer({onClose}){
  const opts=[30,60,90,120,180];
  const [sel,setSel]=useState(90);const [left,setLeft]=useState(90);const [running,setRunning]=useState(false);const ref=useRef(null);
  useEffect(()=>{if(!running)return;ref.current=setInterval(()=>{setLeft(p=>{if(p<=1){clearInterval(ref.current);setRunning(false);sendNotif("Repos terminé !","C'est reparti 💪");return sel;}return p-1;});},1000);return()=>clearInterval(ref.current);},[running,sel]);
  const start=()=>{setLeft(sel);setRunning(true);};const stop=()=>{clearInterval(ref.current);setRunning(false);setLeft(sel);};const fmt=s=>`${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;const pct=left/sel;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(5,9,15,0.94)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{background:C.card,borderRadius:20,border:`1px solid ${C.border}`,padding:24,width:"100%",maxWidth:320,textAlign:"center"}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Minuteur de repos</div>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20}}>{opts.map(o=><button key={o} onClick={()=>{setSel(o);setLeft(o);stop();}} style={{padding:"6px 10px",borderRadius:8,border:`1px solid ${sel===o?C.accent:C.border}`,background:sel===o?C.accentDim:"transparent",color:sel===o?C.accent:C.muted,fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer"}}>{o}s</button>)}</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><ProgressRing value={left} max={sel} size={120} stroke={8} color={pct>0.5?C.teal:pct>0.25?C.orange:C.red}><div style={{fontFamily:F.t,fontWeight:800,fontSize:30,color:C.text}}>{fmt(left)}</div><div style={{fontSize:11,color:C.muted}}>restant</div></ProgressRing></div>
        <div style={{display:"flex",gap:8}}>
          {running?<button onClick={stop} style={{flex:1,padding:12,borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",color:C.text,fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer"}}>⏹ Stop</button>:<button onClick={start} style={{flex:1,padding:12,borderRadius:12,border:"none",background:C.accent,color:"#080B14",fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer"}}>▶ Démarrer</button>}
          <button onClick={onClose} style={{padding:"12px 16px",borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer"}}>✕</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME TAB
═══════════════════════════════════════════ */
function HomeTab({profile,pas,setTab,workoutLog,sleepLog,showUpdateBanner,setShowUpdateBanner,starterMode}){
  const stepGoal = starterMode ? 3000 : 10000;
  const today=new Date();const jours=["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];const mois=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
  const dateStr=`${jours[today.getDay()]} ${today.getDate()} ${mois[today.getMonth()]}`;
  const todayKey=today.toISOString().split("T")[0];const done=workoutLog[todayKey]?.done;
  const goalData=WORKOUTS.find(w=>w.id===profile.goal)||WORKOUTS[0];
  const athlete=ATHLETES.find(a=>a.id===profile.inspiration)||ATHLETES[0];
  const tdee=calcTDEE(profile);const calTarget=tdee?getCalTarget(tdee,profile.goal):null;
  const streak=getStreak(workoutLog);const sl=analyzeWeeklySleep(sleepLog);const todaySleep=sleepLog[todayKey];
  const hydro=Math.min(8,Math.floor(pas/1250));const calories=Math.round(pas*0.04);
  const greet=()=>{ const h=today.getHours(); return h<12?"Bonjour":h<18?"Bonne après-midi":"Bonsoir"; };
  return (
    <div style={{padding:"16px 16px 100px"}}>
      {/* Update banner */}
      {showUpdateBanner&&<div style={{background:C.orange+"18",border:`1px solid ${C.orange}44`,borderRadius:14,padding:"12px 14px",marginBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div><div style={{fontSize:13,fontWeight:700,color:C.orange}}>📊 Mise à jour du profil</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>Ça fait +2 mois — mets à jour tes données !</div></div>
        <div style={{display:"flex",gap:6}}><button onClick={()=>setTab("profil")} style={{padding:"6px 10px",borderRadius:8,border:"none",background:C.orange,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:F.t}}>Mettre à jour</button><button onClick={()=>setShowUpdateBanner(false)} style={{padding:"6px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:11,cursor:"pointer"}}>✕</button></div>
      </div>}
      {/* Greeting hero */}
      <div style={{background:`linear-gradient(135deg,${C.card2} 0%,${C.card} 100%)`,borderRadius:20,border:`1px solid ${C.border}`,padding:"20px 18px",marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{dateStr}</div>
        <div style={{fontFamily:F.t,fontWeight:800,fontSize:34,letterSpacing:0.5}}>{greet()} {profile.name||"Champion"} 👋</div>
        <div style={{fontSize:13,color:done?C.teal:C.muted,marginTop:4}}>{done?"✅ Séance du jour complétée — top !":"Prêt à te surpasser aujourd'hui ?"}</div>
        {streak>1&&<div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,background:C.orange+"18",border:`1px solid ${C.orange}33`,borderRadius:8,padding:"5px 10px"}}><span style={{fontSize:16}}>🔥</span><span style={{fontSize:13,fontWeight:700,color:C.orange}}>{streak} jours de suite</span></div>}
      </div>
      {/* Stats grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
        {[{v:pas>=1000?`${(pas/1000).toFixed(1)}k`:pas,l:"Pas",c:C.accent,sub:`${calories} kcal`},{v:todaySleep?`${todaySleep.hours}h`:sl?`${sl.avg}h`:"-",l:"Sommeil",c:C.purple,sub:todaySleep?"ce soir":"moy. semaine"},{v:streak,l:"Streak",c:C.orange,sub:"jours consécutifs"}].map(({v,l,c,sub})=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontFamily:F.t,fontWeight:800,fontSize:22,color:c}}>{v}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.text,marginTop:1}}>{l}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:1}}>{sub}</div>
          </div>
        ))}
      </div>
      {/* Pas ring card */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"16px",marginBottom:12,display:"flex",alignItems:"center",gap:16}}>
        <ProgressRing value={pas} max={stepGoal} size={92} stroke={7} color={C.accent}><div style={{fontFamily:F.t,fontWeight:800,fontSize:18,color:C.accent,lineHeight:1}}>{pas>=1000?`${(pas/1000).toFixed(1)}k`:pas}</div><div style={{fontSize:8,color:C.muted}}>/ {starterMode?"3k":"10k"}</div></ProgressRing>
        <div style={{flex:1}}>
          <div style={{fontFamily:F.t,fontWeight:700,fontSize:18}}>Activité du jour</div>
          <div style={{color:C.muted,fontSize:12,marginBottom:8}}>{Math.round(pas/stepGoal*100)}% · {starterMode?<span style={{color:C.teal,fontWeight:700}}>🌱 Mode Découverte</span>:"objectif quotidien"}</div>
          <div style={{display:"flex",gap:6}}><Pill text={`${calories} kcal`} color={C.orange}/><Pill text={`${(pas*0.0007).toFixed(1)} km`} color={C.blue}/></div>
        </div>
      </div>
      {/* TDEE card */}
      {calTarget&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div><div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Objectif calorique</div><div style={{fontFamily:F.t,fontWeight:800,fontSize:24,color:goalData.color}}>{calTarget.toLocaleString()} kcal</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>TDEE de base</div><div style={{fontFamily:F.t,fontWeight:700,fontSize:18,color:C.muted}}>{tdee?.toLocaleString()}</div></div>
        </div>
        {(()=>{const m=getMacros(calTarget,parseFloat(profile.weight)||70,profile.goal);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>{[{l:"Protéines",v:`${m.prot}g`,c:C.red},{l:"Glucides",v:`${m.carbs}g`,c:C.orange},{l:"Lipides",v:`${m.fat}g`,c:C.blue}].map(({l,v,c})=>(<div key={l} style={{background:C.card2,borderRadius:10,padding:"8px 6px",textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:700,fontSize:16,color:c}}>{v}</div><div style={{fontSize:10,color:C.muted}}>{l}</div></div>))}</div>);})()}
      </div>}
      {/* Today's workout preview */}
      <div style={{background:C.card,border:`1px solid ${goalData.color}44`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div><div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Séance du jour</div><div style={{fontFamily:F.t,fontWeight:800,fontSize:20,color:goalData.color}}>{goalData.emoji} {goalData.label}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Durée estimée</div><div style={{fontFamily:F.t,fontWeight:700,fontSize:18,color:C.muted}}>{goalData.tempsEst} min</div></div>
        </div>
        {(profile.equipment==="salle"?goalData.salle:goalData.maison).slice(0,3).map((ex,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}>
            <div style={{background:goalData.color+"15",borderRadius:8,padding:"2px"}}>
              <StickFigure type={getFigType(ex.nom)} color={goalData.color} size={34}/>
            </div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{ex.nom}</div><div style={{fontSize:11,color:C.muted}}>{ex.muscle}</div></div>
            <div style={{fontFamily:F.t,fontWeight:700,fontSize:14,color:goalData.color}}>{getLevelSets(profile.level,ex.setsBase).split(" ")[0]}</div>
          </div>
        ))}
        {!done&&<button onClick={()=>setTab("workout")} style={{marginTop:12,width:"100%",background:goalData.color,color:"#080B14",border:"none",borderRadius:12,padding:12,fontFamily:F.t,fontWeight:800,fontSize:15,cursor:"pointer",letterSpacing:0.3}}>VOIR LA SÉANCE COMPLÈTE →</button>}
      </div>
      {/* Athlete quote */}
      <div style={{background:C.card,border:`1px solid ${athlete.color}33`,borderRadius:16,padding:16,marginBottom:12,borderLeft:`3px solid ${athlete.color}`}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{fontSize:28,flexShrink:0}}>{athlete.emoji}</div>
          <div>
            <div style={{fontSize:13,lineHeight:1.7,fontStyle:"italic",color:C.text}}>« {athlete.philosophy} »</div>
            <div style={{fontSize:11,color:athlete.color,fontWeight:700,marginTop:6}}>— {athlete.nom}</div>
          </div>
        </div>
        <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:6,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Conseil du jour ({athlete.nom.split(" ")[0]})</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>💡 {rand(athlete.tips)}</div>
        </div>
      </div>
      {/* Hydratation */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{fontFamily:F.t,fontWeight:700,fontSize:17}}>💧 Hydratation estimée</div><div style={{fontFamily:F.t,fontWeight:800,fontSize:20,color:hydro>=8?C.accent:C.blue}}>{hydro}/8</div></div>
        <div style={{display:"flex",gap:3}}>{Array.from({length:8}).map((_,i)=>(<div key={i} style={{flex:1,height:5,borderRadius:3,background:i<hydro?C.blue:C.border,transition:"background 0.3s"}}/>))}</div>
        <div style={{fontSize:11,color:C.muted,marginTop:6}}>{Math.round(pas*0.035/100)*100}ml estimés · Objectif 2.5L/jour</div>
      </div>
    </div>
  );
}

function getLevelSets(level,base){
  const m={debutant:0.75,intermediaire:1,avance:1.25};const reps={debutant:"12–15",intermediaire:"8–12",avance:"6–8"};const rest={debutant:"90s",intermediaire:"75s",avance:"60s"};
  return `${Math.round(base*(m[level]||1))}×${reps[level]||"8–12"} · repos ${rest[level]||"75s"}`;
}

/* ═══════════════════════════════════════════
   WORKOUT TAB
═══════════════════════════════════════════ */
function WorkoutTab({profile,workoutLog,setWorkoutLog,starterMode,setStarterMode}){
  const [env,setEnv]=useState(profile.equipment==="salle"?"salle":"maison");
  const [selGoal,setSelGoal]=useState(profile.goal||"masse");
  const [expanded,setExpanded]=useState(null);
  const [showTimer,setShowTimer]=useState(false);
  const [rating,setRating]=useState(null);
  const todayKey=new Date().toISOString().split("T")[0];const done=workoutLog[todayKey]?.done;
  const goalData=WORKOUTS.find(w=>w.id===selGoal)||WORKOUTS[0];
  const allExercises=goalData[env];
  // Mode Découverte : 3 exercices max, 2 séries seulement
  const exercises = starterMode ? allExercises.slice(0,3) : allExercises;
  const getStarter = (base) => `2×12–15 (repos 90s)`;
  const lastRating=Object.values(workoutLog).slice(-3).find(x=>x.rating)?.rating;
  const markDone=(r)=>{
    const upd={...workoutLog,[todayKey]:{done:true,goal:selGoal,env,rating:r||"moyen"}};
    setWorkoutLog(upd);try{localStorage.setItem("fitapp_wlog",JSON.stringify(upd));}catch{}
    sendNotif("Séance terminée 🎉","Top boulot ! Continue comme ça.");
    setRating(null);
  };
  return (
    <div style={{padding:"16px 16px 100px"}}>
      {showTimer&&<RestTimer onClose={()=>setShowTimer(false)}/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
        <div style={{fontFamily:F.t,fontWeight:800,fontSize:28,marginTop:20}}>Ma Séance</div>
        <button onClick={()=>setShowTimer(true)} style={{marginTop:20,padding:"8px 14px",borderRadius:10,border:`1px solid ${C.teal}44`,background:C.teal+"11",color:C.teal,fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer"}}>⏱ Repos</button>
      </div>

      {/* ── Mode Découverte toggle ── */}
      <div style={{background:starterMode?C.teal+"15":C.card,border:`1.5px solid ${starterMode?C.teal+"66":C.border}`,borderRadius:14,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.3s"}}>
        <div>
          <div style={{fontFamily:F.t,fontWeight:700,fontSize:16,color:starterMode?C.teal:C.text}}>{starterMode?"🌱 Mode Découverte actif":"⚡ Mode Standard"}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>{starterMode?"3 exercices · 2 séries · ~15 min · Parfait pour débuter":"Programme complet selon ton niveau"}</div>
        </div>
        <button onClick={()=>setStarterMode(!starterMode)} style={{padding:"8px 14px",borderRadius:10,border:`1px solid ${starterMode?C.teal:C.border}`,background:starterMode?C.teal:"transparent",color:starterMode?"#050910":C.muted,fontFamily:F.t,fontWeight:700,fontSize:13,cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>{starterMode?"Désactiver":"Activer"}</button>
      </div>

      {starterMode&&<div style={{background:C.teal+"10",border:`1px solid ${C.teal}33`,borderRadius:12,padding:"10px 14px",marginBottom:10,fontSize:12,color:C.teal,lineHeight:1.6}}>
        ✅ Commence par ces 3 exercices fondamentaux. Quand tu les maîtrises, passe en Mode Standard pour la séance complète !
      </div>}

      {/* Adapt feedback */}
      {!starterMode&&lastRating&&<div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",marginBottom:10,fontSize:12,color:C.muted}}>
        {lastRating==="facile"?"💪 Dernière séance facile — on monte le volume cette fois !"
        :lastRating==="difficile"?"🎯 Dernière séance dure — même plan, on garde ce rythme"
        :"✅ Bonne progression — continue comme ça !"}
      </div>}
      {/* Env toggle */}
      <div style={{background:C.card,borderRadius:14,padding:4,display:"flex",marginBottom:10,border:`1px solid ${C.border}`}}>
        {[{id:"maison",label:"🏠 Maison"},{id:"salle",label:"🏋️ Salle"}].map(({id,label})=>(
          <button key={id} onClick={()=>{setEnv(id);setExpanded(null);}} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",background:env===id?C.accent:"transparent",color:env===id?"#080B14":C.muted,fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer",transition:"all 0.2s"}}>{label}</button>
        ))}
      </div>
      {/* Goal selector */}
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:6,scrollbarWidth:"none",marginBottom:10}}>
        {WORKOUTS.map(w=>(
          <button key={w.id} onClick={()=>{setSelGoal(w.id);setExpanded(null);}} style={{flexShrink:0,padding:"7px 12px",borderRadius:12,border:`1px solid ${selGoal===w.id?w.color:C.border}`,background:selGoal===w.id?w.color+"22":C.card,color:selGoal===w.id?w.color:C.muted,fontFamily:F.b,fontWeight:600,fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>{w.emoji} {w.label}</button>
        ))}
      </div>
      {/* Science banner */}
      <div style={{background:goalData.colorDim,border:`1px solid ${goalData.color}33`,borderRadius:12,padding:"10px 14px",marginBottom:10,fontSize:11,color:goalData.color}}>
        🔬 {goalData.science}
      </div>
      {/* Header */}
      <div style={{background:`linear-gradient(135deg,${goalData.colorDim},${C.card})`,border:`1px solid ${goalData.color}44`,borderRadius:16,padding:"14px 16px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontFamily:F.t,fontWeight:800,fontSize:24,color:goalData.color}}>{goalData.emoji} {goalData.label}</div><div style={{fontSize:12,color:C.muted}}>{exercises.length} exercices · ~{goalData.tempsEst} min · {profile.level==="debutant"?"Adapté débutant":profile.level==="avance"?"Version avancée":"Intermédiaire"}</div></div>
          {done&&<Pill text="✅ FAIT" color={C.accent}/>}
        </div>
      </div>
      {/* Equipment summary (salle) */}
      {env==="salle"&&<div style={{background:C.blueDim,border:`1px solid ${C.blue}33`,borderRadius:12,padding:"10px 14px",marginBottom:10,fontSize:12,color:C.blue}}>🏋️ {[...new Set(exercises.flatMap(e=>e.equipement||[]))].join(" · ")||"Voir chaque exercice"}</div>}
      {/* Exercises */}
      {exercises.map((ex,i)=>(
        <div key={i} onClick={()=>setExpanded(expanded===i?null:i)} style={{background:C.card,borderRadius:16,border:`1px solid ${expanded===i?goalData.color+"66":C.border}`,padding:14,marginBottom:8,cursor:"pointer",transition:"border-color 0.2s"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{background:goalData.color+"15",borderRadius:12,padding:"4px 2px",flexShrink:0}}><StickFigure type={getFigType(ex.nom)} color={goalData.color} size={58}/></div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4}}><div style={{fontWeight:700,fontSize:14,lineHeight:1.3}}>{ex.nom}</div><div style={{transform:expanded===i?"rotate(180deg)":"none",transition:"transform 0.3s",color:goalData.color,fontSize:11,flexShrink:0}}>▼</div></div>
              <div style={{fontSize:12,color:goalData.color,fontFamily:F.t,fontWeight:700,marginTop:4}}>{starterMode?getStarter(ex.setsBase):getLevelSets(profile.level,ex.setsBase)}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:4}}>
                <Pill text={ex.muscle} color={C.muted} small/>
                {ex.equipement&&ex.equipement.map((eq,j)=><Pill key={j} text={eq} color={C.blue} small/>)}
              </div>
            </div>
          </div>
          {expanded===i&&<div style={{marginTop:10}}>
            <div style={{background:goalData.colorDim,borderRadius:10,padding:"10px 12px",fontSize:12,lineHeight:1.7,borderLeft:`3px solid ${goalData.color}`}}>💡 {ex.conseil}</div>
            {ex.alternatif&&<div style={{marginTop:6,background:C.accentDim,borderRadius:10,padding:"8px 12px",fontSize:12,lineHeight:1.7,borderLeft:`3px solid ${C.accent}`}}>🏠 <strong style={{color:C.accent}}>Conseil :</strong> {ex.alternatif}</div>}
          </div>}
        </div>
      ))}
      {/* Complete workout */}
      <div style={{marginTop:8}}>
        {done?<div style={{background:C.accent+"18",border:`1px solid ${C.accent}33`,borderRadius:14,padding:"14px",textAlign:"center",color:C.accent,fontFamily:F.t,fontWeight:700,fontSize:16}}>✅ SÉANCE COMPLÉTÉE AUJOURD'HUI !</div>
        :<div>
          <div style={{fontSize:12,color:C.muted,textAlign:"center",marginBottom:8}}>Comment était cette séance ?</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
            {[["facile","😅","Facile"],["moyen","💪","Bien"],["difficile","🔥","Difficile"]].map(([v,e,l])=>(<button key={v} onClick={()=>markDone(v)} style={{padding:"12px 6px",borderRadius:12,border:`1px solid ${C.border}`,background:C.card,color:C.text,fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer",textAlign:"center"}}><div style={{fontSize:22,marginBottom:2}}>{e}</div>{l}</button>))}
          </div>
        </div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NUTRITION TAB
═══════════════════════════════════════════ */
function NutritionTab({profile}){
  const [activeAth,setActiveAth]=useState(null);const tdee=calcTDEE(profile);
  const plan=NUTRITION_BASE.find(n=>n.id===profile.goal)||NUTRITION_BASE[0];
  const calTarget=tdee?getCalTarget(tdee,profile.goal):null;
  const macros=calTarget?getMacros(calTarget,parseFloat(profile.weight)||70,profile.goal):null;
  const athlete=ATHLETES.find(a=>a.id===profile.inspiration)||ATHLETES[0];
  return (
    <div style={{padding:"16px 16px 100px"}}>
      <SectionHeader title="Nutrition" sub="Plans & conseils"/>
      {/* Personalized header */}
      {calTarget&&<div style={{background:`linear-gradient(135deg,${plan.color}15,${C.card})`,border:`1px solid ${plan.color}44`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{fontFamily:F.t,fontWeight:800,fontSize:24,color:plan.color,marginBottom:10}}>{plan.icon} {plan.label}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div style={{background:C.card2,borderRadius:12,padding:"12px 10px",textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:800,fontSize:24,color:plan.color}}>{calTarget.toLocaleString()}</div><div style={{fontSize:11,color:C.muted}}>kcal/jour cible</div></div>
          <div style={{background:C.card2,borderRadius:12,padding:"12px 10px",textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:800,fontSize:24,color:C.muted}}>{tdee?.toLocaleString()}</div><div style={{fontSize:11,color:C.muted}}>TDEE de base</div></div>
        </div>
        {macros&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>{[{l:"Protéines",v:`${macros.prot}g`,c:C.red},{l:"Glucides",v:`${macros.carbs}g`,c:C.orange},{l:"Lipides",v:`${macros.fat}g`,c:C.blue}].map(({l,v,c})=>(<div key={l} style={{background:C.card2,borderRadius:10,padding:"10px 6px",textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:700,fontSize:18,color:c}}>{v}</div><div style={{fontSize:10,color:C.muted}}>{l}</div></div>))}</div>}
      </div>}
      {/* Meal plan */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:0,overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"12px 16px 6px",fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Plan repas journalier</div>
        {plan.repas.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:10,padding:"12px 16px",borderBottom:i<plan.repas.length-1?`1px solid ${C.border}`:"none"}}>
            <div style={{width:48,flexShrink:0}}><div style={{fontFamily:F.t,fontWeight:700,fontSize:13,color:plan.color}}>{r.h}</div><div style={{fontSize:10,color:C.muted,marginTop:1}}>{r.kcal} kcal</div></div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{r.nom}</div><div style={{fontSize:12,color:C.muted,marginTop:2,lineHeight:1.5}}>{r.desc}</div></div>
          </div>
        ))}
      </div>
      {/* Athlete diet inspiration */}
      <div style={{background:C.card,border:`1px solid ${athlete.color}33`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{fontSize:24}}>{athlete.emoji}</div><div><div style={{fontFamily:F.t,fontWeight:800,fontSize:18,color:athlete.color}}>Régime {athlete.nom.split(" ")[0]}</div><div style={{fontSize:11,color:C.muted}}>{athlete.diet.kcal} · {athlete.diet.protein} protéines</div></div></div>
        <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.6}}>{athlete.diet.pattern}</div>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>Top aliments</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{athlete.diet.top.map((f,i)=>(<Pill key={i} text={f} color={athlete.color}/>))}</div>
      </div>
      {/* Key tips */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Conseils clés</div>
        {plan.conseils.map((c,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
            <div style={{width:24,height:24,borderRadius:7,flexShrink:0,background:plan.color+"22",color:plan.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:F.t}}>{i+1}</div>
            <div style={{fontSize:13,lineHeight:1.6}}>{c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RAPPELS + SOMMEIL TAB
═══════════════════════════════════════════ */
const RAPPELS_DEFAULT=[
  {id:1,nom:"Hydratation",emoji:"💧",cat:"santé",couleur:C.blue,heure:"08:00",actif:true},
  {id:2,nom:"Séance du jour",emoji:"🏋️",cat:"entraîn.",couleur:C.accent,heure:"18:00",actif:true},
  {id:3,nom:"Repas protéiné",emoji:"🥩",cat:"nutrition",couleur:C.orange,heure:"13:00",actif:true},
  {id:4,nom:"Coucher",emoji:"😴",cat:"sommeil",couleur:C.purple,heure:"22:30",actif:true},
  {id:5,nom:"Réveil",emoji:"☀️",cat:"sommeil",couleur:C.yellow,heure:"06:30",actif:true},
  {id:6,nom:"Stretching soir",emoji:"🧘",cat:"récup.",couleur:C.teal,heure:"20:00",actif:false},
  {id:7,nom:"Compléments",emoji:"💊",cat:"nutrition",couleur:C.pink,heure:"09:00",actif:false},
  {id:8,nom:"Marche active",emoji:"🚶",cat:"activité",couleur:C.orange,heure:"12:30",actif:true},
];

function RappelsTab({profile,sleepLog,setSleepLog}){
  const [rappels,setRappels]=useState(()=>{try{const s=localStorage.getItem("fitapp_rappels");return s?JSON.parse(s):RAPPELS_DEFAULT;}catch{return RAPPELS_DEFAULT;}});
  const [perm,setPerm]=useState(typeof Notification!=="undefined"?Notification.permission:"denied");
  const [sleepTab,setSleepTab]=useState(false);
  const todayKey=new Date().toISOString().split("T")[0];const todaySleep=sleepLog[todayKey]||{};
  const [bedtime,setBedtime]=useState(todaySleep.bed||"22:30");const [waketime,setWaketime]=useState(todaySleep.wake||"06:30");const [sleepSaved,setSleepSaved]=useState(false);
  useEffect(()=>{try{localStorage.setItem("fitapp_rappels",JSON.stringify(rappels));}catch{};},[rappels]);
  const toggle=id=>setRappels(r=>r.map(x=>x.id===id?{...x,actif:!x.actif}:x));
  const setHeure=(id,h)=>setRappels(r=>r.map(x=>x.id===id?{...x,heure:h}:x));
  const saveSleep=()=>{const h=calcSleepH(bedtime,waketime);const upd={...sleepLog,[todayKey]:{bed:bedtime,wake:waketime,hours:h}};setSleepLog(upd);try{localStorage.setItem("fitapp_sleep",JSON.stringify(upd));}catch{}setSleepSaved(true);setTimeout(()=>setSleepSaved(false),2000);const anal=analyzeWeeklySleep(upd);if(anal&&anal.days>=5&&new Date().getDay()===0){const msg=parseFloat(anal.avg)>=7?`Excellente semaine : ${anal.avg}h en moyenne 🌟`:`${anal.avg}h en moy. — Conseil : ${rand(SLEEP_TIPS)}`;sendNotif("Bilan sommeil",msg);}};
  const weekDays=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return d.toISOString().split("T")[0];});
  const anal=analyzeWeeklySleep(sleepLog);const sc=h=>h>=8?C.teal:h>=7?C.accent:h>=6?C.orange:C.red;
  const inputStyle={background:C.card2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",color:C.purple,fontSize:16,fontFamily:F.t,fontWeight:700,outline:"none",width:"100%",boxSizing:"border-box"};
  return (
    <div style={{padding:"16px 16px 100px"}}>
      <SectionHeader title="Rappels & Sommeil" sub="Programmés"/>
      {/* Permission */}
      <div style={{background:perm==="granted"?C.accent+"15":C.orange+"15",border:`1px solid ${perm==="granted"?C.accent:C.orange}44`,borderRadius:12,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:12,fontWeight:600}}>{perm==="granted"?"✅ Notifications activées":"⚠️ Active les notifications"}</div>
        {perm!=="granted"&&<button onClick={async()=>setPerm(await askPerm())} style={{padding:"6px 12px",borderRadius:8,border:"none",background:C.accent,color:"#080B14",fontSize:12,fontWeight:700,cursor:"pointer"}}>Activer</button>}
      </div>
      {/* Tab */}
      <div style={{background:C.card,borderRadius:14,padding:4,display:"flex",marginBottom:14,border:`1px solid ${C.border}`}}>
        {[{v:false,l:"🔔 Rappels"},{v:true,l:"😴 Sommeil"}].map(({v,l})=>(
          <button key={String(v)} onClick={()=>setSleepTab(v)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",background:sleepTab===v?C.purple:"transparent",color:sleepTab===v?"#fff":C.muted,fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer"}}>{l}</button>
        ))}
      </div>
      {!sleepTab?(
        <>
          {rappels.map(r=>(
            <div key={r.id} style={{background:C.card,borderRadius:14,border:`1px solid ${r.actif?r.couleur+"44":C.border}`,padding:14,marginBottom:8,opacity:r.actif?1:0.65,transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{width:40,height:40,borderRadius:12,flexShrink:0,background:r.couleur+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{r.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div style={{fontWeight:700,fontSize:14}}>{r.nom}</div>
                    <button onClick={()=>toggle(r.id)} style={{width:42,height:22,borderRadius:11,border:"none",background:r.actif?r.couleur:C.border,cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
                      <div style={{width:16,height:16,borderRadius:8,background:"#fff",position:"absolute",top:3,left:r.actif?22:3,transition:"left 0.2s"}}/>
                    </button>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    <input type="time" value={r.heure} onChange={e=>setHeure(r.id,e.target.value)} style={{background:C.card2,border:`1px solid ${C.border}`,color:r.couleur,borderRadius:8,padding:"5px 8px",fontSize:13,fontFamily:F.t,fontWeight:700,outline:"none"}}/>
                    <Pill text={r.cat} color={r.couleur} small/>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{background:C.orange+"15",border:`1px solid ${C.orange}33`,borderRadius:14,padding:14,marginTop:4}}>
            <div style={{fontSize:12,color:C.orange,fontWeight:700,marginBottom:6}}>🔥 Séance manquée ?</div>
            <button onClick={()=>sendNotif("Allez !",rand(MOTIV))} style={{width:"100%",padding:10,borderRadius:10,border:`1px solid ${C.orange}44`,background:C.orange+"15",color:C.orange,fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer"}}>💬 Message de motivation</button>
          </div>
        </>
      ):(
        <>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Saisir mon sommeil</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {[{label:"Coucher",val:bedtime,set:setBedtime},{label:"Lever",val:waketime,set:setWaketime}].map(({label,val,set})=>(<div key={label}><div style={{fontSize:11,color:C.muted,marginBottom:4}}>{label}</div><input type="time" value={val} onChange={e=>set(e.target.value)} style={inputStyle}/></div>))}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div><div style={{fontSize:11,color:C.muted}}>Durée calculée</div><div style={{fontFamily:F.t,fontWeight:800,fontSize:30,color:sc(calcSleepH(bedtime,waketime))}}>{calcSleepH(bedtime,waketime)}h</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:11,color:C.muted}}>Qualité</div><div style={{fontSize:28}}>{calcSleepH(bedtime,waketime)>=8?"🌟":calcSleepH(bedtime,waketime)>=7?"✅":calcSleepH(bedtime,waketime)>=6?"⚠️":"😰"}</div></div>
            </div>
            <button onClick={saveSleep} style={{width:"100%",padding:12,borderRadius:12,border:"none",background:sleepSaved?C.accent:C.purple,color:sleepSaved?"#080B14":"#fff",fontFamily:F.t,fontWeight:700,fontSize:15,cursor:"pointer",transition:"all 0.3s"}}>{sleepSaved?"✅ ENREGISTRÉ !":"ENREGISTRER MON SOMMEIL"}</button>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Cette semaine</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:12}}>
              {weekDays.map((d,i)=>{const s=sleepLog[d];const dn=["D","L","M","M","J","V","S"][new Date(d).getDay()];return(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontSize:10,color:C.muted,marginBottom:4}}>{dn}</div>
                  <div style={{height:48,borderRadius:8,background:s?sc(s.hours)+"22":C.card2,border:`1px solid ${s?sc(s.hours)+"44":C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                    {s?<><div style={{fontFamily:F.t,fontWeight:700,fontSize:14,color:sc(s.hours)}}>{s.hours}</div><div style={{fontSize:8,color:C.muted}}>h</div></>:<div style={{fontSize:14,opacity:0.2}}>—</div>}
                  </div>
                </div>
              );})}
            </div>
            {anal&&<div style={{background:parseFloat(anal.avg)>=7?C.accent+"15":C.orange+"15",borderRadius:10,padding:"10px 12px"}}>
              <div style={{fontFamily:F.t,fontWeight:800,fontSize:20,color:parseFloat(anal.avg)>=7?C.accent:C.orange}}>Moyenne : {anal.avg}h / nuit</div>
              <div style={{fontSize:12,color:C.muted,marginTop:2}}>{anal.bad>0?`${anal.bad} nuit(s) sous 7h — ${rand(SLEEP_TIPS)}`:"Excellent ! Toutes tes nuits dépassent 7h 🌟"}</div>
            </div>}
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Sommeil des champions</div>
            {ATHLETES.map(a=>(<div key={a.id} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:20,flexShrink:0}}>{a.emoji}</div>
              <div><div style={{fontSize:13,fontWeight:700,color:a.color}}>{a.nom.split(" ")[0]}</div><div style={{fontSize:12,color:C.muted,marginTop:2,lineHeight:1.5}}>{a.sleep}</div></div>
            </div>))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROFIL TAB
═══════════════════════════════════════════ */
function ProfilTab({profile,setProfile,workoutLog,sleepLog,pas}){
  const [editing,setEditing]=useState(false);const [ep,setEp]=useState({...profile});const [saved,setSaved]=useState(false);const [shareMsg,setShareMsg]=useState("");
  const [activeAth,setActiveAth]=useState(null);
  const streak=getStreak(workoutLog);const wkTotal=Object.values(workoutLog).filter(x=>x.done).length;const sl=analyzeWeeklySleep(sleepLog);
  const bmi=calcBMI(profile.weight,profile.height);const tdee=calcTDEE(profile);
  const saveProfile=()=>{const p={...ep,lastUpdated:Date.now()};setProfile(p);localStorage.setItem("bartfit_profile",JSON.stringify(p));setSaved(true);setEditing(false);setTimeout(()=>setSaved(false),2000);};
  const doShare=(type)=>{
    const text=shareText(profile,workoutLog,sleepLog,pas);
    if(type==="native"&&navigator.share){navigator.share({title:"BartFit Progress",text});return;}
    if(type==="whatsapp"){window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");return;}
    if(type==="facebook"){window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`,"_blank");return;}
    if(type==="twitter"){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,"_blank");return;}
    navigator.clipboard.writeText(text).then(()=>setShareMsg("✅ Copié !")).finally(()=>setTimeout(()=>setShareMsg(""),2000));
  };
  const athlete=ATHLETES.find(a=>a.id===profile.inspiration)||ATHLETES[0];
  const inputStyle={width:"100%",background:C.card2,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"10px 12px",color:C.text,fontSize:15,fontFamily:F.b,fontWeight:500,outline:"none",boxSizing:"border-box"};
  return (
    <div style={{padding:"16px 16px 100px"}}>
      <SectionHeader title={profile.name||"Mon Profil"} sub="Profil & Progrès"/>
      {/* Stats hero */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
        {[{v:wkTotal,l:"Séances",c:C.accent},{v:`${streak}j`,l:"Streak",c:C.orange},{v:sl?.avg?`${sl.avg}h`:"-",l:"Sommeil",c:C.purple}].map(({v,l,c})=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
            <div style={{fontFamily:F.t,fontWeight:800,fontSize:22,color:c}}>{v}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Share card */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>📤 Partager mes progrès</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,marginBottom:shareMsg?8:0}}>
          {[["📱","Native",()=>doShare("native")],["💬","WhatsApp",()=>doShare("whatsapp")],["👤","Facebook",()=>doShare("facebook")],["🐦","Twitter",()=>doShare("twitter")]].map(([e,l,fn])=>(
            <button key={l} onClick={fn} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 12px",borderRadius:12,border:`1px solid ${C.border}`,background:C.card2,cursor:"pointer",color:C.text,fontFamily:F.b,fontWeight:600,fontSize:13}}>
              <span style={{fontSize:18}}>{e}</span>{l}
            </button>
          ))}
        </div>
        <button onClick={()=>doShare("copy")} style={{width:"100%",padding:"10px 0",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontFamily:F.b,fontWeight:600,fontSize:13,cursor:"pointer",marginTop:6}}>📋 Copier le texte</button>
        {shareMsg&&<div style={{textAlign:"center",color:C.accent,fontSize:13,fontWeight:700,marginTop:8}}>{shareMsg}</div>}
      </div>
      {/* Stats body */}
      {bmi&&<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{v:`${profile.weight}kg`,l:"Poids",c:C.text},{v:`${profile.height}cm`,l:"Taille",c:C.text},{v:bmi,l:"IMC",c:parseFloat(bmi)<25?C.accent:C.orange}].map(({v,l,c})=>(<div key={l} style={{background:C.card2,borderRadius:10,padding:"10px 8px",textAlign:"center"}}><div style={{fontFamily:F.t,fontWeight:800,fontSize:20,color:c}}>{v}</div><div style={{fontSize:11,color:C.muted,marginTop:1}}>{l}</div></div>))}
        </div>
        {tdee&&<div style={{marginTop:8,background:C.accentDim,borderRadius:10,padding:"10px 12px",textAlign:"center"}}><span style={{fontFamily:F.t,fontWeight:800,fontSize:18,color:C.accent}}>{tdee.toLocaleString()} kcal</span><span style={{fontSize:12,color:C.muted}}> TDEE estimé</span></div>}
      </div>}
      {/* Athlete inspiration */}
      <div style={{background:C.card,border:`1px solid ${athlete.color}33`,borderRadius:16,padding:16,marginBottom:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{fontSize:32}}>{athlete.emoji}</div>
          <div><div style={{fontFamily:F.t,fontWeight:800,fontSize:20,color:athlete.color}}>{athlete.nom}</div><div style={{fontSize:11,color:C.muted}}>{athlete.sport} · {athlete.tagline}</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[{l:"Entraînement",v:athlete.training.sessions,e:"💪"},{l:"Sommeil",v:athlete.sleep.split(" ")[0],e:"😴"},{l:"Calories",v:athlete.diet.kcal,e:"🥗"},{l:"Protéines",v:athlete.diet.protein,e:"🥩"}].map(({l,v,e})=>(<div key={l} style={{background:C.card2,borderRadius:10,padding:"8px 10px"}}><div style={{fontSize:10,color:C.muted,marginBottom:2}}>{e} {l}</div><div style={{fontSize:12,fontWeight:700,color:C.text}}>{v}</div></div>))}
        </div>
        <div style={{fontSize:11,color:C.muted,fontStyle:"italic",borderTop:`1px solid ${C.border}`,paddingTop:10,lineHeight:1.7}}>« {athlete.philosophy} »</div>
      </div>
      {/* Edit profile */}
      {editing?(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:16,marginBottom:12}}>
          <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Modifier le profil</div>
          {[{label:"Prénom",key:"name",type:"text"},{label:"Âge",key:"age",type:"number"},{label:"Poids (kg)",key:"weight",type:"number"},{label:"Taille (cm)",key:"height",type:"number"}].map(({label,key,type})=>(
            <div key={key} style={{marginBottom:10}}>
              <div style={{fontSize:11,color:C.muted,marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
              <input type={type} value={ep[key]} onChange={e=>setEp(x=>({...x,[key]:e.target.value}))} style={inputStyle}/>
            </div>
          ))}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
            <button onClick={()=>setEditing(false)} style={{padding:12,borderRadius:12,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer"}}>Annuler</button>
            <button onClick={saveProfile} style={{padding:12,borderRadius:12,border:"none",background:C.accent,color:"#080B14",fontFamily:F.t,fontWeight:700,fontSize:14,cursor:"pointer"}}>{saved?"✅ Sauvegardé !":"Sauvegarder"}</button>
          </div>
        </div>
      ):(
        <button onClick={()=>setEditing(true)} style={{width:"100%",padding:14,borderRadius:14,border:`1px solid ${C.border}`,background:C.card,color:C.text,fontFamily:F.t,fontWeight:700,fontSize:16,cursor:"pointer",marginBottom:8}}>✏️ Modifier mon profil</button>
      )}
      {/* Objective reminder */}
      <div style={{background:C.card2,border:`1px solid ${C.border}`,borderRadius:14,padding:14,textAlign:"center"}}>
        <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Prochaine mise à jour recommandée</div>
        <div style={{fontFamily:F.t,fontWeight:700,fontSize:16,color:C.blue}}>Dans {Math.max(0,60-Math.round((Date.now()-(profile.lastUpdated||Date.now()))/(1000*60*60*24)))} jours</div>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>Tes données évoluent — mets à jour pour rester précis</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════════ */
function BottomNav({active,set}){
  const tabs=[{id:"home",icon:"🏠",label:"Accueil"},{id:"workout",icon:"🏋️",label:"Séance"},{id:"nutrition",icon:"🥗",label:"Nutrition"},{id:"reminders",icon:"🔔",label:"Rappels"},{id:"profil",icon:"👤",label:"Profil"}];
  return (
    <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom,0)"}}>
      {tabs.map(({id,icon,label})=>{const on=active===id;return(
        <button key={id} onClick={()=>set(id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"10px 0 8px",border:"none",background:"transparent",cursor:"pointer",position:"relative"}}>
          {on&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:28,height:2,borderRadius:"0 0 3px 3px",background:C.accent}}/>}
          <div style={{fontSize:20,lineHeight:1,marginBottom:2,filter:on?"none":"grayscale(1) opacity(0.4)",transition:"filter 0.2s"}}>{icon}</div>
          <div style={{fontSize:9.5,fontWeight:on?700:400,color:on?C.accent:C.muted,transition:"color 0.2s"}}>{label}</div>
        </button>
      );})}
    </div>
  );
}

/* ═══════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════ */
export default function BartFit(){
  const [profile,setProfile]=useState(()=>{try{const s=localStorage.getItem("bartfit_profile");return s?JSON.parse(s):null;}catch{return null;}});
  const [tab,setTab]=useState("home");
  const [pas,setPas]=useState(()=>Math.floor(Math.random()*4000)+2500);
  const [workoutLog,setWorkoutLog]=useState(()=>{try{return JSON.parse(localStorage.getItem("fitapp_wlog")||"{}");}catch{return {};}});
  const [sleepLog,setSleepLog]=useState(()=>{try{return JSON.parse(localStorage.getItem("fitapp_sleep")||"{}");}catch{return {};}});
  const [showUpdateBanner,setShowUpdateBanner]=useState(false);
  const [starterMode,setStarterMode]=useState(()=>localStorage.getItem("bartfit_starter")==="true");

  // Steps simulation
  useEffect(()=>{const iv=setInterval(()=>setPas(p=>p+Math.floor(Math.random()*4)+1),8000);return()=>clearInterval(iv);},[]);

  // Profile update check (60 days)
  useEffect(()=>{
    if(!profile) return;
    const days=(Date.now()-(profile.lastUpdated||Date.now()))/(1000*60*60*24);
    if(days>60){setShowUpdateBanner(true);setTimeout(()=>sendNotif("Mise à jour du profil 📊","Ça fait 2 mois ! Mets à jour tes données pour suivre tes progrès 🎯"),5000);}
  },[profile]);

  if(!profile) return <Onboarding onDone={p=>{setProfile(p);}}/>;

  const render=()=>{
    switch(tab){
      case "home":return <HomeTab profile={profile} pas={pas} setTab={setTab} workoutLog={workoutLog} sleepLog={sleepLog} showUpdateBanner={showUpdateBanner} setShowUpdateBanner={setShowUpdateBanner} starterMode={starterMode}/>;
      case "workout":return <WorkoutTab profile={profile} workoutLog={workoutLog} setWorkoutLog={setWorkoutLog} starterMode={starterMode} setStarterMode={v=>{setStarterMode(v);localStorage.setItem("bartfit_starter",String(v));}}/>;
      case "nutrition":return <NutritionTab profile={profile}/>;
      case "reminders":return <RappelsTab profile={profile} sleepLog={sleepLog} setSleepLog={setSleepLog}/>;
      case "profil":return <ProfilTab profile={profile} setProfile={p=>{setProfile(p);localStorage.setItem("bartfit_profile",JSON.stringify(p));}} workoutLog={workoutLog} sleepLog={sleepLog} pas={pas}/>;
      default:return null;
    }
  };

  return (
    <>
      <FontLoader/>
      <style>{`
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        ::-webkit-scrollbar{display:none;}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0;}
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(1)opacity(0.2);}
        body{margin:0;background:#05090F;}
      `}</style>
      {/* App header */}
      <div style={{background:C.bg,maxWidth:430,margin:"0 auto",position:"sticky",top:0,zIndex:50,borderBottom:`1px solid ${C.border}`,padding:"12px 16px 10px",display:"flex",alignItems:"center",gap:2}}>
        <span style={{fontFamily:F.t,fontWeight:800,fontSize:30,letterSpacing:1.5,background:`linear-gradient(135deg,${C.accent},#8DDB00)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BART</span>
        <span style={{fontFamily:F.t,fontWeight:800,fontSize:30,letterSpacing:1.5,color:C.text}}>FIT</span>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <div style={{background:C.accentDim,border:`1px solid ${C.accent}44`,borderRadius:8,padding:"3px 8px",fontSize:10,color:C.accent,fontWeight:700,fontFamily:F.t}}>v3</div>
          <div style={{width:32,height:32,borderRadius:10,background:`${WORKOUTS.find(w=>w.id===profile.goal)?.color||C.accent}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,border:`1px solid ${WORKOUTS.find(w=>w.id===profile.goal)?.color||C.accent}33`}}>{profile.name?profile.name[0].toUpperCase():"?"}</div>
        </div>
      </div>
      <div style={{background:C.bg,color:C.text,fontFamily:F.b,maxWidth:430,margin:"0 auto",minHeight:"100vh"}}>
        {render()}
        <BottomNav active={tab} set={setTab}/>
      </div>
    </>
  );
}
