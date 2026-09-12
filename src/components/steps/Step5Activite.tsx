import React from 'react';
import { 
  Layers, 
  Clock, 
  Sparkles, 
  Sliders
} from 'lucide-react';
import { LessonPlan, ActivityPhase } from '../../types/lesson';

interface Step5Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5Activite: React.FC<Step5Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const updatePhase = (index: number, updatedField: Partial<ActivityPhase>) => {
    const newPhases = [...lesson.phases];
    newPhases[index] = { ...newPhases[index], ...updatedField };
    onChange({ phases: newPhases });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Layers className="w-8 h-8 text-cyan-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-300 bg-cyan-500/30 px-2.5 py-0.5 rounded-full">
              Étape 5 sur 8 • Scénarisation Didactique
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Scénariser l'Activité</h2>
            <p className="text-cyan-100 text-sm mt-2 max-w-3xl leading-relaxed">
              Découpez votre leçon selon les 3 temps forts de la didactique active : 
              <strong> 1. Amorce / Découverte → 2. Recherche / Expérimentation active → 3. Institutionnalisation / Synthèse</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 5.1 Déroulement chronologique des 3 phases canoniques */}
      <div className="space-y-6">
        <h3 className="text-base font-semibold text-slate-900">
          5.1 Déroulement chronologique des 3 phases canoniques
        </h3>

        {lesson.phases.map((phase, idx) => (
          <div key={phase.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={phase.title}
                  onChange={e => updatePhase(idx, { title: e.target.value })}
                  className="font-bold text-sm text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-cyan-500 outline-none px-1"
                />
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Durée :</span>
                <input
                  type="number"
                  min={5}
                  step={5}
                  value={phase.durationMinutes}
                  onChange={e => updatePhase(idx, { durationMinutes: parseInt(e.target.value) || 0 })}
                  className="w-12 bg-white text-center font-bold text-slate-900 border border-slate-300 rounded px-1 py-0.5 outline-none"
                />
                <span>min</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ce que fait l'élève (actions, manipulations, réflexion) *
                </label>
                <textarea
                  rows={3}
                  value={phase.studentRole}
                  onChange={e => updatePhase(idx, { studentRole: e.target.value })}
                  placeholder="Ex: Observe le dysfonctionnement projeté, formule des hypothèses sur la cause, manipule le matériel..."
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Posture et rôle de l'enseignant (étayage, relance, formalisation) *
                </label>
                <textarea
                  rows={3}
                  value={phase.teacherRole}
                  onChange={e => updatePhase(idx, { teacherRole: e.target.value })}
                  placeholder="Ex: Anime le questionnement déclencheur, distribue les fiches-indices aux îlots bloqués, garantit la sécurité..."
                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 focus:ring-2 focus:ring-cyan-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organisation sociale
                </label>
                <input
                  type="text"
                  value={phase.socialModality}
                  onChange={e => updatePhase(idx, { socialModality: e.target.value })}
                  placeholder="Ex: Collectif, Binômes, Îlots de 4, Individuel"
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Matériel & Supports nécessaires
                </label>
                <input
                  type="text"
                  value={phase.materials}
                  onChange={e => updatePhase(idx, { materials: e.target.value })}
                  placeholder="Ex: Vidéoprojecteur, fiches protocoles, outillage, pièces"
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5.2 Différenciation Pédagogique & Aménagements raisonnables (Renumérotée) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-600" />
          <span>5.2 Différenciation pédagogique & Aménagements raisonnables</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Remédiation (élèves en difficulté)
            </label>
            <textarea
              rows={2}
              value={lesson.differentiation?.remediation || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, remediation: e.target.value }
              })}
              placeholder="Ex: Cartes-indices avec étapes simplifiées..."
              className="w-full text-xs rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dépassement (élèves rapides / experts)
            </label>
            <textarea
              rows={2}
              value={lesson.differentiation?.depassement || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, depassement: e.target.value }
              })}
              placeholder="Ex: Défi additionnel avec contraintes supplémentaires..."
              className="w-full text-xs rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Aménagements spécifiques (DYS / Besoins particuliers)
            </label>
            <textarea
              rows={2}
              value={lesson.differentiation?.amenagements || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, amenagements: e.target.value }
              })}
              placeholder="Ex: Typographie adaptée (OpenDyslexic), binômes solidaires..."
              className="w-full text-xs rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 4
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 6 : Concevoir l'Évaluation</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
