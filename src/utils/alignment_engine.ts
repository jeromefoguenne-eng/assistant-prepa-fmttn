import { LessonPlan, AlignmentDiagnostic } from '../types/lesson';
import { checkVagueVerb } from '../data/bloom_taxonomy';

export function analyzeAlignment(lesson: LessonPlan): AlignmentDiagnostic {
  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  let bloomConsistencyScore = 80;
  let mediaScore = 70;
  let digitalScore = 75;
  let evalScore = 70;

  // 1. Référentiel check
  if (!lesson.selectedItems || lesson.selectedItems.length === 0) {
    warnings.push("Aucun attendu ou compétence du référentiel officiel n'est sélectionné.");
    recommendations.push("Sélectionnez au moins un attendu officiel du référentiel FMTTN dans l'étape 1.");
  } else {
    strengths.push(`${lesson.selectedItems.length} élément(s) du référentiel officiel FMTTN lié(s) à la leçon.`);
  }

  if (!lesson.referentielRationale || lesson.referentielRationale.trim().length < 15) {
    warnings.push("L'explicitation de l'ancrage dans le référentiel est incomplète ou absente.");
    recommendations.push("Justifiez en 2 ou 3 phrases pourquoi cette séquence sert précisément l'élément du référentiel sélectionné.");
  } else {
    strengths.push("Explicitation claire du lien avec le référentiel FMTTN.");
  }

  // 2. Objectifs Bloom check
  if (!lesson.objectives || lesson.objectives.length === 0) {
    warnings.push("Aucun objectif d'apprentissage opérationnel n'a été formulé.");
    recommendations.push("Formulez un objectif opérationnel selon le modèle : 'À la fin de la leçon, l'élève sera capable de...'.");
    bloomConsistencyScore = 20;
  } else {
    let hasVagueVerb = false;
    lesson.objectives.forEach(obj => {
      const vague = checkVagueVerb(obj.actionVerb) || checkVagueVerb(obj.fullSentence);
      if (vague) {
        hasVagueVerb = true;
        warnings.push(`Verbe non opérationnel détecté : '${vague.verb}'. ${vague.reason}`);
        recommendations.push(`Remplacez '${vague.verb}' par un verbe d'action mesurable (ex: ${vague.alternatives.flatMap(a => a.verbs).slice(0, 3).join(', ')}).`);
        bloomConsistencyScore -= 25;
      }
    });

    if (!hasVagueVerb) {
      strengths.push("Tous les verbes d'apprentissage sont opérationnels et observables (Taxonomie de Bloom).");
      bloomConsistencyScore = Math.min(100, bloomConsistencyScore + 20);
    }
  }

  // 3. Éducation aux Médias check
  if (!lesson.mediaEducation.dimensions || lesson.mediaEducation.dimensions.length === 0) {
    warnings.push("Aucune dimension d'éducation aux médias n'est cochée (Éducation AUX, PAR ou AVEC les médias).");
    recommendations.push("Identifiez si l'élève apprend à propos des médias (AUX), par un média (PAR) ou en créant (AVEC).");
    mediaScore = 30;
  } else {
    strengths.push(`Dimension(s) médiatique(s) activée(s) : ${lesson.mediaEducation.dimensions.length} sélectionnée(s).`);
    if (!lesson.mediaEducation.justification || lesson.mediaEducation.justification.trim().length < 15) {
      warnings.push("La compétence médiatique n'est pas suffisamment justifiée.");
      recommendations.push("Explicitez en quoi la dimension médiatique choisie apporte une vraie plus-value critique ou créative à l'élève.");
      mediaScore -= 20;
    } else {
      strengths.push("Justification rigoureuse de la dimension médiatique.");
      mediaScore = 95;
    }
  }

  // 4. Outils numériques & anti-technocentrisme
  if (lesson.digitalTools && lesson.digitalTools.length > 0) {
    let missingRationale = false;
    lesson.digitalTools.forEach(tool => {
      if (!tool.pedagogicalRationale || tool.pedagogicalRationale.trim().length < 15) {
        missingRationale = true;
        warnings.push(`L'outil numérique '${tool.name}' manque de justification pédagogique (risque d'outil-gadget).`);
      }
    });

    if (missingRationale) {
      recommendations.push("Pour chaque technologie, répondez à la question : 'Pourquoi cet outil sert-il l'apprentissage mieux qu'un support traditionnel ?'");
      digitalScore -= 30;
    } else {
      strengths.push("Tous les outils numériques mobilisés disposent d'une justification pédagogique explicite (anti-technocentrisme respecté).");
      digitalScore = 95;
    }
  }

  // 5. Triple concordance (Objectif Bloom vs Évaluation)
  if (lesson.objectives && lesson.objectives.length > 0 && lesson.evaluation) {
    const highestBloom = lesson.objectives[0]?.bloomLevel;
    const evalType = lesson.evaluation.type;
    const task = lesson.evaluation.taskDescription?.toLowerCase() || '';

    if (highestBloom === 'creer' && (task.includes('qcm') || task.includes('restituer') || evalType === 'diagnostique')) {
      warnings.push("Discordance cognitive majeure : L'objectif vise la création ('Créer'), mais l'évaluation semble se limiter à un rappel passif ou un QCM.");
      recommendations.push("Pour un objectif de création, prévoyez une grille d'évaluation portant sur la production concrète ou le prototype réalisé par l'élève.");
      evalScore -= 30;
    } else if (lesson.evaluation.criteria && lesson.evaluation.criteria.length > 0) {
      strengths.push(`Évaluation critériée structurée avec ${lesson.evaluation.criteria.length} critère(s) et indicateurs observables.`);
      evalScore = Math.min(100, evalScore + 20);
    }
  }

  // Global score calculation
  bloomConsistencyScore = Math.max(0, Math.min(100, bloomConsistencyScore));
  mediaScore = Math.max(0, Math.min(100, mediaScore));
  digitalScore = Math.max(0, Math.min(100, digitalScore));
  evalScore = Math.max(0, Math.min(100, evalScore));

  const totalScore = Math.round(
    (bloomConsistencyScore * 0.3) + 
    (evalScore * 0.3) + 
    (mediaScore * 0.2) + 
    (digitalScore * 0.2)
  );

  let status: 'optimal' | 'acceptable' | 'fragile' | 'desaligne' = 'acceptable';
  if (totalScore >= 85) status = 'optimal';
  else if (totalScore >= 70) status = 'acceptable';
  else if (totalScore >= 50) status = 'fragile';
  else status = 'desaligne';

  return {
    score: totalScore,
    tripleConcordanceStatus: status,
    strengths,
    warnings,
    recommendations,
    metrics: {
      bloomConsistency: bloomConsistencyScore,
      mediaJustification: mediaScore,
      digitalRelevance: digitalScore,
      evaluativePrecision: evalScore
    }
  };
}
