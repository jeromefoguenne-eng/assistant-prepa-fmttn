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
import { BLOOM_TAXONOMY } from '../../data/bloom_taxonomy';
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
    md += `## 1. ANCRAGE DANS LE RÉFÉRENTIEL FMTTN\n`;
    lesson.selectedItems.forEach(item => {
      md += `- **[${item.type}]** ${item.volet} — ${item.champ} : *« ${item.attendu} »*\n`;
    });
    md += `\n**Justification :** ${lesson.referentielRationale}\n\n`;
    md += `## 2. OBJECTIFS OPÉRATIONNELS D'APPRENTISSAGE\n`;
    lesson.objectives.forEach(obj => {
      md += `- ${obj.fullSentence} *(Niveau Bloom : ${BLOOM_TAXONOMY[obj.bloomLevel]?.name})*\n`;
    });
    md += `\n## 3. ÉDUCATION AUX MÉDIAS\n`;
    md += `- Dimensions : ${lesson.mediaEducation.dimensions.join(', ')}\n`;
    md += `- Compétences CSEM : ${lesson.mediaEducation.competences.join(' ; ')}\n`;
    md += `- Justification : ${lesson.mediaEducation.justification}\n\n`;
    md += `## 4. MÉTHODOLOGIE ACTIVE\n`;
    md += `- Démarche : ${methodologyName}\n`;
    md += `- Organisation sociale : ${lesson.methodology.groupingStrategy}\n`;
    md += `- Rationale : ${lesson.methodology.rationale}\n\n`;
    md += `## 5. SCÉNARISATION DIDACTIQUE (PHASES)\n`;
    lesson.phases.forEach((p) => {
      md += `### ${p.title} (${p.durationMinutes} min)\n`;
      md += `- **Élève :** ${p.studentRole}\n`;
      md += `- **Enseignant :** ${p.teacherRole}\n`;
      md += `- **Modalité :** ${p.socialModality} | **Matériel :** ${p.materials}\n\n`;
    });
    md += `## 6. ÉVALUATION CRITÉRIÉE\n`;
    md += `- **Dispositif :** ${lesson.evaluation.type} (${lesson.evaluation.modality})\n`;
    md += `- **Consigne :** ${lesson.evaluation.taskDescription}\n`;
    lesson.evaluation.criteria.forEach((c, i) => {
      md += `  - **Critère ${i+1} :** ${c.criterion} — Indicateur : ${c.observableIndicator}\n`;
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
    navigator.clipboard.writeText(`Préparation FMTTN : ${lesson.title} (${lesson.grade}) - Objectif : ${lesson.objectives[0]?.fullSentence || ''}`);
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
          alert("Fichier JSON invalide pour FMTTN Lesson Designer.");
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

      {/* Fiche Officielle Formattée (Print-ready, A4 optimisé sans chevauchement) */}
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

        {/* 1. Ancrage Référentiel */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-indigo-200 pb-1">
            1. Ancrage dans le Référentiel Officiel FMTTN
          </h2>
          <div className="space-y-1 text-xs">
            {lesson.selectedItems.map((item) => (
              <div key={item.id} className="print-item-box p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-indigo-700">[{item.type}]</span> {item.volet} • <strong>{item.champ}</strong> — {item.intitule} :
                <span className="italic text-slate-800 ml-1">« {item.attendu} »</span>
              </div>
            ))}
            <p className="text-xs text-slate-600 pt-0.5">
              <strong>Justification de l'ancrage :</strong> {lesson.referentielRationale || 'Non renseignée.'}
            </p>
          </div>
        </div>

        {/* 2. Apprentissage & Objectifs */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1">
            2. Objectif(s) Opérationnel(s) d'Apprentissage
          </h2>
          <div className="space-y-1 text-xs">
            {lesson.objectives.map((obj, i) => (
              <div key={obj.id} className="print-item-box p-2 bg-emerald-50/50 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 mr-2">Objectif #{i+1} [{BLOOM_TAXONOMY[obj.bloomLevel]?.name}] :</span>
                <span className="font-medium text-slate-900">{obj.fullSentence}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Éducation aux Médias */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-purple-900 border-b border-purple-200 pb-1">
            3. Éducation aux Médias et au Numérique (CSEM & FWB)
          </h2>
          <div className="text-xs space-y-1 text-slate-800">
            <div>
              <strong>Dimensions médiatiques :</strong>{' '}
              {lesson.mediaEducation.dimensions.map(d => (
                <span key={d} className="print-badge inline-block mr-1.5 px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">
                  {d === 'aux_medias' ? 'Éducation AUX médias' : d === 'par_les_medias' ? 'Éducation PAR les médias' : 'Éducation AVEC les médias'}
                </span>
              ))}
            </div>
            {lesson.mediaEducation.competences.length > 0 && (
              <div>
                <strong>Compétences CSEM :</strong> {lesson.mediaEducation.competences.join(' • ')}
              </div>
            )}
            <p className="text-slate-600 italic">
              <strong>Justification réflexive :</strong> {lesson.mediaEducation.justification}
            </p>
          </div>
        </div>

        {/* 4. Méthodologie */}
        <div className="print-section space-y-1.5">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-amber-200 pb-1">
            4. Démarche Pédagogique Active & Organisation
          </h2>
          <div className="text-xs space-y-0.5 text-slate-800">
            <p>
              <strong>Méthodologie retenue :</strong> {methodologyName}
              {activeMethodology?.tagline && <span className="italic text-slate-600"> — {activeMethodology.tagline}</span>}
            </p>
            <p>
              <strong>Organisation sociale :</strong> {lesson.methodology.groupingStrategy}
            </p>
            <p>
              <strong>Justification méthodologique :</strong> {lesson.methodology.rationale}
            </p>
          </div>
        </div>

        {/* 5. Déroulement Chronologique (Phases) */}
        <div className="print-section space-y-2">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-cyan-900 border-b border-cyan-200 pb-1">
            5. Scénario Didactique Détaillé
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
          {(lesson.differentiation?.remediation || lesson.differentiation?.depassement) && (
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <div>
                <strong className="text-slate-800 block text-[11px]">Remédiation :</strong>
                <span className="text-slate-600">{lesson.differentiation.remediation}</span>
              </div>
              <div>
                <strong className="text-slate-800 block text-[11px]">Dépassement :</strong>
                <span className="text-slate-600">{lesson.differentiation.depassement}</span>
              </div>
            </div>
          )}
        </div>

        {/* 6. Évaluation */}
        <div className="print-section space-y-2">
          <h2 className="print-section-title text-xs font-bold uppercase tracking-wider text-rose-900 border-b border-rose-200 pb-1">
            6. Dispositif d'Évaluation Critériée & Indicateurs
          </h2>
          <div className="text-xs space-y-0.5 text-slate-800">
            <p>
              <strong>Type d'évaluation :</strong> {lesson.evaluation.type} ({lesson.evaluation.modality})
            </p>
            <p>
              <strong>Consigne de la tâche :</strong> {lesson.evaluation.taskDescription}
            </p>
            {lesson.evaluation.feedbackStrategy && (
              <p>
                <strong>Stratégie de feedback :</strong> {lesson.evaluation.feedbackStrategy}
              </p>
            )}
          </div>

          <div className="print-table-container">
            <table className="print-table w-full text-left text-xs border border-slate-300 rounded-lg">
              <thead className="bg-slate-100 text-slate-800 font-bold">
                <tr>
                  <th className="p-2 border border-slate-300 w-[24%]">Critère</th>
                  <th className="p-2 border border-slate-300 w-[34%]">Indicateur observable</th>
                  <th className="p-2 border border-slate-300 w-[14%] bg-rose-50/50">Non acquis</th>
                  <th className="p-2 border border-slate-300 w-[14%] bg-amber-50/50">En voie</th>
                  <th className="p-2 border border-slate-300 w-[14%] bg-emerald-50/50">Acquis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lesson.evaluation.criteria.map(c => (
                  <tr key={c.id}>
                    <td className="p-2 border border-slate-300 font-semibold text-slate-900">{c.criterion}</td>
                    <td className="p-2 border border-slate-300 text-slate-700">{c.observableIndicator}</td>
                    <td className="p-2 border border-slate-300 text-slate-600 bg-rose-50/20">{c.nonAcquis}</td>
                    <td className="p-2 border border-slate-300 text-slate-600 bg-amber-50/20">{c.enVoie}</td>
                    <td className="p-2 border border-slate-300 font-medium text-emerald-900 bg-emerald-50/30">{c.acquis}</td>
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
          ← Retour à l'Étape 7
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
