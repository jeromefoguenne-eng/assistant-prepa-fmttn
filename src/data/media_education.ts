export interface MediaDimension {
  id: 'aux_medias' | 'par_les_medias' | 'avec_les_medias';
  title: string;
  subtitle: string;
  description: string;
  examples: string[];
  bannerColor: string;
}

export const MEDIA_DIMENSIONS: MediaDimension[] = [
  {
    id: 'aux_medias',
    title: 'Éducation AUX médias et au numérique',
    subtitle: "L'élève apprend À PROPOS des médias et du numérique comme objets d'étude",
    description: "Le numérique et les médias sont l'objet même de l'apprentissage. On en étudie le fonctionnement, les enjeux sociétaux, économiques, démocratiques et éthiques.",
    bannerColor: 'border-blue-500 bg-blue-50',
    examples: [
      "Comprendre le fonctionnement d'un algorithme de recommandation (bulles de filtre)",
      "Identifier et déconstruire une infox (fake news) ou une image manipulée par IA",
      "Analyser l'économie de l'attention et le modèle économique des plateformes",
      "Comprendre les traces numériques, la protection de la vie privée et les données personnelles (RGPD)",
      "Évaluer l'empreinte écologique du matériel et du cloud"
    ]
  },
  {
    id: 'par_les_medias',
    title: 'Éducation PAR les médias et le numérique',
    subtitle: "Les médias et le numérique sont utilisés comme MOYENS d'apprentissage",
    description: "Les technologies numériques sont des vecteurs ou des instruments au service de l'apprentissage d'une notion ou d'une discipline.",
    bannerColor: 'border-emerald-500 bg-emerald-50',
    examples: [
      "Visionner une vidéo pédagogique pour comprendre un cycle de vie de matériau",
      "Utiliser un simulateur interactif (ex: circuit électrique en ligne) pour tester sans danger",
      "Rechercher des informations fiables sur le web pour documenter un exposé technique",
      "Utiliser une application d'entraînement ou de flashcards pour réviser du vocabulaire technique"
    ]
  },
  {
    id: 'avec_les_medias',
    title: 'Éducation AVEC les médias et le numérique',
    subtitle: "L'élève MANIPULE ou PRODUIT lui-même des médias et objets numériques",
    description: "L'élève est créateur et acteur. Il programme, enregistre, modifie, fabrique ou publie du contenu numérique ou technique.",
    bannerColor: 'border-purple-500 bg-purple-50',
    examples: [
      "Programmer un robot (Thymio, mBot) ou un automate avec Scratch / Micro:bit",
      "Enregistrer et monter un podcast ou une capsule vidéo explicative",
      "Concevoir une modélisation 3D (Tinkercad) destinée à une impression 3D",
      "Rédiger un tutoriel illustré ou concevoir une infographie de synthèse avec Canva ou traitement de texte"
    ]
  }
];

export interface MediaCompetenceCSEM {
  id: string;
  category: string;
  label: string;
}

export const CSEM_COMPETENCES: MediaCompetenceCSEM[] = [
  { id: 'csem_1', category: 'Information & Critique', label: "Vérifier la fiabilité d'une source et croiser les informations" },
  { id: 'csem_2', category: 'Information & Critique', label: "Distinguer faits, opinions, publicités et contenus trompeurs / générés par IA" },
  { id: 'csem_3', category: 'Technique & Algorithmes', label: "Comprendre le rôle des algorithmes et du filtrage automatisé" },
  { id: 'csem_4', category: 'Technique & Algorithmes', label: "Décoder la structure d'une page web ou d'un flux d'information" },
  { id: 'csem_5', category: 'Social & Éthique', label: "Protéger son identité numérique et ses données personnelles" },
  { id: 'csem_6', category: 'Social & Éthique', label: "Adopter une posture citoyenne, respectueuse et bienveillante en ligne (nétiquette)" },
  { id: 'csem_7', category: 'Production Multimédia', label: "Produire un message médiatique adapté à son public cible" },
  { id: 'csem_8', category: 'Production Multimédia', label: "Respecter le droit d'auteur, les licences Creative Commons et le droit à l'image" }
];
