import React, { useRef } from 'react';
import { 
  FileCheck2, 
  Printer, 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Upload
} from 'lucide-react';
import hechLogo from '../../assets/hech.jpg';
import { LessonPlan } from '../../types/lesson';
// BLOOM_TAXONOMY removed
import { ACTIVE_METHODOLOGIES } from '../../data/methodologies';

interface Step8Props {
  lesson: LessonPlan;
  onImportLesson: (imported: LessonPlan) => void;
  onPrev: () => void;
}

export const Step8Export: React.FC<Step8Props> = ({ lesson, onImportLesson, onPrev }) => {
  const [copied, setCopied] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeMethodology = ACTIVE_METHODOLOGIES.find(
    m => m.id === lesson.methodology?.selectedMethodologyId
  );

  const methodologyName = lesson.methodology?.selectedMethodologyId === 'custom'
    ? (lesson.methodology?.customMethodologyTitle || 'Méthodologie personnalisée')
    : (activeMethodology?.name || 'Démarche active');

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lesson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prepa_fmttn_${lesson.grade}_${lesson.title.replace(/\s+/g, '_') || 'lecon'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportMarkdown = () => {
    let md = `# FICHE DE PRÉPARATION PÉDAGOGIQUE — FMTTN (HECh - FWB)\n\n`;
    md += `**Titre :** ${lesson.title}\n`;
    md += `**Niveau :** ${lesson.grade} | **Durée :** ${lesson.duration} | **Public :** ${lesson.targetAudience}\n\n`;
    
    md += `## 1. ANCRAGE DANS LE RÉFÉRENTIEL FMTTN — CONTENUS ET ATTENDUS\n`;
    (lesson.selectedItems || []).forEach(item => {
      md += `- **[${item.type}]** ${item.volet} — ${item.champ}\n`;
      md += `  - **Contenu (enseignant) :** ${item.intitule}\n`;
      md += `  - **Attendu (élève) :** « ${item.attendu} »\n`;
    });
    md += `\n**Justification de l'ancrage :** ${lesson.referentielRationale}\n\n`;

    md += `## 2. ÉDUCATION AUX MÉDIAS ET AU NUMÉRIQUE\n`;
    md += `- Dimensions : ${lesson.mediaEducation?.dimensions?.join(', ') || 'Non précisées'}\n`;
    md += `- Compétences CSEM : ${lesson.mediaEducation?.competences?.join(' ; ') || 'Non précisées'}\n`;
    md += `- Justification : ${lesson.mediaEducation?.justification || 'Non précisée'}\n\n`;

    md += `## 3. DÉMARCHE PÉDAGOGIQUE ACTIVE\n`;
    md += `- Démarche : ${methodologyName}\n`;
    md += `- Organisation sociale : ${lesson.methodology?.groupingStrategy}\n`;
    md += `- Rationale : ${lesson.methodology?.rationale}\n\n`;

    md += `## 4. SCÉNARISATION DIDACTIQUE (PHASES & DIFFÉRENCIATION)\n`;
    (lesson.phases || []).forEach((p) => {
      md += `### ${p.title} (${p.durationMinutes} min)\n`;
      md += `- **Élève :** ${p.studentRole}\n`;
      md += `- **Enseignant :** ${p.teacherRole}\n`;
      md += `- **Modalité :** ${p.socialModality} | **Matériel :** ${p.materials}\n\n`;
    });
    if (lesson.differentiation) {
      md += `### Différenciation pédagogique :\n`;
      if (lesson.differentiation.remediation) md += `- **Remédiation :** ${lesson.differentiation.remediation}\n`;
      if (lesson.differentiation.consolidation) md += `- **Consolidation :** ${lesson.differentiation.consolidation}\n`;
      if (lesson.differentiation.depassement) md += `- **Dépassement :** ${lesson.differentiation.depassement}\n`;
      if (lesson.differentiation.amenagements) md += `- **Aménagements raisonnables :** ${lesson.differentiation.amenagements}\n`;
      md += `\n`;
    }

    md += `## 5. ÉVALUATION CRITÉRIÉE DE L'ATTEINTE DES ATTENDUS\n`;
    md += `- **Dispositif :** ${lesson.evaluation?.type} (${lesson.evaluation?.modality})\n`;
    md += `- **Tâche d'évaluation :** ${lesson.evaluation?.taskDescription}\n`;
    if (lesson.evaluation?.feedbackStrategy) {
      md += `- **Feedback à l'élève :** ${lesson.evaluation?.feedbackStrategy}\n`;
    }
    md += `\n### Grille d'évaluation analytique :\n`;
    (lesson.evaluation?.criteria || []).forEach((c, i) => {
      md += `#### Critère ${i+1} : ${c.criterion}\n`;
      if (c.attenduText) {
        md += `- **Attendu évalué :** « ${c.attenduText} »\n`;
      }
      md += `- **Indicateur observable :** ${c.observableIndicator}\n`;
      md += `- **Non acquis :** ${c.nonAcquis}\n`;
      md += `- **En voie d'acquisition :** ${c.enVoie}\n`;
      md += `- **Acquis (cible) :** ${c.acquis}\n`;
      if (c.depasse) {
        md += `- **Dépassé :** ${c.depasse}\n`;
      }
      md += `\n`;
    });

    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(md);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prepa_fmttn_${lesson.grade}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(`Préparation FMTTN : ${lesson.title} (${lesson.grade})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.grade && parsed.title !== undefined) {
          onImportLesson(parsed);
        } else {
          alert("Fichier JSON invalide pour Assistant Préparation cours FMTTN.");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Barre d'outils d'action (masquée à l'impression) */}
      <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / Sauvegarder en PDF</span>
          </button>

          <button
            type="button"
            onClick={handleExportMarkdown}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Export Markdown (.md)</span>
          </button>

          <button
            type="button"
            onClick={handleExportJSON}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition border border-slate-300 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Sauvegarde JSON</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition cursor-pointer"
            title="Charger un fichier JSON précédemment exporté"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importer JSON</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center space-x-1 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>
        </div>
      </div>

      {/* Fiche Officielle Formattée (Print-ready, fond blanc) */}
      <div className="print-document bg-white rounded-2xl border border-slate-300 p-6 sm:p-10 shadow-sm space-y-4 text-slate-900">
        
        {/* Entête institutionnel */}
        <div className="print-header border-b-2 border-slate-900 pb-3 flex flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="logo-box h-12 w-12 bg-white p-1 rounded-lg border border-slate-200 flex-shrink-0 flex items-center justify-center">
              <img src={hechLogo} alt="Logo HECh" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="top-label text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Haute École Charlemagne • Tronc Commun (FWB)
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-950">
                FICHE DE PRÉPARATION PÉDAGOGIQUE — FMTTN
              </h1>
              <p className="subtitle text-xs text-slate-600 font-medium">
                Assistant Préparation cours FMTTN • Formation Manuelle, Technique, Technologique et Numérique
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="level-badge inline-block px-3 py-1 bg-slate-900 text-white rounded-md font-bold text-xs shadow-xs">
              Niveau : {lesson.grade}
            </span>
          </div>
        </div>

        {/* Tableau récapitulatif du cadre */}
        <div className="print-meta-grid grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="meta-label text-slate-500 font-semibold block text-[10px]">Titre :</span>
            <strong className="text-slate-900 leading-snug">{lesson.title || 'Sans titre'}</strong>
          </div>
          <div>
            <span className="meta-label text-slate-500 font-semibold block text-[10px]">Durée prévue :</span>
            <strong className="text-slate-900">{lesson.duration || 'Non précisée'}</strong>
          </div>
          <div>
            <span className="meta-label text-slate-500 font-semibold block text-[10px]">Public / Classe :</span>
            <strong className="text-slate-900">{lesson.targetAudience || 'Classe entière'}</strong>
          </div>
          <div>
            <span className="meta-label text-slate-500 font-semibold block text-[10px]">Prérequis :</span>
            <strong className="text-slate-900">{lesson.prerequisites || 'Aucun prérequis majeur'}</strong>
          </div>
        </div>

        {/* 1. Ancrage Référentiel : Contenus et Attendus */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1">
            1. Ancrage dans le Référentiel FMTTN — Contenus (savoirs, savoir-faire, compétences (enseignant)) et attendus (élèves)
          </h2>
          <div className="space-y-1.5 text-xs">
            {lesson.selectedItems.map((item) => (
              <div key={item.id} className="print-item-box p-2 bg-slate-50 rounded-lg border border-slate-200 space-y-0.5">
                <div>
                  <span className="font-bold text-indigo-700">[{item.type}]</span> {item.volet} • <strong>{item.champ}</strong> :
                  <span className="font-semibold text-slate-900 ml-1">Contenu : {item.intitule}</span>
                </div>
                <div className="text-slate-700 italic pl-2 border-l-2 border-indigo-300">
                  <span className="not-italic font-medium text-indigo-950">Attendu (élève) : </span>
                  « {item.attendu} »
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-600 pt-0.5">
              <strong>Justification de l'ancrage :</strong> {lesson.referentielRationale || 'Non renseignée.'}
            </p>
          </div>
        </div>

        {/* 2. Éducation aux Médias */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-purple-900 border-b border-purple-200 pb-1">
            2. Éducation aux Médias et au Numérique (CSEM & FWB)
          </h2>
          <div className="text-xs space-y-1 text-slate-800">
            <div>
              <strong>Dimensions médiatiques :</strong>{' '}
              {lesson.mediaEducation?.dimensions?.map(d => (
                <span key={d} className="print-badge inline-block mr-1.5 px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">
                  {d === 'aux_medias' ? 'Éducation AUX médias' : d === 'par_les_medias' ? 'Éducation PAR les médias' : 'Éducation AVEC les médias'}
                </span>
              ))}
            </div>
            {lesson.mediaEducation?.competences?.length > 0 && (
              <div>
                <strong>Compétences CSEM :</strong> {lesson.mediaEducation.competences.join(' • ')}
              </div>
            )}
            <p className="text-slate-600 italic">
              <strong>Justification réflexive :</strong> {lesson.mediaEducation?.justification}
            </p>
          </div>
        </div>

        {/* 4. Méthodologie */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-1">
            3. Démarche Pédagogique Active & Organisation
          </h2>
          <div className="text-xs space-y-0.5 text-slate-800">
            <p>
              <strong>Méthodologie retenue :</strong> {methodologyName}
              {activeMethodology?.tagline && <span className="italic text-slate-600"> — {activeMethodology.tagline}</span>}
            </p>
            <p>
              <strong>Organisation sociale :</strong> {lesson.methodology?.groupingStrategy}
            </p>
            <p>
              <strong>Justification méthodologique :</strong> {lesson.methodology?.rationale}
            </p>
          </div>
        </div>

        {/* 5. Déroulement Chronologique (Phases) */}
        <div className="print-section space-y-2">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-200 pb-1">
            4. Scénario Didactique Détaillé
          </h2>
          <div className="print-table-container">
            <table className="print-table w-full text-left text-xs border border-slate-300 rounded-lg">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-2 border border-slate-300 w-[18%]">Phase & Durée</th>
                  <th className="p-2 border border-slate-300 w-[36%]">Rôle et Actions de l'Élève</th>
                  <th className="p-2 border border-slate-300 w-[28%]">Posture de l'Enseignant</th>
                  <th className="p-2 border border-slate-300 w-[18%]">Modalité & Matériel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lesson.phases.map(p => (
                  <tr key={p.id}>
                    <td className="p-2 border border-slate-300 font-bold text-slate-900 bg-slate-50/50">
                      <div>{p.title}</div>
                      <span className="text-[10px] font-normal text-slate-500 block mt-0.5">{p.durationMinutes} min</span>
                    </td>
                    <td className="p-2 border border-slate-300 leading-snug text-slate-800">
                      {p.studentRole}
                    </td>
                    <td className="p-2 border border-slate-300 leading-snug text-slate-800">
                      {p.teacherRole}
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-700 space-y-0.5">
                      <div><strong className="text-slate-800">Modalité :</strong> {p.socialModality}</div>
                      <div><strong className="text-slate-800">Supports :</strong> {p.materials}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Différenciation */}
          {(lesson.differentiation?.remediation || lesson.differentiation?.consolidation || lesson.differentiation?.depassement || lesson.differentiation?.amenagements) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                <strong className="text-slate-800 block text-[11px]">Remédiation :</strong>
                <span className="text-slate-600">{lesson.differentiation.remediation || 'Non précisé'}</span>
              </div>
              <div>
                <strong className="text-slate-800 block text-[11px]">Consolidation :</strong>
                <span className="text-slate-600">{lesson.differentiation.consolidation || 'Non précisé'}</span>
              </div>
              <div>
                <strong className="text-slate-800 block text-[11px]">Dépassement :</strong>
                <span className="text-slate-600">{lesson.differentiation.depassement || 'Non précisé'}</span>
              </div>
              <div>
                <strong className="text-slate-800 block text-[11px]">Aménagements :</strong>
                <span className="text-slate-600">{lesson.differentiation.amenagements || 'Non précisé'}</span>
              </div>
            </div>
          )}
        </div>

        {/* 6. Évaluation : Atteinte des attendus */}
        <div className="print-section space-y-2">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1">
            5. Dispositif d'Évaluation Critériée — Évaluation de l'Atteinte des Attendus
          </h2>
          <div className="text-xs space-y-0.5 text-slate-800">
            <p>
              <strong>Type d'évaluation :</strong> {lesson.evaluation?.type} ({lesson.evaluation?.modality})
            </p>
            <p>
              <strong>Consigne de la tâche :</strong> {lesson.evaluation?.taskDescription}
            </p>
            {lesson.evaluation?.feedbackStrategy && (
              <p>
                <strong>Stratégie de feedback :</strong> {lesson.evaluation.feedbackStrategy}
              </p>
            )}
          </div>

          <div className="print-table-container">
            <table className="print-table w-full text-left text-xs border border-slate-300 rounded-lg">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-2 border border-slate-300 w-[24%]">Critère & Attendu lié</th>
                  <th className="p-2 border border-slate-300 w-[28%]">Indicateur observable</th>
                  <th className="p-2 border border-slate-300 w-[12%] bg-rose-50/50">Non acquis</th>
                  <th className="p-2 border border-slate-300 w-[12%] bg-amber-50/50">En voie</th>
                  <th className="p-2 border border-slate-300 w-[12%] bg-emerald-50/50">Acquis (cible)</th>
                  <th className="p-2 border border-slate-300 w-[12%] bg-blue-50/50">Dépassé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(lesson.evaluation?.criteria || []).map(c => (
                  <tr key={c.id}>
                    <td className="p-2 border border-slate-300 text-slate-900 space-y-1">
                      <div className="font-semibold text-slate-950">{c.criterion}</div>
                      {c.attenduText && (
                        <div className="text-[10px] text-indigo-900 italic bg-indigo-50/50 p-1 rounded border border-indigo-100">
                          « {c.attenduText} »
                        </div>
                      )}
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-700 leading-snug">{c.observableIndicator}</td>
                    <td className="p-2 border border-slate-300 text-slate-600 bg-rose-50/20 text-[11px]">{c.nonAcquis}</td>
                    <td className="p-2 border border-slate-300 text-slate-600 bg-amber-50/20 text-[11px]">{c.enVoie}</td>
                    <td className="p-2 border border-slate-300 font-medium text-emerald-900 bg-emerald-50/30 text-[11px]">{c.acquis}</td>
                    <td className="p-2 border border-slate-300 text-blue-900 bg-blue-50/20 text-[11px]">{c.depasse || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature & Visa */}
        <div className="print-signature pt-4 border-t border-slate-300 grid grid-cols-2 gap-6 text-xs text-slate-500">
          <div>
            <span className="block font-semibold text-slate-700">Date de conception :</span>
            <span>{new Date(lesson.createdAt).toLocaleDateString('fr-BE')}</span>
          </div>
          <div className="text-right">
            <span className="block font-semibold text-slate-700">Visa / Signature enseignant :</span>
            <div className="h-8 border-b border-slate-400 border-dashed w-44 ml-auto mt-1"></div>
          </div>
        </div>
      </div>

      {/* Nav CTA (masqué à l'impression) */}
      <div className="no-print flex justify-between pt-4 pb-8">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition cursor-pointer"
        >
          ← Retour à l'Étape 6 (Diagnostic)
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer la Fiche Officielle</span>
        </button>
      </div>
    </div>
  );
};
