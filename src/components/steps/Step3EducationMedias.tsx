import React from 'react';
import { 
  Radio, 
  Check, 
  HelpCircle, 
  ShieldAlert, 
  Sparkles,
  Info
} from 'lucide-react';
import { LessonPlan } from '../../types/lesson';
import { MEDIA_DIMENSIONS, CSEM_COMPETENCES } from '../../data/media_education';

interface Step3Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3EducationMedias: React.FC<Step3Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const currentDims = lesson.mediaEducation.dimensions || [];
  const currentComps = lesson.mediaEducation.competences || [];

  const toggleDimension = (id: 'aux_medias' | 'par_les_medias' | 'avec_les_medias') => {
    let updated: ('aux_medias' | 'par_les_medias' | 'avec_les_medias')[];
    if (currentDims.includes(id)) {
      updated = currentDims.filter(d => d !== id);
    } else {
      updated = [...currentDims, id];
    }
    onChange({
      mediaEducation: {
        ...lesson.mediaEducation,
        dimensions: updated
      }
    });
  };

  const toggleCompetence = (label: string) => {
    let updated: string[];
    if (currentComps.includes(label)) {
      updated = currentComps.filter(c => c !== label);
    } else {
      updated = [...currentComps, label];
    }
    onChange({
      mediaEducation: {
        ...lesson.mediaEducation,
        competences: updated
      }
    });
  };

  const handleJustificationChange = (justification: string) => {
    onChange({
      mediaEducation: {
        ...lesson.mediaEducation,
        justification
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Radio className="w-8 h-8 text-purple-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-300 bg-purple-500/30 px-2.5 py-0.5 rounded-full">
              Étape 3 sur 8 • Dimension Obligatoire
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Éducation aux Médias et au Numérique</h2>
            <p className="text-purple-100 text-sm mt-2 max-w-3xl leading-relaxed">
              En FMTTN (FWB), le numérique n'est pas qu'un outil utilitaire : il constitue un <strong>objet d'apprentissage citoyen et critique</strong>.
              Réfléchissez explicitement aux dimensions médiatiques mobilisées dans votre séquence.
            </p>
          </div>
        </div>
      </div>

      {/* Les 3 Dimensions Canoniques */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            3.1 Sélectionnez la ou les dimensions médiatiques engagées *
          </h3>
          <p className="text-xs text-slate-500">
            Vous pouvez combiner plusieurs dimensions selon les moments de la leçon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MEDIA_DIMENSIONS.map(dim => {
            const isSelected = currentDims.includes(dim.id);
            return (
              <div
                key={dim.id}
                onClick={() => toggleDimension(dim.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? `${dim.bannerColor} border-indigo-600 shadow-md ring-2 ring-indigo-500/50`
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {dim.id === 'aux_medias' ? 'À propos' : dim.id === 'par_les_medias' ? 'Moyen' : 'Création'}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">{dim.title}</h4>
                  <p className="text-xs font-medium text-indigo-700">{dim.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{dim.description}</p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Exemples :</span>
                    <ul className="mt-1 space-y-1">
                      {dim.examples.slice(0, 2).map((ex, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                          <span className="text-indigo-500">•</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compétences CSEM & DigComp travaillées */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            3.2 Compétences médiatiques et numériques spécifiques (CSEM / DigComp)
          </h3>
          <p className="text-xs text-slate-500">
            Cochez les compétences concrètement exercées par les élèves durant l'activité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CSEM_COMPETENCES.map(comp => {
            const isChecked = currentComps.includes(comp.label);
            return (
              <label
                key={comp.id}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-start space-x-3 ${
                  isChecked
                    ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 font-medium'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCompetence(comp.label)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">
                    {comp.category}
                  </span>
                  <span>{comp.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Justification didactique */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          3.3 Justification réflexive de la dimension médiatique *
        </label>
        <p className="text-xs text-slate-500">
          « Quelle compétence médiatique ou numérique est réellement travaillée et comment cette activité permet-elle de développer l'esprit critique ou la créativité de l'élève ? »
        </p>
        <textarea
          rows={3}
          value={lesson.mediaEducation.justification}
          onChange={e => handleJustificationChange(e.target.value)}
          placeholder="Ex: Les élèves découvrent la nature binaire et logique d'un programme informatique. En créant eux-mêmes les règles de décision du jeu, ils démystifient le fonctionnement des algorithmes et comprennent que toute technologie résulte de choix humains codés."
          className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 2
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 4 : Choisir la Méthodologie</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
