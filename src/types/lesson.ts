export type GradeLevel = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'S1' | 'S2' | 'S3';

export interface ReferentielItem {
  id: string;
  annee: GradeLevel;
  cycle: string;
  volet: string;
  champ: string;
  type: 'Savoir' | 'Savoir-faire' | 'Compétence';
  intitule: string;
  attendu: string;
  keywords?: string[];
}

export type BloomLevel = 
  | 'memoriser' 
  | 'comprendre' 
  | 'appliquer' 
  | 'analyser' 
  | 'evaluer' 
  | 'creer';

export interface PedagogicalObjective {
  id: string;
  actionVerb: string;
  bloomLevel: BloomLevel;
  content: string;
  conditions: string;
  criteria: string;
  fullSentence: string;
  isVagueVerb?: boolean;
  vagueVerbSuggestions?: string[];
}

export interface MediaEducationConfig {
  dimensions: ('aux_medias' | 'par_les_medias' | 'avec_les_medias')[];
  competences: string[];
  justification: string;
}

export interface MethodologyConfig {
  selectedMethodologyId: string;
  customMethodologyTitle?: string;
  rationale: string;
  groupingStrategy: 'individuel' | 'binome' | 'petits_groupes' | 'classe_entiere' | 'mixte';
}

export interface ActivityPhase {
  id: string;
  title: string;
  durationMinutes: number;
  studentRole: string;
  teacherRole: string;
  socialModality: string;
  materials: string;
}

export interface DigitalToolUsage {
  id: string;
  name: string;
  category: string;
  samrLevel: 'substitution' | 'augmentation' | 'modification' | 'redefinition';
  pedagogicalRationale: string;
}

export interface EvaluationCriterion {
  id: string;
  criterion: string;
  observableIndicator: string;
  nonAcquis: string;
  enVoie: string;
  acquis: string;
  depasse?: string;
}

export interface EvaluationConfig {
  type: 'diagnostique' | 'formative' | 'sommatrice' | 'combinée';
  taskDescription: string;
  modality: 'auto_evaluation' | 'evaluation_pairs' | 'observation_directe' | 'production_ecrite_numerique' | 'defense_orale';
  criteria: EvaluationCriterion[];
  feedbackStrategy: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: GradeLevel;
  targetAudience: string;
  duration: string;
  prerequisites: string;
  
  // Etape 1 : Référentiel
  selectedItems: ReferentielItem[];
  referentielRationale: string;
  
  // Etape 2 : Apprentissage
  objectives: PedagogicalObjective[];
  
  // Etape 3 : Éducation aux Médias
  mediaEducation: MediaEducationConfig;
  
  // Etape 4 : Méthodologie
  methodology: MethodologyConfig;
  
  // Etape 5 : Activité
  phases: ActivityPhase[];
  digitalTools: DigitalToolUsage[];
  differentiation: {
    remediation: string;
    depassement: string;
    amenagements: string;
  };
  
  // Etape 6 : Évaluation
  evaluation: EvaluationConfig;
  
  createdAt: string;
  updatedAt: string;
}

export interface AlignmentDiagnostic {
  score: number; // 0-100
  tripleConcordanceStatus: 'optimal' | 'acceptable' | 'fragile' | 'desaligne';
  strengths: string[];
  warnings: string[];
  recommendations: string[];
  metrics: {
    bloomConsistency: number; // 0-100
    mediaJustification: number; // 0-100
    digitalRelevance: number; // 0-100
    evaluativePrecision: number; // 0-100
  };
}
