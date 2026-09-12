import React from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  AlertCircle, 
  HelpCircle,
  Award
} from 'lucide-react';
import { LessonPlan, EvaluationCriterion } from '../../types/lesson';

interface Step6Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step6Evaluation: React.FC<Step6Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const evalConfig = lesson.evaluation;

  const updateEvaluation = (fields: Partial<typeof evalConfig>) => {
    onChange({
      evaluation: {
        ...evalConfig,
        ...fields
      }
    });
  };

  const addCriterion = () => {
    const newCrit: EvaluationCriterion = {
      id: 'crit_' + Date.now(),
      criterion: '',
      observableIndicator: '',
      nonAcquis: '',
      enVoie: '',
      acquis: '',
      depasse: ''
    };
    updateEvaluation({ criteria: [...(evalConfig.criteria || []), newCrit] });
  };

  const removeCriterion = (id: string) => {
    updateEvaluation({ criteria: (evalConfig.criteria || []).filter(c => c.id !== id) });
  };

  const updateCriterion = (id: string, updated: Partial<EvaluationCriterion>) => {
    updateEvaluation({
      criteria: (evalConfig.criteria || []).map(c => c.id === id ? { ...c, ...updated } : c)
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-pink-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <CheckSquare className="w-8 h-8 text-rose-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-rose-300 bg-rose-500/30 px-2.5 py-0.5 rounded-full">
              Étape 6 sur 8 • Métrologie de l'Évaluation
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Évaluer l'Atteinte des Objectifs</h2>
            <p className="text-rose-100 text-sm mt-2 max-w-3xl leading-relaxed">
              En alignement constructif (triple concordance), <strong>l'évaluation doit mesurer exactement l'action définie dans l'objectif</strong>.
              Privilégiez une évaluation critériée avec des indicateurs de réussite directement observables.
            </p>
          </div>
        </div>
      </div>

      {/* Paramètres de l'évaluation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-900">
          6.1 Modalité et tâche d'évaluation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fonction dominante de l'évaluation *
            </label>
            <select
              value={evalConfig.type}
              onChange={e => updateEvaluation({ type: e.target.value as any })}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 bg-white outline-none font-medium"
            >
              <option value="formative">Évaluation formative (régulation continue sans note sommative)</option>
              <option value="diagnostique">Évaluation diagnostique (vérification des prérequis en amont)</option>
              <option value="sommatrice">Évaluation sommatrice (bilan certificatif des acquis)</option>
              <option value="combinée">Évaluation combinée (auto-évaluation formative + visa enseignant)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dispositif d'évaluation *
            </label>
            <select
              value={evalConfig.modality}
              onChange={e => updateEvaluation({ modality: e.target.value as any })}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 bg-white outline-none font-medium"
            >
              <option value="observation_directe">Observation directe de la manipulation en situation</option>
              <option value="evaluation_pairs">Évaluation croisée par les pairs (test mutuel)</option>
              <option value="auto_evaluation">Auto-évaluation guidée par une grille de critères</option>
              <option value="production_ecrite_numerique">Analyse de la production numérique finale (fichier/code)</option>
              <option value="defense_orale">Défense orale rapide / démonstration collective</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description concrète de la tâche demandée à l'élève pour l'évaluation *
            </label>
            <textarea
              rows={2}
              value={evalConfig.taskDescription}
              onChange={e => updateEvaluation({ taskDescription: e.target.value })}
              placeholder="Ex: L'élève teste son script devant un pair avec 3 cas d'usage prédéfinis et remplit la grille critériée..."
              className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grille critériée analytique (Rubric) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-600" />
              <span>6.2 Grille critériée analytique (Rubric avec indicateurs observables)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Définissez des critères qualitatifs et leurs indicateurs pour chaque niveau d'acquisition.
            </p>
          </div>

          <button
            type="button"
            onClick={addCriterion}
            className="flex items-center space-x-1 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un critère</span>
          </button>
        </div>

        {evalConfig.criteria.map((crit, idx) => (
          <div key={crit.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Critère #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => removeCriterion(crit.id)}
                className="text-slate-400 hover:text-rose-600 p-1 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Intitulé du critère *
                </label>
                <input
                  type="text"
                  value={crit.criterion}
                  onChange={e => updateCriterion(crit.id, { criterion: e.target.value })}
                  placeholder="Ex: Fonctionnalité logique du programme"
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Indicateur de réussite observable *
                </label>
                <input
                  type="text"
                  value={crit.observableIndicator}
                  onChange={e => updateCriterion(crit.id, { observableIndicator: e.target.value })}
                  placeholder="Ex: Le lutin s'oriente vers le bon bac selon la couleur détectée"
                  className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Paliers d'acquisition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="block text-[10px] uppercase font-bold text-rose-800 mb-1">
                  Non acquis
                </span>
                <input
                  type="text"
                  value={crit.nonAcquis}
                  onChange={e => updateCriterion(crit.id, { nonAcquis: e.target.value })}
                  placeholder="Ex: Ne réagit pas..."
                  className="w-full text-xs bg-white rounded border border-rose-200 px-2 py-1 outline-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
                <span className="block text-[10px] uppercase font-bold text-amber-800 mb-1">
                  En voie d'acquisition
                </span>
                <input
                  type="text"
                  value={crit.enVoie}
                  onChange={e => updateCriterion(crit.id, { enVoie: e.target.value })}
                  placeholder="Ex: Fonctionne partiellement..."
                  className="w-full text-xs bg-white rounded border border-amber-200 px-2 py-1 outline-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <span className="block text-[10px] uppercase font-bold text-emerald-800 mb-1">
                  Acquis (cible)
                </span>
                <input
                  type="text"
                  value={crit.acquis}
                  onChange={e => updateCriterion(crit.id, { acquis: e.target.value })}
                  placeholder="Ex: Fonctionne à 100%..."
                  className="w-full text-xs bg-white rounded border border-emerald-200 px-2 py-1 outline-none font-semibold text-emerald-900"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rétroaction / Feedback */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          6.3 Stratégie de feedback à l'élève
        </label>
        <p className="text-xs text-slate-500">
          Comment l'élève sait-il s'il a réussi ? Quel type de retour lui est fourni pour progresser ?
        </p>
        <textarea
          rows={2}
          value={evalConfig.feedbackStrategy}
          onChange={e => updateEvaluation({ feedbackStrategy: e.target.value })}
          placeholder="Ex: Débriefing immédiat entre pairs avec fiche critériée + visa de conformité de l'enseignant avant validation finale."
          className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-rose-500 outline-none"
        />
      </div>

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 5
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 7 : Diagnostic & Vérification</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
