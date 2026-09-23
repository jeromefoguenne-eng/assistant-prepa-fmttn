import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  HeadingLevel, 
  AlignmentType,
  ShadingType
} from 'docx';
import { saveAs } from 'file-saver';
import { LessonPlan } from '../types/lesson';
import { ACTIVE_METHODOLOGIES } from '../data/methodologies';

export const exportLessonToDocx = async (lesson: LessonPlan) => {
  const activeMethodology = ACTIVE_METHODOLOGIES.find(
    m => m.id === lesson.methodology?.selectedMethodologyId
  );

  const methodologyName = lesson.methodology?.selectedMethodologyId === 'custom'
    ? (lesson.methodology?.customMethodologyTitle || 'Méthodologie personnalisée')
    : (activeMethodology?.name || 'Démarche active');

  const levelNames = lesson.evaluation?.levelNames || {
    nonAcquis: '1. Non acquis',
    enVoie: "2. En voie d'acquisition",
    acquis: '3. Acquis (Seuil de maîtrise)',
    depasse: '4. Dépassé (Expert / Transfert)'
  };

  const borderNone = {
    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  };

  const borderThin = {
    top: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
    left: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
    right: { style: BorderStyle.SINGLE, size: 4, color: "CBD5E1" },
  };

  const children: any[] = [];

  // En-tête Institutionnel
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `Niveau : ${lesson.grade || 'Non précisé'}`,
          bold: true,
          color: "1E293B",
          size: 20
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "HAUTE ÉCOLE CHARLEMAGNE • TRONC COMMUN (FWB)",
          bold: true,
          color: "64748B",
          size: 18
        })
      ]
    }),
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 100, after: 100 },
      children: [
        new TextRun({
          text: "FICHE DE PRÉPARATION PÉDAGOGIQUE — FMTTN",
          bold: true,
          color: "0F172A",
          size: 28
        })
      ]
    }),
    new Paragraph({
      spacing: { after: 250 },
      children: [
        new TextRun({
          text: "Formation Manuelle, Technique, Technologique et Numérique",
          italics: true,
          color: "475569",
          size: 20
        })
      ]
    })
  );

  // Tableau métadonnées générales
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: borderThin,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: "F8FAFC", type: ShadingType.CLEAR, color: "auto" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Titre de la leçon : ", bold: true, size: 19 }),
                    new TextRun({ text: lesson.title || 'Sans titre', size: 19 })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 80 },
                  children: [
                    new TextRun({ text: "Durée prévue : ", bold: true, size: 19 }),
                    new TextRun({ text: lesson.duration || 'Non précisée', size: 19 })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: "F8FAFC", type: ShadingType.CLEAR, color: "auto" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Public / Classe : ", bold: true, size: 19 }),
                    new TextRun({ text: lesson.targetAudience || 'Classe entière', size: 19 })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 80 },
                  children: [
                    new TextRun({ text: "Prérequis : ", bold: true, size: 19 }),
                    new TextRun({ text: lesson.prerequisites || 'Aucun prérequis majeur', size: 19 })
                  ]
                })
              ]
            })
          ]
        })
      ]
    }),
    new Paragraph({ spacing: { after: 200 } })
  );

  // 1. Ancrage dans le Référentiel FMTTN
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: "1. ANCRAGE DANS LE RÉFÉRENTIEL FMTTN — CONTENUS ET ATTENDUS",
          bold: true,
          color: "312E81",
          size: 22
        })
      ]
    })
  );

  if (!lesson.selectedItems || lesson.selectedItems.length === 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Aucun contenu ni attendu sélectionné.", italics: true })]
      })
    );
  } else {
    lesson.selectedItems.forEach(item => {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: `• [${item.type}] `, bold: true, color: "4338CA" }),
            new TextRun({ text: `${item.volet} — ${item.champ} : `, bold: true }),
            new TextRun({ text: item.intitule })
          ]
        }),
        new Paragraph({
          indent: { left: 400 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "Attendu officiel (élève) : ", bold: true, italics: true }),
            new TextRun({ text: `« ${item.attendu} »`, italics: true })
          ]
        })
      );
    });
  }

  if (lesson.referentielRationale) {
    children.push(
      new Paragraph({
        spacing: { before: 100, after: 180 },
        children: [
          new TextRun({ text: "Justification de l'ancrage : ", bold: true }),
          new TextRun({ text: lesson.referentielRationale })
        ]
      })
    );
  }

  // 2. Éducation aux Médias et au Numérique
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: "2. ÉDUCATION AUX MÉDIAS ET AU NUMÉRIQUE (CSEM & FWB)",
          bold: true,
          color: "581C87",
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Dimensions médiatiques mobilisées : ", bold: true }),
        new TextRun({
          text: (lesson.mediaEducation?.dimensions || []).map(d => 
            d === 'aux_medias' ? 'Éducation AUX médias' : d === 'par_les_medias' ? 'Éducation PAR les médias' : 'Éducation AVEC les médias'
          ).join(', ') || 'Non précisées'
        })
      ]
    })
  );

  if (lesson.mediaEducation?.competences && lesson.mediaEducation.competences.length > 0) {
    children.push(
      new Paragraph({
        spacing: { before: 60 },
        children: [
          new TextRun({ text: "Compétences CSEM : ", bold: true }),
          new TextRun({ text: lesson.mediaEducation.competences.join(' • ') })
        ]
      })
    );
  }

  if (lesson.mediaEducation?.justification) {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 180 },
        children: [
          new TextRun({ text: "Justification réflexive : ", bold: true }),
          new TextRun({ text: lesson.mediaEducation.justification, italics: true })
        ]
      })
    );
  }

  // 3. Démarche Pédagogique Active & Organisation
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: "3. DÉMARCHE PÉDAGOGIQUE ACTIVE & ORGANISATION SOCIALE",
          bold: true,
          color: "78350F",
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Méthodologie retenue : ", bold: true }),
        new TextRun({ text: methodologyName })
      ]
    }),
    new Paragraph({
      spacing: { before: 60 },
      children: [
        new TextRun({ text: "Organisation sociale : ", bold: true }),
        new TextRun({ text: lesson.methodology?.groupingStrategy || 'Non précisée' })
      ]
    })
  );

  if (lesson.methodology?.rationale) {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 180 },
        children: [
          new TextRun({ text: "Justification méthodologique : ", bold: true }),
          new TextRun({ text: lesson.methodology.rationale })
        ]
      })
    );
  }

  // 4. Scénario Didactique Détaillé (Tableau des phases)
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: "4. SCÉNARISATION DIDACTIQUE DÉTAILLÉE",
          bold: true,
          color: "164E63",
          size: 22
        })
      ]
    })
  );

  const phaseRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Phase & Durée", bold: true, size: 18 })] })]
        }),
        new TableCell({
          width: { size: 35, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Rôle et Actions de l'Élève", bold: true, size: 18 })] })]
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Posture de l'Enseignant", bold: true, size: 18 })] })]
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Modalité & Supports", bold: true, size: 18 })] })]
        })
      ]
    })
  ];

  (lesson.phases || []).forEach(p => {
    phaseRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: p.title || 'Phase', bold: true, size: 18 })] }),
              new Paragraph({ children: [new TextRun({ text: `${p.durationMinutes} min`, size: 16, color: "64748B" })] })
            ]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: p.studentRole || '-', size: 18 })] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: p.teacherRole || '-', size: 18 })] })]
          }),
          new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: `Modalité : ${p.socialModality || '-'}`, size: 17 })] }),
              new Paragraph({ children: [new TextRun({ text: `Supports : ${p.materials || '-'}`, size: 17 })] })
            ]
          })
        ]
      })
    );
  });

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: borderThin,
      rows: phaseRows
    }),
    new Paragraph({ spacing: { after: 120 } })
  );

  // Différenciation
  if (lesson.differentiation) {
    children.push(
      new Paragraph({
        spacing: { before: 100, after: 60 },
        children: [new TextRun({ text: "Différenciation pédagogique :", bold: true, size: 20 })]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "• Remédiation : ", bold: true }),
          new TextRun({ text: lesson.differentiation.remediation || 'Non précisé' })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "• Consolidation : ", bold: true }),
          new TextRun({ text: lesson.differentiation.consolidation || 'Non précisé' })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "• Dépassement : ", bold: true }),
          new TextRun({ text: lesson.differentiation.depassement || 'Non précisé' })
        ]
      }),
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({ text: "• Aménagements raisonnables : ", bold: true }),
          new TextRun({ text: lesson.differentiation.amenagements || 'Non précisé' })
        ]
      })
    );
  }

  // 5. Dispositif d'Évaluation Critériée
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 120 },
      children: [
        new TextRun({
          text: "5. DISPOSITIF D'ÉVALUATION CRITÉRIÉE — ATTEINTE DES ATTENDUS",
          bold: true,
          color: "881337",
          size: 22
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Type d'évaluation : ", bold: true }),
        new TextRun({ text: `${lesson.evaluation?.type} (${lesson.evaluation?.modality})` })
      ]
    }),
    new Paragraph({
      spacing: { before: 60 },
      children: [
        new TextRun({ text: "Consigne de la tâche : ", bold: true }),
        new TextRun({ text: lesson.evaluation?.taskDescription || 'Non précisée' })
      ]
    })
  );

  if (lesson.evaluation?.feedbackStrategy) {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 120 },
        children: [
          new TextRun({ text: "Stratégie de feedback à l'élève : ", bold: true }),
          new TextRun({ text: lesson.evaluation.feedbackStrategy })
        ]
      })
    );
  }

  // Grille analytique d'évaluation
  const evalRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Critère & Attendu lié", bold: true, size: 18 })] })]
        }),
        new TableCell({
          width: { size: 27, type: WidthType.PERCENTAGE },
          shading: { fill: "E2E8F0", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: "Indicateur observable", bold: true, size: 18 })] })]
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: "FFE4E6", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: levelNames.nonAcquis, bold: true, size: 17 })] })]
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: "FEF3C7", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: levelNames.enVoie, bold: true, size: 17 })] })]
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: "D1FAE5", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: levelNames.acquis, bold: true, size: 17 })] })]
        }),
        new TableCell({
          width: { size: 12, type: WidthType.PERCENTAGE },
          shading: { fill: "DBEAFE", type: ShadingType.CLEAR, color: "auto" },
          children: [new Paragraph({ children: [new TextRun({ text: levelNames.depasse, bold: true, size: 17 })] })]
        })
      ]
    })
  ];

  (lesson.evaluation?.criteria || []).forEach(c => {
    evalRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({ children: [new TextRun({ text: c.criterion || 'Critère', bold: true, size: 18 })] }),
              ...(c.attenduText ? [
                new Paragraph({
                  spacing: { before: 60 },
                  children: [new TextRun({ text: `« ${c.attenduText} »`, italics: true, size: 16, color: "4338CA" })]
                })
              ] : [])
            ]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: c.observableIndicator || '-', size: 17 })] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: c.nonAcquis || '-', size: 17 })] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: c.enVoie || '-', size: 17 })] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: c.acquis || '-', size: 17 })] })]
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: c.depasse || '-', size: 17 })] })]
          })
        ]
      })
    );
  });

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: borderThin,
      rows: evalRows
    }),
    new Paragraph({ spacing: { after: 250 } })
  );

  // 6. Signature & Visa
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: borderNone,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: "Date de conception : ", bold: true }),
                    new TextRun({ text: new Date(lesson.createdAt).toLocaleDateString('fr-BE') })
                  ]
                })
              ]
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [new TextRun({ text: "Visa / Signature enseignant : ", bold: true })]
                }),
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 100 },
                  children: [new TextRun({ text: "___________________________", color: "94A3B8" })]
                })
              ]
            })
          ]
        })
      ]
    })
  );

  // Construction du Document docx
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1000,
              right: 1000
            }
          }
        },
        children
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const safeTitle = (lesson.title || 'prepa_fmttn').replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_');
  saveAs(blob, `Preparation_FMTTN_${lesson.grade}_${safeTitle}.docx`);
};
