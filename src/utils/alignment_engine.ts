import { LessonPlan, AlignmentDiagnostic } from '../types/lesson';

export function analyzeAlignment(lesson: LessonPlan): AlignmentDiagnostic {
  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  let referentielScore = 80;
  let mediaScore = 70;
  let digitalScore = 75;
  let evalScore = 70;

  // 1. Référentiel FMTTN check (Contenus & Attendus)
  const selectedItems = lesson.selectedItems || [];
  if (selectedItems.length === 0) {
    warnings.push("Aucun contenu ni attendu du référentiel officiel FMTTN n'est sélectionné.");
    recommendations.push("Sélectionnez au moins un attendu officiel dans l'Étape 1 (Ancrage Référentiel).");
    referentielScore = 20;
  } else {
    strengths.push(`${selectedItems.length} élément(s) officiel(s) du référentiel FMTTN (contenus et attendus) lié(s) à la leçon.`);
    referentielScore = Math.min(100, 70 + selectedItems.length * 10);
  }

  if (!lesson.referentielRationale || lesson.referentielRationale.trim().length < 15) {
    warnings.push("L'explicitation de l'ancrage dans le référentiel est incomplète ou absente.");
    recommendations.push("Justifiez en 2 ou 3 phrases pourquoi cette séquence sert précisément les contenus et attendus sélectionnés.");
    referentielScore = Math.max(20, referentielScore - 25);
  } else {
    strengths.push("Explicitation claire et didactique de l'ancrage dans le référentiel FMTTN.");
  }

  // 2. Éducation aux Médias check (Dimensions CSEM & FWB)
  if (!lesson.mediaEducation?.dimensions || lesson.mediaEducation.dimensions.length === 0) {
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

  // 3. Outils numériques & anti-technocentrisme
  if (lesson.digitalTools && lesson.digitalTools.length > 0) {
    let missingRationale = false;
    lesson.digitalTools.forEach(tool => {
      if (!tool.pedagogicalRationale || tool.pedagogicalRationale.trim().length < 15) {
        missingRationale = true;
        warnings.push(`L'outil numérique '${tool.name}' manque de justification pédagogique (risque d'outil-gadget).`);
      }
    });

    if (missingRationale) {
      recommendations.push("Pour chaque technologie, explicitez pourquoi cet outil sert l'apprentissage mieux qu'un support traditionnel.");
      digitalScore -= 30;
    } else {
      strengths.push("Tous les outils numériques mobilisés disposent d'une justification pédagogique explicite (anti-technocentrisme respecté).");
      digitalScore = 95;
    }
  }

  // 4. Évaluation critériée de l'atteinte des attendus
  const criteria = lesson.evaluation?.criteria || [];
  if (criteria.length === 0) {
    warnings.push("Aucun critère d'évaluation n'est défini dans la grille analytique.");
    recommendations.push("Définissez des critères et indicateurs observables pour évaluer l'atteinte des attendus dans l'Étape Évaluation.");
    evalScore = 20;
  } else {
    // Vérification de la couverture des attendus sélectionnés
    if (selectedItems.length > 0) {
      const coveredAttendusCount = selectedItems.filter(item => 
        criteria.some(c => c.attenduId === item.id)
      ).length;

      if (coveredAttendusCount === selectedItems.length) {
        strengths.push(`Triple concordance parfaite : 100% des attendus sélectionnés (${selectedItems.length}/${selectedItems.length}) font l'objet d'un critère d'évaluation explicite.`);
        evalScore = Math.min(100, evalScore + 25);
      } else if (coveredAttendusCount > 0) {
        warnings.push(`Couverture partielle : ${coveredAttendusCount}/${selectedItems.length} attendu(s) sélectionné(s) sont directement reliés à un critère d'évaluation.`);
        recommendations.push("Associez chaque attendu sélectionné à un critère d'évaluation pour garantir une triple concordance complète.");
        evalScore = 70;
      } else {
        warnings.push("Les critères d'évaluation ne sont pas encore explicitement reliés aux attendus sélectionnés.");
        recommendations.push("Reliez vos critères d'évaluation aux attendus sélectionnés à l'aide du sélecteur à l'étape Évaluation.");
        evalScore = 55;
      }
    }
  }

  // Global score calculation
  referentielScore = Math.max(0, Math.min(100, referentielScore));
  mediaScore = Math.max(0, Math.min(100, mediaScore));
  digitalScore = Math.max(0, Math.min(100, digitalScore));
  evalScore = Math.max(0, Math.min(100, evalScore));

  const totalScore = Math.round(
    (referentielScore * 0.3) + 
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
      referentielCoverage: referentielScore,
      mediaJustification: mediaScore,
      digitalRelevance: digitalScore,
      evaluativePrecision: evalScore
    }
  };
}
