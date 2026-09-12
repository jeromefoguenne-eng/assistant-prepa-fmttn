export interface MethodologyDefinition {
  id: string;
  name: string;
  tagline: string;
  description: string;
  teacherRole: string;
  studentRole: string;
  suitableOutcomes: string[];
  recommendedPhases: string[];
  iconName: string;
}

export const ACTIVE_METHODOLOGIES: MethodologyDefinition[] = [
  {
    id: 'investigation',
    name: "Démarche d'investigation",
    tagline: "Questionnement scientifique & résolution par l'expérimentation",
    description: "Part d'une situation-problème ou d'un phénomène intrigant. Les élèves formulent des hypothèses, conçoivent des protocoles de test (ou de code), expérimentent, recueillent des observations et en tirent des conclusions structurées.",
    teacherRole: "Médiateur, garant du questionnement, apporte l'étayage et conduit la phase d'institutionnalisation.",
    studentRole: "Chercheur actif : émet des hypothèses, manipule, teste, confronte ses résultats avec ses pairs.",
    suitableOutcomes: ["Comprendre le fonctionnement d'un mécanisme", "Déterminer les causes d'un bogue", "Analyser des propriétés de matériaux"],
    recommendedPhases: ["Situation déclenchante", "Émission d'hypothèses", "Investigation/Tests", "Confrontation et Synthèse"],
    iconName: "Search"
  },
  {
    id: 'projet',
    name: "Pédagogie de projet",
    tagline: "Conception collective d'une réalisation concrète et utile",
    description: "Les élèves s'engagent dans une production finale signifiante (ex: fabriquer un prototype avec capteurs, créer un podcast documentaire, concevoir un jeu Scratch interactif) en suivant un cahier des charges.",
    teacherRole: "Chef de projet ressource, facilitateur, régulateur des étapes et des échéances.",
    studentRole: "Concepteur, réalisateur, collaborateur responsable d'un sous-ensemble de la production.",
    suitableOutcomes: ["Créer un objet technique ou un programme", "Planifier et coopérer", "Appliquer des savoir-faire transversaux"],
    recommendedPhases: ["Définition du cahier des charges", "Conception & Répartition", "Réalisation/Prototypage", "Présentation & Bilan"],
    iconName: "FolderKanban"
  },
  {
    id: 'experientiel',
    name: "Apprentissage expérientiel (Kolb)",
    tagline: "Expérience vécue → Réflexion → Généralisation → Transfert",
    description: "S'appuie sur le cycle de Kolb : 1) Expérience concrète (manipuler un outil, vivre une panne), 2) Observation réflexive (qu'est-ce qui s'est passé ?), 3) Conceptualisation abstraite (formalisation de la règle ou du principe), 4) Expérimentation active (réinvestissement dans une nouvelle situation).",
    teacherRole: "Guide réflexif qui transforme une manipulation brute en savoir abstrait transférable.",
    studentRole: "Expérimentateur qui prend du recul sur son action pour en extraire des principes.",
    suitableOutcomes: ["Comprendre les règles de sécurité", "Acquérir des gestes techniques d'atelier", "Appréhender des concepts physiques ou logiques"],
    recommendedPhases: ["Immersion/Manipulation directe", "Débriefing réflexif", "Formalisation du modèle", "Nouveau défi d'application"],
    iconName: "Compass"
  },
  {
    id: 'probleme',
    name: "Pédagogie par problème (PBL)",
    tagline: "Une énigme complexe sans solution immédiate évidente",
    description: "Une situation concrète, authentique et mal définie est posée. Pour la résoudre, les élèves découvrent qu'ils ont besoin d'acquérir de nouvelles connaissances ou compétences qu'ils recherchent de manière autonome ou guidée.",
    teacherRole: "Fournisseur de ressources, coach méthodologique, orienteur sans donner la réponse.",
    studentRole: "Résolveur de problème : identifie ses manques, recherche les données, imagine des solutions.",
    suitableOutcomes: ["Analyser un dysfonctionnement matériel ou réseau", "Optimiser une dépense énergétique", "Concevoir un algorithme de tri"],
    recommendedPhases: ["Lecture de la situation complexe", "Inventaire des besoins d'apprentissage", "Recherche & Synthèse", "Proposition de solution"],
    iconName: "HelpCircle"
  },
  {
    id: 'pairs',
    name: "Apprentissage par les pairs (Peer Learning / Jigsaw)",
    tagline: "Interdépendance positive et enseignement mutuel",
    description: "Chaque élève ou sous-groupe devient 'expert' d'une facette du sujet (ex: un groupe étudie les capteurs, un autre les actionneurs, un troisième le programme) puis se redistribuent dans des équipes mixtes pour enseigner aux autres ce qu'ils ont appris.",
    teacherRole: "Architecte du dispositif, veille à la qualité des contenus 'experts' et régulateur de la dynamique de groupe.",
    studentRole: "Apprenant puis formateur bienveillant pour ses camarades.",
    suitableOutcomes: ["Explorer un sujet vaste en temps limité", "Développer l'expression orale et l'écoute active", "Valider la compréhension en expliquant aux autres"],
    recommendedPhases: ["Groupes d'experts", "Groupes de partage mixte", "Mise en commun globale", "Évaluation croisée"],
    iconName: "Users"
  },
  {
    id: 'classe_inversee',
    name: "Classe inversée (Flipped Classroom)",
    tagline: "Découverte autonome amont, réinvestissement actif en classe",
    description: "L'accès à l'information (capsule vidéo courte, lecture, découverte d'un vocabulaire) se fait avant la séance. Le temps précieux de classe est dédié aux manipulations, au codage, à la fabrication et aux questions complexes.",
    teacherRole: "Concepteur de ressources préalables claires et tuteur individualisé durant les ateliers pratiques.",
    studentRole: "Autonome en amont, engagé et productif en présentiel.",
    suitableOutcomes: ["Gagner du temps sur les explications théoriques pour maximiser la manipulation", "Différencier selon le rythme d'assimilation"],
    recommendedPhases: ["Vérification des prérequis", "Atelier pratique guidé", "Défis de perfectionnement", "Clôture collective"],
    iconName: "Repeat"
  },
  {
    id: 'defi',
    name: "Pédagogie du défi (Challenge-Based Learning)",
    tagline: "Un défi stimulant avec des contraintes précises",
    description: "Les élèves reçoivent une mission avec contraintes fortes (temps, matériel, budget, règles de sécurité) : ex. 'Faire traverser un labyrinthe à un robot avec 3 instructions seulement' ou 'Créer la structure en carton la plus résistante possible'.",
    teacherRole: "Arbitre bienveillant, garant des contraintes et de la sécurité, valorise toutes les démarches innovantes.",
    studentRole: "Compétiteur créatif en équipe : teste rapidement (fail fast), itère et persévère.",
    suitableOutcomes: ["Stimuler l'engagement et la créativité", "Accepter l'erreur comme étape d'apprentissage", "Itérer rapidement"],
    recommendedPhases: ["Énoncé du défi et contraintes", "Brainstorming d'équipe", "Phase de sprint/test", "Démonstration publique"],
    iconName: "Trophy"
  },
  {
    id: 'ludopedagogie',
    name: "Ludopédagogie / Escape Game pédagogique",
    tagline: "Mécaniques de jeu au service des apprentissages rigoureux",
    description: "Mobilise les ressorts du jeu (scénarisation narrative, quêtes, indices cachés, énigmes logiques ou techniques) pour résoudre une série d'épreuves didactiques. Les énigmes nécessitent impérativement de mobiliser les savoirs et savoir-faire FMTTN.",
    teacherRole: "Maître du jeu (Game Master), superviseur des indices, animateur du débriefing didactique indispensable.",
    studentRole: "Joueur coopératif immergé dans une quête qui requiert des compétences réelles.",
    suitableOutcomes: ["Réviser ou consolider des savoirs", "Apprendre à coopérer sous pression temporelle ludique", "Désamorcer l'appréhension de l'abstraction"],
    recommendedPhases: ["Briefing immersif", "Résolution d'énigmes/Quête", "Débriefing didactique d'institutionnalisation"],
    iconName: "Gamepad2"
  }
];
