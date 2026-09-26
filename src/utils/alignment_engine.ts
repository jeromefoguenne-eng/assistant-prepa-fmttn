import { LessonPlan, AlignmentDiagnostic } from '../types/lesson';

export function analyzeAlignment(lesson: LessonPlan): AlignmentDiagnostic {
  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];
  const severeFailures: string[] = [];

  // =========================================================================
  // 1. DÉTECTION PRÉALABLE : LA LEÇON EST-ELLE VIERGE / VIDE ?
  // =========================================================================
  const title = (lesson.title || '').trim();
  const selectedItems = lesson.selectedItems || [];
  const phases = lesson.phases || [];
  const totalStudentRoleLength = phases.reduce(
    (acc, p) => acc + (p.studentRole ? p.studentRole.trim().length : 0),
    0
  );
  const criteria = (lesson.evaluation?.criteria || []).filter(
    c => c.criterion && c.criterion.trim().length > 0
  );
  const taskDesc = (lesson.evaluation?.taskDescription || '').trim();

  const isTitleEmpty = title.length === 0;
  const isAttendusEmpty = selectedItems.length === 0;
  const isScenarisationEmpty = totalStudentRoleLength === 0;
  const isEvaluationEmpty = criteria.length === 0 && taskDesc.length === 0;

  // Si tout est vide -> Score strict = 0 / 100
  if (isTitleEmpty && isAttendusEmpty && isScenarisationEmpty && isEvaluationEmpty) {
    return {
      score: 0,
      tripleConcordanceStatus: 'desaligne',
      isVirginPlan: true,
      severeFailures: [
        "Préparation vierge : aucun contenu didactique n'a encore été saisi."
      ],
      strengths: [],
      warnings: [
        "Préparation vierge (Score : 0 / 100).",
        "Aucune thématique, aucun attendu officiel FMTTN, aucune scénarisation d'activité ni évaluation n'ont encore été définis."
      ],
      recommendations: [
        "Commencez par l'Étape 1 pour sélectionner les savoirs et attendus officiels du Tronc Commun FMTTN et nommer votre leçon.",
        "Poursuivez ensuite avec l'Étape 4 (Activité) pour scénariser le rôle des élèves, puis l'Étape 5 pour concevoir la grille d'évaluation."
      ],
      metrics: {
        referentielCoverage: 0,
        scenarisationQuality: 0,
        evaluativePrecision: 0,
        mediaJustification: 0,
        digitalRelevance: 0
      }
    };
  }

  // =========================================================================
  // 2. CONTRÔLE DES 4 PILIERS FONDAMENTAUX (ÉCHEC SÉVÈRE EN CAS D'ABSENCE)
  // =========================================================================

  // Fondamental 1 : Thématique / Intitulé de la leçon
  let maxTitleCeiling = 100;
  if (title.length < 5) {
    severeFailures.push("Thématique de la leçon absente ou indéfinie (Fondamental)");
    warnings.push("Thématique absente : La leçon n'a aucun intitulé ni objet d'apprentissage formalisé.");
    recommendations.push("À l'Étape 1, donnez un titre clair et explicite à votre préparation (ex. 'Identifier les fake news sur les réseaux sociaux').");
    maxTitleCeiling = 30;
  }

  // Fondamental 2 : Attendus officiels du Référentiel FMTTN
  let maxReferentielCeiling = 100;
  if (isAttendusEmpty) {
    severeFailures.push("Attendus du Référentiel FMTTN absents (Fondamental)");
    warnings.push("Absence d'attendus officiels : Aucun attendu d'apprentissage ni savoir du référentiel FMTTN n'est associé à cette préparation.");
    recommendations.push("À l'Étape 1 (Ancrage Référentiel), sélectionnez au moins un attendu officiel dans le programme du Tronc Commun.");
    maxReferentielCeiling = 20;
  }

  // Fondamental 3 : Scénarisation des activités élèves
  let maxScenarisationCeiling = 100;
  if (totalStudentRoleLength < 20) {
    severeFailures.push("Scénarisation didactique vide : rôle des élèves non explicité (Fondamental)");
    warnings.push("Scénarisation didactique absente : Le déroulement de l'activité ne décrit pas les tâches, actions ou productions concrètes des élèves.");
    recommendations.push("À l'Étape 4 (Activité), explicitez précisément dans les phases (Amorce, Recherche, Synthèse) ce que font les élèves.");
    maxScenarisationCeiling = 25;
  }

  // Fondamental 4 : Dispositif d'évaluation
  let maxEvaluationCeiling = 100;
  if (isEvaluationEmpty) {
    severeFailures.push("Dispositif d'évaluation absent : aucun critère critérié (Fondamental)");
    warnings.push("Évaluation absente : Aucun critère observable ni tâche d'évaluation n'a été défini pour vérifier la maîtrise des attendus.");
    recommendations.push("À l'Étape 5 (Évaluation), définissez la tâche d'évaluation et au moins un critère avec ses indicateurs observables.");
    maxEvaluationCeiling = 30;
  }

  // =========================================================================
  // 3. CALCUL CUMULATIF DES 4 SCORES INDIVIDUELS (DÉPART À 0)
  // =========================================================================

  // --- PILIER 1 : Ancrage Référentiel FMTTN (Poids 30%) ---
  let referentielScore = 0;
  if (selectedItems.length > 0) {
    // 40 points de base pour le 1er attendu, +15 par attendu supplémentaire (max 70)
    referentielScore = Math.min(70, 40 + (selectedItems.length - 1) * 15);
    strengths.push(`${selectedItems.length} élément(s) officiel(s) du référentiel FMTTN associé(s) à la leçon.`);

    // Justification de l'ancrage (+30 points)
    const rationale = (lesson.referentielRationale || '').trim();
    if (rationale.length >= 40) {
      referentielScore += 30;
      strengths.push("Justification didactique solide de l'ancrage institutionnel dans le référentiel FMTTN.");
    } else if (rationale.length >= 15) {
      referentielScore += 15;
      warnings.push("L'explicitation de l'ancrage dans le référentiel est succincte.");
      recommendations.push("Développez en 2 ou 3 phrases en quoi les activités choisies servent directement les attendus sélectionnés.");
    } else {
      warnings.push("L'explicitation de l'ancrage institutionnel est absente.");
      recommendations.push("Rédigez la justification didactique pour expliciter le lien entre attendus du référentiel et intentions pédagogiques.");
    }
  }

  // --- PILIER 2 : Scénarisation Didactique (Poids 30%) ---
  let scenarisationScore = 0;
  if (totalStudentRoleLength >= 20) {
    // Rôle élève par phase active (jusqu'à 60 points)
    const activeStudentPhases = phases.filter(p => p.studentRole && p.studentRole.trim().length >= 15);
    scenarisationScore += Math.min(60, activeStudentPhases.length * 20);
    if (activeStudentPhases.length >= 3) {
      strengths.push("Scénarisation complète sur les 3 phases didactiques (Amorce, Recherche, Synthèse).");
    } else if (activeStudentPhases.length > 0) {
      strengths.push(`${activeStudentPhases.length} phase(s) d'activité avec consignes et rôles élèves formalisés.`);
    }

    // Posture et guidage de l'enseignant (jusqu'à 15 points)
    const activeTeacherPhases = phases.filter(p => p.teacherRole && p.teacherRole.trim().length >= 15);
    if (activeTeacherPhases.length >= 2) {
      scenarisationScore += 15;
      strengths.push("Rôle et guidage de l'enseignant explicités sur plusieurs phases.");
    } else if (activeTeacherPhases.length === 1) {
      scenarisationScore += 8;
    } else {
      warnings.push("Le rôle et la posture de l'enseignant ne sont pas formalisés dans les phases d'activité.");
      recommendations.push("Précisez le rôle de l'enseignant (ex. relance, étayage, institutionnalisation) pour chaque phase.");
    }

    // Modalités sociales et matériels (jusqu'à 15 points)
    const hasModalities = phases.some(p => (p.socialModality || '').trim().length > 0);
    const hasMaterials = phases.some(p => (p.materials || '').trim().length > 0);
    if (hasModalities && hasMaterials) {
      scenarisationScore += 15;
      strengths.push("Modalités sociales et matériel pédagogique précisés pour la mise en œuvre.");
    } else if (hasModalities || hasMaterials) {
      scenarisationScore += 8;
    }

    // Différenciation pédagogique (jusqu'à 10 points)
    const diff = lesson.differentiation;
    const hasDiff = diff && (
      (diff.remediation && diff.remediation.trim().length >= 10) ||
      (diff.consolidation && diff.consolidation.trim().length >= 10) ||
      (diff.depassement && diff.depassement.trim().length >= 10)
    );
    if (hasDiff) {
      scenarisationScore += 10;
      strengths.push("Dispositif de différenciation pédagogique documenté (remédiation / consolidation / dépassement).");
    } else {
      recommendations.push("Pensez à prévoir des pistes de remédiation ou de consolidation dans l'onglet Activité (point 4.2).");
    }
  }

  // --- PILIER 3 : Précision Évaluative & Concordance (Poids 25%) ---
  let evalScore = 0;
  if (!isEvaluationEmpty) {
    // Tâche d'évaluation (jusqu'à 20 points)
    if (taskDesc.length >= 20) {
      evalScore += 20;
      strengths.push("Tâche d'évaluation bien définie avec consignes explicites.");
    } else if (taskDesc.length > 0) {
      evalScore += 10;
    } else {
      warnings.push("La tâche globale d'évaluation n'est pas décrite.");
      recommendations.push("Précisez dans l'Étape 5 la production concrète attendue de l'élève pour l'évaluation.");
    }

    // Critères observables valides (jusqu'à 40 points)
    const validCriteria = criteria.filter(c => c.criterion && c.criterion.trim().length >= 4);
    if (validCriteria.length >= 2) {
      evalScore += 40;
      strengths.push(`Grille critériée analytique complète (${validCriteria.length} critères observables).`);
    } else if (validCriteria.length === 1) {
      evalScore += 25;
      strengths.push("1 critère d'évaluation formalisé avec indicateurs observables.");
    }

    // Triple concordance : liaison critères ↔ attendus sélectionnés (jusqu'à 30 points)
    if (selectedItems.length > 0 && validCriteria.length > 0) {
      const coveredAttendusCount = selectedItems.filter(item =>
        validCriteria.some(c => c.attenduId === item.id)
      ).length;

      if (coveredAttendusCount === selectedItems.length) {
        evalScore += 30;
        strengths.push(`Triple concordance parfaite : 100% des attendus sélectionnés (${selectedItems.length}/${selectedItems.length}) font l'objet d'un critère explicite.`);
      } else if (coveredAttendusCount > 0) {
        evalScore += 15;
        warnings.push(`Couverture partielle : ${coveredAttendusCount}/${selectedItems.length} attendu(s) sélectionné(s) relié(s) à un critère d'évaluation.`);
        recommendations.push("Associez chaque attendu sélectionné à un critère d'évaluation dans la grille pour assurer la concordance.");
      } else {
        warnings.push("Les critères d'évaluation ne sont pas encore reliés aux attendus sélectionnés du référentiel.");
        recommendations.push("Dans la grille critériée, utilisez le menu déroulant pour rattacher chaque critère à son attendu officiel.");
      }
    }

    // Niveaux de maîtrise décrits (jusqu'à 10 points)
    const hasLevelsDescribed = validCriteria.some(
      c => (c.acquis && c.acquis.trim().length > 3) || (c.nonAcquis && c.nonAcquis.trim().length > 3)
    );
    if (hasLevelsDescribed) {
      evalScore += 10;
      strengths.push("Degrés d'atteinte et paliers d'acquisition décrits pour guider le jugement professoral.");
    }
  }

  // --- PILIER 4 : Éducation aux Médias & Numérique (Poids 15%) ---
  let mediaScore = 0;
  const dimensions = lesson.mediaEducation?.dimensions || [];
  if (dimensions.length > 0) {
    mediaScore += 40;
    strengths.push(`Éducation aux médias intégrée : ${dimensions.length} dimension(s) CSEM mobilisée(s).`);

    const mediaJustif = (lesson.mediaEducation?.justification || '').trim();
    if (mediaJustif.length >= 40) {
      mediaScore += 35;
      strengths.push("Justification rigoureuse de la compétence médiatique et du regard critique.");
    } else if (mediaJustif.length >= 15) {
      mediaScore += 20;
      warnings.push("La justification de la dimension médiatique est courte.");
      recommendations.push("Explicitez en quoi la dimension médiatique choisie apporte une réelle plus-value réflexive ou critique.");
    } else {
      warnings.push("Aucune justification de la dimension d'éducation aux médias n'est rédigée.");
      recommendations.push("Complétez la justification médiatique à l'Étape 2 pour expliciter la visée citoyenne ou critique.");
    }
  } else {
    warnings.push("Aucune dimension d'éducation aux médias n'est sélectionnée (Éducation AUX, PAR ou AVEC les médias).");
    recommendations.push("À l'Étape 2, cochez la ou les dimensions médiatiques mobilisées (référentiel CSEM / FWB).");
  }

  // Outils numériques et anti-technocentrisme (jusqu'à 25 points)
  const digitalTools = lesson.digitalTools || [];
  let digitalScore = 70;
  if (digitalTools.length > 0) {
    let missingRationaleCount = 0;
    digitalTools.forEach(tool => {
      if (!tool.pedagogicalRationale || tool.pedagogicalRationale.trim().length < 15) {
        missingRationaleCount++;
        warnings.push(`L'outil numérique '${tool.name}' manque de justification pédagogique (risque d'outil-gadget).`);
      }
    });

    if (missingRationaleCount > 0) {
      recommendations.push("Pour chaque outil numérique, justifiez sa plus-value pédagogique par rapport à un support traditionnel.");
      mediaScore += 10;
      digitalScore = 40;
    } else {
      mediaScore += 25;
      digitalScore = 100;
      strengths.push("Outils numériques justifiés didactiquement (principe anti-technocentrisme respecté).");
    }
  } else {
    // Si pas d'outil numérique mais dimension médiatique bien traitée, on équilibre
    if (mediaScore > 0) {
      mediaScore = Math.min(100, mediaScore + 25);
    }
    digitalScore = 50;
  }

  // Plafonnement de chaque métrique entre 0 et 100
  referentielScore = Math.max(0, Math.min(100, Math.round(referentielScore)));
  scenarisationScore = Math.max(0, Math.min(100, Math.round(scenarisationScore)));
  evalScore = Math.max(0, Math.min(100, Math.round(evalScore)));
  mediaScore = Math.max(0, Math.min(100, Math.round(mediaScore)));

  // =========================================================================
  // 4. SCORE BRUT PONDÉRÉ
  // =========================================================================
  const rawScore = Math.round(
    referentielScore * 0.30 +
    scenarisationScore * 0.30 +
    evalScore * 0.25 +
    mediaScore * 0.15
  );

  // =========================================================================
  // 5. APPLICATION DES SANCTIONS ET ÉCHECS SÉVÈRES
  // =========================================================================
  let finalScore = rawScore;
  const severeCount = severeFailures.length;

  if (severeCount >= 2) {
    // Cumul de 2 ou plusieurs manquements fondamentaux : Échec éliminatoire
    finalScore = Math.min(rawScore, 15);
    warnings.unshift(
      `⛔ ÉCHEC DIDACTIQUE SÉVÈRE : ${severeCount} piliers fondamentaux sur 4 sont totalement manquants. La préparation ne peut être validée.`
    );
  } else if (severeCount === 1) {
    // Un manquement fondamental unique : Échec sévère ciblé
    const strictCeiling = Math.min(
      maxTitleCeiling,
      maxReferentielCeiling,
      maxScenarisationCeiling,
      maxEvaluationCeiling
    );
    finalScore = Math.min(rawScore, strictCeiling);
    warnings.unshift(
      `⚠️ ÉCHEC PARTIEL SÉVÈRE : Un pilier fondamental de la préparation est totalement absent (${severeFailures[0]}). Le score d'alignement est lourdement sanctionné.`
    );
  }

  // Garantir les bornes 0-100
  finalScore = Math.max(0, Math.min(100, finalScore));

  // Statut de concordance
  let status: 'optimal' | 'acceptable' | 'fragile' | 'desaligne' = 'acceptable';
  if (severeCount > 0 || finalScore < 50) {
    status = 'desaligne';
  } else if (finalScore >= 85) {
    status = 'optimal';
  } else if (finalScore >= 70) {
    status = 'acceptable';
  } else {
    status = 'fragile';
  }

  return {
    score: finalScore,
    tripleConcordanceStatus: status,
    severeFailures: severeFailures.length > 0 ? severeFailures : undefined,
    strengths,
    warnings,
    recommendations,
    metrics: {
      referentielCoverage: referentielScore,
      scenarisationQuality: scenarisationScore,
      evaluativePrecision: evalScore,
      mediaJustification: mediaScore,
      digitalRelevance: digitalScore
    }
  };
}
