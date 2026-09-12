import { BloomLevel } from '../types/lesson';

export interface BloomCategory {
  id: BloomLevel;
  name: string;
  order: number;
  color: string;
  badgeClass: string;
  description: string;
  verbs: string[];
  questionPrompts: string;
}

export const BLOOM_TAXONOMY: Record<BloomLevel, BloomCategory> = {
  memoriser: {
    id: 'memoriser',
    name: '1. Mémoriser',
    order: 1,
    color: '#3b82f6',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Restituer des faits, des termes, des concepts de base ou des consignes de sécurité sans nécessairement les comprendre en profondeur.',
    verbs: [
      'identifier', 'définir', 'reconnaître', 'citer', 'nommer', 
      'énumérer', 'restituer', 'rappeler', 'localiser', 'désigner'
    ],
    questionPrompts: 'Quels faits, vocabulaire technique ou composants l\'élève doit-il retenir par cœur ?'
  },
  comprendre: {
    id: 'comprendre',
    name: '2. Comprendre',
    order: 2,
    color: '#06b6d4',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    description: 'Démontrer une compréhension des faits et des idées en organisant, comparant, traduisant ou interprétant.',
    verbs: [
      'expliquer', 'reformuler', 'illustrer', 'classer', 'distinguer', 
      'résumer', 'interpréter', 'traduire', 'ordonner', 'décrire avec ses mots'
    ],
    questionPrompts: 'Comment l\'élève prouve-t-il qu\'il a saisi le sens du concept ou de l\'algorithme ?'
  },
  appliquer: {
    id: 'appliquer',
    name: '3. Appliquer',
    order: 3,
    color: '#10b981',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Mobiliser une règle, une formule, un algorithme ou un geste technique dans une situation concrète ou nouvelle.',
    verbs: [
      'utiliser', 'réaliser', 'exécuter', 'mettre en œuvre', 'manipuler', 
      'calculer', 'tracer', 'assembler', 'programmer un bloc', 'résoudre'
    ],
    questionPrompts: 'Quelle tâche technique, manuelle ou numérique l\'élève accomplit-il concrètement ?'
  },
  analyser: {
    id: 'analyser',
    name: '4. Analyser',
    order: 4,
    color: '#f59e0b',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Décomposer une information ou un système en sous-parties pour en examiner les relations et la structure logique.',
    verbs: [
      'comparer', 'distinguer', 'analyser', 'catégoriser', 'décomposer', 
      'détecter une anomalie', 'déboguer', 'schématiser', 'différencier', 'questionner'
    ],
    questionPrompts: 'Comment l\'élève décortique-t-il le code, l\'objet technique ou la source d\'information ?'
  },
  evaluer: {
    id: 'evaluer',
    name: '5. Évaluer',
    order: 5,
    color: '#8b5cf6',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Porter un jugement critique fondé sur des critères explicites, des normes de qualité, de sécurité ou d\'éthique.',
    verbs: [
      'critiquer', 'vérifier', 'argumenter', 'justifier', 'valider', 
      'estimer', 'évaluer la fiabilité', 'déterminer la pertinence', 'défendre', 'juger'
    ],
    questionPrompts: 'Quels critères de qualité, de véracité ou d\'impact environnemental l\'élève mobilise-t-il ?'
  },
  creer: {
    id: 'creer',
    name: '6. Créer',
    order: 6,
    color: '#ec4899',
    badgeClass: 'bg-pink-100 text-pink-800 border-pink-200',
    description: 'Rassembler des éléments pour former un tout cohérent, innovant ou fonctionnel ; concevoir une solution originale.',
    verbs: [
      'concevoir', 'produire', 'élaborer', 'programmer', 'créer', 
      'fabriquer', 'modéliser', 'prototyper', 'scénariser', 'composer'
    ],
    questionPrompts: 'Quel projet, objet technique, code ou document multimédia original l\'élève produit-il ?'
  }
};

