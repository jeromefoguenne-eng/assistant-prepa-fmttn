import { LessonPlan } from '../types/lesson';

export const SAMPLE_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'sample_s1_scratch',
    title: 'Programmer un simulateur de tri et recyclage des déchets électroniques',
    grade: 'S1',
    targetAudience: 'Classe de 1re secondaire (22 élèves, îlots de 2)',
    duration: '2 x 50 minutes',
    prerequisites: 'Usage basique de la souris, notions élémentaires de boucle sous Scratch.',
    selectedItems: [
      {
        id: 'S1_SAV_1',
        annee: 'S1',
        cycle: 'Cycle 4 Secondaire (S1-S3)',
        volet: 'Volet 2 : Numérique',
        champ: 'Création de contenus',
        type: 'Savoir',
        intitule: 'Programmation et logigrammes*',
        attendu: 'Expliquer le concept de variable, de condition (si... alors) et de boucle dans un algorithme.'
      },
      {
        id: 'S1_COM_2',
        annee: 'S1',
        cycle: 'Cycle 4 Secondaire (S1-S3)',
        volet: 'Volet 2 : Numérique',
        champ: 'Création de contenus',
        type: 'Compétence',
        intitule: 'Créer un programme informatique simple',
        attendu: 'Concevoir et programmer un script visuel qui répond à des interactions utilisateur et traite des données simples.'
      }
    ],
    referentielRationale: "Cette séquence s'inscrit au cœur du volet Numérique (création de contenus et algorithmique) en reliant la logique de programmation aux enjeux de développement durable et de recyclage des composants électroniques.",
    objectives: [
      {
        id: 'obj_1',
        actionVerb: 'programmer',
        bloomLevel: 'creer',
        content: "un script interactif sous Scratch contenant au moins une condition 'si... alors... sinon' et une variable 'Score'",
        conditions: "en binôme, à partir d'un cahier des charges fourni",
        criteria: "le lutin dirige correctement le déchet vers le bon conteneur et incrémente le score sans bogue.",
        fullSentence: "À la fin de la leçon, l'élève sera capable de programmer un script interactif sous Scratch contenant au moins une condition 'si... alors... sinon' et une variable 'Score', en binôme à partir d'un cahier des charges, de manière à ce que le déchet soit correctement orienté vers le bon conteneur et incrémente le score sans bogue."
      }
    ],
    mediaEducation: {
      dimensions: ['aux_medias', 'avec_les_medias'],
      competences: [
        "Comprendre le rôle des algorithmes et du filtrage automatisé",
        "Produire un message médiatique adapté à son public cible"
      ],
      justification: "Éducation AVEC les médias par la programmation directe d'un média interactif (jeu sérieux). Éducation AUX médias par la compréhension de la logique algorithmique binaire (vrai/faux) qui régit les systèmes informatiques."
    },
    methodology: {
      selectedMethodologyId: 'defi',
      customMethodologyTitle: 'Pédagogie du défi par équipes',
      rationale: "Le défi par étapes successives (niveau 1 : déplacement, niveau 2 : test de collision, niveau 3 : score) stimule l'engagement et favorise l'émulation constructive entre binômes tout en autorisant l'expérimentation par essai-erreur.",
      groupingStrategy: 'binome'
    },
    phases: [
      {
        id: 'phase_1',
        title: 'Phase 1 : Amorce & Problématisation (Défi lancé)',
        durationMinutes: 15,
        studentRole: 'Observe un jeu Scratch incomplet projeté au tableau, identifie le dysfonctionnement (le déchet traverse la poubelle sans être trié) et formule le besoin algorithmique.',
        teacherRole: 'Anime le questionnement collectif : « Quelle instruction manque-t-il pour que l\'ordinateur prenne une décision ? » Introduit le concept de condition.',
        socialModality: 'Collectif / Grand groupe',
        materials: 'Vidéoprojecteur, PC enseignant, fiche défi imprimée.'
      },
      {
        id: 'phase_2',
        title: 'Phase 2 : Recherche & Programmation active',
        durationMinutes: 60,
        studentRole: 'En binôme sur poste informatique : découpe le problème, assemble les blocs Scratch (capteurs de couleur, blocs logiques, variable score), teste et débogue son programme.',
        teacherRole: 'Circule entre les îlots, apporte un étayage ciblé sans donner la solution, guide les élèves en difficulté avec des cartes-indices.',
        socialModality: 'Binômes sur poste',
        materials: 'Postes élèves avec Scratch 3 hors-ligne ou en ligne, cartes-indices d\'aide.'
      },
      {
        id: 'phase_3',
        title: 'Phase 3 : Institutionnalisation & Synthèse réflexive',
        durationMinutes: 25,
        studentRole: 'Un binôme démontre son code fonctionnel. Chaque élève complète la trace écrite de synthèse (structure d\'une condition et d\'une variable).',
        teacherRole: 'Formalise au tableau l\'organigramme logique (logigramme) de la conditionnelle et fait le lien avec les algorithmes du quotidien.',
        socialModality: 'Collectif puis individuel',
        materials: 'Tableau, cahier/fiche de synthèse de l\'élève.'
      }
    ],
    digitalTools: [
      {
        id: 'tool_1',
        name: 'Scratch 3.0',
        category: 'Programmation & Robotique',
        samrLevel: 'redefinition',
        pedagogicalRationale: "Scratch permet une rétroaction visuelle immédiate sur l'algorithme conçu, rendant le raisonnement abstrait directement tangible et manipulable sans barrière syntaxique."
      }
    ],
    differentiation: {
      remediation: "Cartes-indices pré-remplies fournissant les 3 blocs indispensables à assembler pour les élèves en difficulté.",
      consolidation: "Exercice d'application guidée : reproduire l'algorithme conditionnel sur un deuxième sprite (bac à compost) pour automatiser la structure logique.",
      depassement: "Ajouter un compte à rebours (chronomètre de 30 secondes) et un obstacle mobile (vent qui dévie la trajectoire du déchet).",
      amenagements: "Police de caractères adaptée pour élèves dyslexiques sur la fiche défi, binômes hétérogènes solidaires."
    },
    evaluation: {
      type: 'formative',
      taskDescription: "Test croisé : chaque binôme teste le programme d'un binôme voisin à l'aide d'une grille d'auto-évaluation critériée.",
      modality: 'evaluation_pairs',
      criteria: [
        {
          id: 'crit_1',
          attenduId: 'S1_SAV_1',
          attenduText: 'Expliquer le concept de variable, de condition (si... alors) et de boucle dans un algorithme.',
          criterion: 'Exactitude de la condition logique et de la variable score',
          observableIndicator: "Le déchet disparaît et le score augmente de 1 uniquement lorsqu'il touche le bon bac de tri.",
          nonAcquis: 'Le déchet traverse sans réaction ou le score s\'incrémente à l\'infini.',
          enVoie: 'La condition fonctionne mais avec un bogue de détection intermittent.',
          acquis: 'La conditionnelle et la variable fonctionnent parfaitement à chaque essai.',
          depasse: 'La condition gère à la fois le bon bac (+1) et une erreur de tri (-1) avec commentaire du code.'
        },
        {
          id: 'crit_2',
          attenduId: 'S1_COM_2',
          attenduText: 'Concevoir et programmer un script visuel qui répond à des interactions utilisateur et traite des données simples.',
          criterion: 'Fonctionnalité globale et autonomie du programme',
          observableIndicator: 'Le script est ordonné, répond aux entrées de l\'utilisateur et est nettoyé.',
          nonAcquis: 'Blocs en désordre, scripts orphelins non nettoyés, programme inactif.',
          enVoie: 'Script fonctionnel mais encombré de blocs inutilisés nécessitant un étayage.',
          acquis: 'Code clair, structuré et fonctionnel en autonomie.',
          depasse: 'Code modulaire enrichi utilisant des fonctions ou blocs personnalisés.'
        }
      ],
      feedbackStrategy: 'Débriefing oral immédiat entre pairs suivi d\'un visa de validation par l\'enseignant.'
    },
    createdAt: '2026-09-12T08:00:00.000Z',
    updatedAt: '2026-09-12T08:00:00.000Z'
  },
  {
    id: 'sample_p6_ia_fake_images',
    title: 'Débusquer les fausses images et comprendre les générateurs d’IA',
    grade: 'P6',
    targetAudience: 'Classe de 6e primaire (20 élèves, 5 îlots de 4)',
    duration: '1 x 50 minutes',
    prerequisites: 'Navigation web élémentaire, vocabulaire image / photo / dessin.',
    selectedItems: [
      {
        id: 'P6_SAV_1',
        annee: 'P6',
        cycle: 'Cycle 4 Fondamental (P5-P6)',
        volet: 'Volet 2 : Numérique',
        champ: 'Informations et données',
        type: 'Savoir',
        intitule: 'Fiabilité des sources et esprit critique',
        attendu: 'Identifier qu\'une image numérique peut être retouchée, falsifiée ou synthétisée de manière automatisée.'
      },
      {
        id: 'P6_COM_1',
        annee: 'P6',
        cycle: 'Cycle 4 Fondamental (P5-P6)',
        volet: 'Volet 2 : Numérique',
        champ: 'Sécurité',
        type: 'Compétence',
        intitule: 'Porter un regard critique sur les médias',
        attendu: 'Repérer des indices de manipulation dans un document multimédia et justifier ses doutes à l\'aide de critères observables.'
      }
    ],
    referentielRationale: "Cette leçon vise explicitement l'éducation aux médias et au numérique dans son volet Sécurité et Esprit critique, en confrontant les élèves aux réalités contemporaines des images générées par intelligence artificielle.",
    objectives: [
      {
        id: 'obj_p6_1',
        actionVerb: 'identifier',
        bloomLevel: 'analyser',
        content: "au moins trois indices visuels d'incohérence (mains, reflets, arrière-plan, textures impossibles) sur une série de 6 images dont 3 sont générées par IA",
        conditions: "en équipe de 4, à l'aide d'une loupe numérique et d'une grille de vérification",
        criteria: "les 3 images IA sont correctement démasquées avec une justification factuelle pour chacune.",
        fullSentence: "À la fin de la leçon, l'élève sera capable d'identifier au moins trois indices visuels d'incohérence sur une série de 6 images dont 3 sont générées par IA, en équipe de 4 à l'aide d'une grille de vérification, de manière à démasquer correctement les 3 images IA avec une justification factuelle pour chacune."
      }
    ],
    mediaEducation: {
      dimensions: ['aux_medias'],
      competences: [
        "Distinguer faits, opinions, publicités et contenus trompeurs / générés par IA",
        "Vérifier la fiabilité d'une source et croiser les informations"
      ],
      justification: "Éducation AUX médias par excellence : l'objet d'étude est la nature même de l'image numérique générée par algorithme et la construction d'un esprit critique citoyen face au doute visuel."
    },
    methodology: {
      selectedMethodologyId: 'investigation',
      customMethodologyTitle: 'Démarche d’investigation policière (Chasseurs d’infox)',
      rationale: "La posture de 'détective' plonge les élèves dans l'analyse minutieuse de détails, les obligeant à argumenter plutôt qu'à deviner au hasard.",
      groupingStrategy: 'petits_groupes'
    },
    phases: [
      {
        id: 'p6_phase_1',
        title: 'Phase 1 : Énigme déclenchante (Vrai ou Faux ?)',
        durationMinutes: 10,
        studentRole: 'Vote à main levée sur une photo spectaculaire (un astronaute qui mange une pizza sur Mars), confronte son intuition avec ses camarades.',
        teacherRole: 'Révèle que l\'image est 100% artificielle générée en 5 secondes par IA. Pose la question didactique : « Comment ne plus se faire piéger ? »',
        socialModality: 'Collectif',
        materials: 'Grand écran interactif / TBI.'
      },
      {
        id: 'p6_phase_2',
        title: 'Phase 2 : Investigation par îlots (La loupe aux indices)',
        durationMinutes: 25,
        studentRole: 'Chaque équipe examine 6 images sur tablette ou papier glacé. Remplit la fiche de police scientifique : zone suspecte entourée, incohérence décrite (6 doigts, texte illisible, ombres contradictoires).',
        teacherRole: 'Guide l\'observation : invite à zoomer sur les zones complexes (cheveux, arrière-plans, symétries).',
        socialModality: 'Îlots de 4 élèves',
        materials: 'Tablettes ou dossiers d\'images haute définition plastifiées, grilles d\'enquête.'
      },
      {
        id: 'p6_phase_3',
        title: 'Phase 3 : Clôture & Charte du cyber-citoyen',
        durationMinutes: 15,
        studentRole: 'Mise en commun des indices infaillibles. Co-rédaction des « 4 réflexes avant de partager une image ». Trace écrite individuelle collée au cahier.',
        teacherRole: 'Structure les 4 réflexes : 1) Observer les détails physiques, 2) Vérifier la source, 3) Pratiquer la recherche inversée d\'image, 4) Ne pas relayer sans certitude.',
        socialModality: 'Collectif',
        materials: 'Affiche-charte pour la classe, mémo élève.'
      }
    ],
    digitalTools: [
      {
        id: 'tool_p6_1',
        name: 'Visualiseur d\'image haute définition (ou Google Lens)',
        category: 'Multimédia & Création',
        samrLevel: 'augmentation',
        pedagogicalRationale: "Permet de grossir les pixels et de confronter l'image aux bases de données web pour retracer son origine réelle."
      }
    ],
    differentiation: {
      remediation: "Indiquer sur 2 images les zones précises à observer avec une pastille de couleur.",
      consolidation: "Fiche d'application méthodique : analyser 2 nouvelles photos en binôme en cochant les critères objectifs de la grille pour stabiliser le réflexe critique.",
      depassement: "Découvrir la recherche inversée d'images via Google Images ou TinEye pour retrouver la première apparition sur le web.",
      amenagements: "Distribution de loupes optiques pour les supports imprimés pour soutenir la concentration visuelle."
    },
    evaluation: {
      type: 'formative',
      taskDescription: "Épreuve finale 'Le pass d'expert' : une 7e image inconnue projetée, chaque élève écrit sur son ardoise son diagnostic argumenté en 2 phrases.",
      modality: 'observation_directe',
      criteria: [
        {
          id: 'crit_p6_1',
          attenduId: 'P6_SAV_1',
          attenduText: 'Identifier qu\'une image numérique peut être retouchée, falsifiée ou synthétisée de manière automatisée.',
          criterion: 'Identification de la falsification par IA',
          observableIndicator: "L'élève cite un élément anatomique ou optique incohérent précis.",
          nonAcquis: 'Jugement au hasard sans argument observable.',
          enVoie: 'L\'élève sent que l\'image est fausse mais l\'argument reste flou (« ça a l\'air bizarre »).',
          acquis: 'L\'élève identifie un indice tangible (ex: « Le reflet dans ses lunettes ne correspond pas au paysage »).',
          depasse: 'L\'élève repère plusieurs anomalies subtiles et propose une hypothèse sur le prompt utilisé.'
        },
        {
          id: 'crit_p6_2',
          attenduId: 'P6_COM_1',
          attenduText: 'Repérer des indices de manipulation dans un document multimédia et justifier ses doutes à l\'aide de critères observables.',
          criterion: 'Justification critique et argumentation',
          observableIndicator: 'L\'élève complète sa grille d\'enquête en formulant une explication factuelle et vérifiable.',
          nonAcquis: 'Incapacité à justifier son choix autrement que par « j\'ai deviné ».',
          enVoie: 'Explication partielle ou circulaire (« c\'est faux parce que c\'est moche »).',
          acquis: 'Explication factuelle basée sur au moins deux critères de la grille.',
          depasse: 'Explication rigoureuse et proposition d\'une méthode de contre-vérification (ex: recherche d\'image inversée).'
        }
      ],
      feedbackStrategy: 'Validation immédiate sur ardoise par pouce levé/baissé.'
    },
    createdAt: '2026-09-12T08:00:00.000Z',
    updatedAt: '2026-09-12T08:00:00.000Z'
  }
];

