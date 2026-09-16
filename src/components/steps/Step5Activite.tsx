import React from 'react';
import { 
  Layers, 
  Clock, 
  Sparkles, 
  Sliders,
  BookmarkCheck,
  Zap,
  HelpCircle,
  Accessibility
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

  const totalDuration = lesson.phases.reduce((acc, p) => acc + (p.durationMinutes || 0), 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Layers className="w-8 h-8 text-cyan-300" />
          </div>
          <div className="flex-1">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-300 bg-cyan-500/30 px-2.5 py-0.5 rounded-full">
              Étape 4 sur 7 - Scénarisation Didactique
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Scénariser l'Activité</h2>
            <p className="text-cyan-100 text-sm mt-1 max-w-3xl leading-relaxed">
              Découpez votre leçon selon les 3 temps forts canoniques de la didactique active FMTTN :
            </p>
          </div>
        </div>

        {/* Adéquation parfaite des titres des phases dans le bandeau bleu */}
        <div className="bg-black/20 rounded-xl p-3 border border-white/10 flex flex-wrap items-center gap-2">
          {lesson.phases.map((phase, idx) => (
            <React.Fragment key={phase.id}>
              <div className="flex items-center space-x-2 bg-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-100">
                <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-white font-medium">
                  {phase.title || `Phase ${idx + 1}`}
                </span>
                <span className="text-cyan-300 font-normal text-[11px]">
                  ({phase.durationMinutes} min)
                </span>
              </div>
              {idx < lesson.phases.length - 1 && (
                <span className="text-cyan-300 font-bold text-xs">→</span>
              )}
            </React.Fragment>
          ))}
          <div className="ml-auto text-[11px] text-cyan-200 font-medium">
            Durée totale : <strong className="text-white">{totalDuration} min</strong>
          </div>
        </div>
      </div>

      {/* 4.1 Déroulement chronologique des 3 phases */}
      <div className="space-y-6">
        <h3 className="text-base font-semibold text-slate-900">
          4.1 Déroulement chronologique des phases d'apprentissage
        </h3>

        {lesson.phases.map((phase, idx) => (
          <div key={phase.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                <span className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex-shrink-0 flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={phase.title}
                  onChange={e => updatePhase(idx, { title: e.target.value })}
                  placeholder="Intitulé complet de la phase..."
                  className="w-full font-bold text-sm sm:text-base text-slate-900 bg-transparent border-b border-dashed border-slate-300 hover:border-slate-400 focus:border-cyan-500 outline-none px-1.5 py-0.5 transition"
                />
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex-shrink-0 self-start sm:self-auto">
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

      {/* 4.2 Différenciation Pédagogique : Remédiation, Consolidation, Dépassement & Aménagements */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-600" />
          <span>4.2 Différenciation pédagogique : Remédiation, Consolidation, Dépassement & Aménagements</span>
        </h3>
        <p className="text-xs text-slate-500">
          Prévoyez les réponses didactiques adaptées à la diversité des rythmes et besoins de vos élèves.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* 1. Remédiation */}
          <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-200/80 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-rose-900 font-bold text-xs">
              <HelpCircle className="w-4 h-4 text-rose-600" />
              <span>1. Remédiation</span>
            </div>
            <p className="text-[11px] text-slate-500">Élèves en difficulté / reprise guidée</p>
            <textarea
              rows={3}
              value={lesson.differentiation?.remediation || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, remediation: e.target.value }
              })}
              placeholder="Ex: Cartes-indices avec étapes simplifiées, étayage pas-à-pas..."
              className="w-full text-xs bg-white rounded-lg border border-rose-200 p-2 focus:ring-2 focus:ring-rose-500 outline-none resize-none"
            />
          </div>

          {/* 2. Consolidation */}
          <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
              <BookmarkCheck className="w-4 h-4 text-amber-600" />
              <span>2. Consolidation</span>
            </div>
            <p className="text-[11px] text-slate-500">Stabilisation des acquis / entraînement</p>
            <textarea
              rows={3}
              value={lesson.differentiation?.consolidation || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, consolidation: e.target.value }
              })}
              placeholder="Ex: Exercice d'entraînement autonome sur une situation similaire pour ancrer le geste ou l'algorithme..."
              className="w-full text-xs bg-white rounded-lg border border-amber-200 p-2 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          {/* 3. Dépassement */}
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-emerald-900 font-bold text-xs">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>3. Dépassement</span>
            </div>
            <p className="text-[11px] text-slate-500">Élèves rapides / défis experts</p>
            <textarea
              rows={3}
              value={lesson.differentiation?.depassement || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, depassement: e.target.value }
              })}
              placeholder="Ex: Défi additionnel avec contraintes supplémentaires, créativité, tutorat..."
              className="w-full text-xs bg-white rounded-lg border border-emerald-200 p-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>

          {/* 4. Aménagements */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-xs">
              <Accessibility className="w-4 h-4 text-blue-600" />
              <span>4. Aménagements</span>
            </div>
            <p className="text-[11px] text-slate-500">Besoins spécifiques / DYS</p>
            <textarea
              rows={3}
              value={lesson.differentiation?.amenagements || ''}
              onChange={e => onChange({
                differentiation: { ...lesson.differentiation, amenagements: e.target.value }
              })}
              placeholder="Ex: Typographie adaptée (OpenDyslexic), binômes solidaires, temps majoré..."
              className="w-full text-xs bg-white rounded-lg border border-blue-200 p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition cursor-pointer"
        >
          ← Retour à l'Étape 3 : Méthodologie
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2 cursor-pointer"
        >
          <span>Passer à l'Étape 5 : Concevoir l'Évaluation</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