export interface VagueVerbInfo {
  verb: string;
  reason: string;
  alternatives: {
    level: BloomLevel;
    verbs: string[];
  }[];
}

export const VAGUE_VERBS_DICTIONARY: Record<string, VagueVerbInfo> = {
  'connaitre': {
    verb: 'connaître',
    reason: "Le verbe 'connaître' est un état mental interne non observable. L'enseignant ne peut évaluer ce qui se passe dans la tête de l'élève sans une production observable.",
    alternatives: [
      { level: 'memoriser', verbs: ['citer', 'identifier', 'nommer', 'énumérer'] },
      { level: 'comprendre', verbs: ['expliquer', 'décrire', 'illustrer par un exemple'] }
    ]
  },
  'comprendre': {
    verb: 'comprendre',
    reason: "Le verbe 'comprendre' est un processus interne invisible. Précisez par quelle action l'élève prouve sa compréhension.",
    alternatives: [
      { level: 'comprendre', verbs: ['expliquer', 'reformuler avec ses propres mots', 'classer', 'schématiser'] },
      { level: 'analyser', verbs: ['comparer', 'distinguer', 'déduire'] }
    ]
  },
  'apprendre': {
    verb: 'apprendre',
    reason: "'Apprendre' désigne le processus d'acquisition, pas le résultat final observable et mesurable attendu en fin de leçon.",
    alternatives: [
      { level: 'memoriser', verbs: ['restituer', 'reconnaître'] },
      { level: 'appliquer', verbs: ['exécuter', 'utiliser', 'mettre en pratique'] }
    ]
  },
  'savoir': {
    verb: 'savoir',
    reason: "'Savoir' est trop générique et abstrait. Que doit concrètement faire ou dire l'élève pour démontrer ce savoir ?",
    alternatives: [
      { level: 'memoriser', verbs: ['énoncer', 'désigner'] },
      { level: 'appliquer', verbs: ['manipuler', 'utiliser', 'réaliser'] }
    ]
  },
  'decouvrir': {
    verb: 'découvrir',
    reason: "'Découvrir' est une activité de découverte ou d'amorce, mais ce n'est pas un objectif d'apprentissage évaluable en fin de séquence.",
    alternatives: [
      { level: 'memoriser', verbs: ['identifier', 'repérer'] },
      { level: 'comprendre', verbs: ['distinguer', 'caractériser'] }
    ]
  },
  'voir': {
    verb: 'voir',
    reason: "'Voir' est passif et sensoriel. L'apprentissage actif exige une action observable de l'apprenant.",
    alternatives: [
      { level: 'memoriser', verbs: ['repérer', 'localiser'] },
      { level: 'analyser', verbs: ['observer et noter', 'comparer'] }
    ]
  },
  'sensibiliser': {
    verb: 'sensibiliser',
    reason: "'Sensibiliser' décrit l'action de l'enseignant, pas la compétence ou la performance développée par l'élève.",
    alternatives: [
      { level: 'analyser', verbs: ['identifier les impacts', 'décoder'] },
      { level: 'evaluer', verbs: ['justifier l\'importance de', 'argumenter en faveur de'] }
    ]
  },
  'assimiler': {
    verb: 'assimiler',
    reason: "'Assimiler' est une métaphore biologique de la digestion cognitive. Précisez le comportement observable attendu.",
    alternatives: [
      { level: 'appliquer', verbs: ['mettre en œuvre', 'appliquer'] },
      { level: 'comprendre', verbs: ['synthétiser', 'reformuler'] }
    ]
  }
};

export function checkVagueVerb(sentence: string): VagueVerbInfo | null {
  if (!sentence) return null;
  const lower = sentence.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  for (const [key, info] of Object.entries(VAGUE_VERBS_DICTIONARY)) {
    const keyClean = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const regex = new RegExp(`\\b${keyClean}(?:r|s|z|ont|e|es|ent|ait|ions)?\\b`, 'i');
    if (regex.test(lower)) {
      return info;
    }
  }
  return null;
}