export const EMPTY_LESSON_PLAN: LessonPlan = {
  id: '',
  title: '',
  grade: 'S1',
  targetAudience: '',
  duration: '50 minutes',
  prerequisites: '',
  selectedItems: [],
  referentielRationale: '',
  objectives: [],
  mediaEducation: {
    dimensions: [],
    competences: [],
    justification: ''
  },
  methodology: {
    selectedMethodologyId: 'investigation',
    customMethodologyTitle: '',
    rationale: '',
    groupingStrategy: 'binome'
  },
  phases: [
    {
      id: 'phase_1',
      title: 'Phase 1 : Amorce / Situation déclenchante',
      durationMinutes: 10,
      studentRole: '',
      teacherRole: '',
      socialModality: '',
      materials: ''
    },
    {
      id: 'phase_2',
      title: 'Phase 2 : Recherche / Expérimentation active',
      durationMinutes: 30,
      studentRole: '',
      teacherRole: '',
      socialModality: '',
      materials: ''
    },
    {
      id: 'phase_3',
      title: 'Phase 3 : Synthèse / Structuration',
      durationMinutes: 10,
      studentRole: '',
      teacherRole: '',
      socialModality: '',
      materials: ''
    }
  ],
  digitalTools: [],
  differentiation: {
    remediation: '',
    consolidation: '',
    depassement: '',
    amenagements: ''
  },
  evaluation: {
    type: 'formative',
    taskDescription: '',
    modality: 'observation_directe',
    criteria: [
      {
        id: 'crit_1',
        criterion: '',
        observableIndicator: '',
        nonAcquis: '',
        enVoie: '',
        acquis: '',
        depasse: ''
      }
    ],
    feedbackStrategy: ''
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
