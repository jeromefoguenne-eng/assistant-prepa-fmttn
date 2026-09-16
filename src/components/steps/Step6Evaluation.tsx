import React from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Award,
  Sparkles,
  Link,
  GraduationCap,
  UserCheck,
  ArrowLeft
} from 'lucide-react';
import { LessonPlan, EvaluationCriterion, ReferentielItem } from '../../types/lesson';

interface Step6Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step6Evaluation: React.FC<Step6Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const evalConfig = lesson.evaluation;
  const selectedItems = lesson.selectedItems || [];

  const updateEvaluation = (fields: Partial<typeof evalConfig>) => {
    onChange({
      evaluation: {
        ...evalConfig,
        ...fields
      }
    });
  };

  // Ajout d'un critère vierge ou pré-lié à un attendu (bulles vides par défaut)
  const addCriterionForAttendu = (item?: ReferentielItem) => {
    const newCrit: EvaluationCriterion = {
      id: 'crit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      attenduId: item?.id || '',
      attenduText: item?.attendu || '',
      criterion: item ? `Maîtrise : ${item.intitule}` : '',
      observableIndicator: '',
      nonAcquis: '',
      enVoie: '',
      acquis: '',
      depasse: ''
    };
    updateEvaluation({ criteria: [...(evalConfig.criteria || []), newCrit] });
  };

  // Génération automatique des critères pour tous les attendus sélectionnés
  const handleAutoGenerateCriteria = () => {
    if (selectedItems.length === 0) return;
    
    const newCriteria: EvaluationCriterion[] = selectedItems.map((item, idx) => ({
      id: 'crit_auto_' + Date.now() + '_' + idx,
      attenduId: item.id,
      attenduText: item.attendu,
      criterion: `Évaluation de l'attendu : ${item.intitule}`,
      observableIndicator: `L'élève est capable en situation de : ${item.attendu.toLowerCase()}`,
      nonAcquis: "Non acquis : L'attendu n'est pas démontré en autonomie.",
      enVoie: "En voie : L'attendu est amorcé ou réalisé partiellement avec un guidage.",
      acquis: "Acquis (cible) : L'attendu est pleinement maîtrisé et validé.",
      depasse: "Dépassé : L'élève dépasse l'attendu par sa créativité, son autonomie ou son explication."
    }));

    // Fusion avec confirmation ou remplacement
    const existing = evalConfig.criteria || [];
    if (existing.length > 0) {
      if (window.confirm("Voulez-vous ajouter ces critères dérivés des attendus à vos critères existants ?")) {
        updateEvaluation({ criteria: [...existing, ...newCriteria] });
      }
    } else {
      updateEvaluation({ criteria: newCriteria });
    }
  };

  const removeCriterion = (id: string) => {
    updateEvaluation({ criteria: (evalConfig.criteria || []).filter(c => c.id !== id) });
  };

  const updateCriterion = (id: string, updated: Partial<EvaluationCriterion>) => {
    updateEvaluation({
      criteria: (evalConfig.criteria || []).map(c => {
        if (c.id === id) {
          // Si on modifie l'attendu lié, synchroniser attenduText
          if (updated.attenduId !== undefined) {
            const foundItem = selectedItems.find(it => it.id === updated.attenduId);
            return {
              ...c,
              ...updated,
              attenduText: foundItem ? foundItem.attendu : ''
            };
          }
          return { ...c, ...updated };
        }
        return c;
      })
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
              Étape 5 sur 7 • Triple Concordance & Métrologie
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">
              Évaluer l'Atteinte des Attendus du Référentiel
            </h2>
            <p className="text-rose-100 text-sm mt-2 max-w-3xl leading-relaxed">
              En alignement constructif (triple concordance), <strong>l'évaluation doit mesurer directement les attendus sélectionnés à la page 1</strong>.
              Chaque critère est dérivé des attendus officiels pour observer concrètement le degré d'acquisition de l'élève.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1 : RAPPEL DES ATTENDUS SÉLECTIONNÉS (PAGE 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>5.1 Attendus sélectionnés à la Page 1 ({selectedItems.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ces attendus constituent les cibles officielles à évaluer dans votre leçon. Définissez vos critères directement à partir d'eux.
            </p>
          </div>

          {selectedItems.length > 0 && (
            <button
              type="button"
              onClick={handleAutoGenerateCriteria}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold transition"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Générer les critères pour tous les attendus</span>
            </button>
          )}
        </div>

        {selectedItems.length === 0 ? (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold">Aucun attendu du référentiel n'a été sélectionné à la page 1.</p>
              <p>
                Pour garantir la triple concordance pédagogique, il est vivement recommandé de sélectionner au moins un attendu officiel avant de concevoir l'évaluation.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {selectedItems.map((item, idx) => {
              const criteriaCount = (evalConfig.criteria || []).filter(c => c.attenduId === item.id).length;
              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px]">
                        Attendu #{idx + 1} • {item.type}
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {item.champ} ({item.annee})
                      </span>
                      <span className="text-[11px] font-semibold text-slate-800">
                        Contenu : {item.intitule}
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-slate-200/80 text-slate-800 italic">
                      <span className="font-semibold not-italic text-indigo-900 mr-1">Attendu élève :</span>
                      « {item.attendu} »
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[11px] font-medium px-2 py-1 rounded-md ${
                      criteriaCount > 0 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {criteriaCount > 0 ? `${criteriaCount} critère(s) lié(s)` : '0 critère lié'}
                    </span>
                    <button
                      type="button"
                      onClick={() => addCriterionForAttendu(item)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-700 border border-slate-300 hover:border-rose-200 rounded-lg text-xs font-semibold transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Définir un critère</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2 : DISPOSITIF ET MODALITÉ D'ÉVALUATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-900">
          5.2 Modalité et tâche d'évaluation
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
              Description concrète de la tâche demandée à l'élève pour évaluer l'atteinte des attendus *
            </label>
            <textarea
              rows={2}
              value={evalConfig.taskDescription}
              onChange={e => updateEvaluation({ taskDescription: e.target.value })}
              placeholder="Ex: L'élève teste son programme Scratch devant son binôme à l'aide de 3 cas de tri sélectif et vérifie la conformité de l'algorithme sur sa grille critériée..."
              className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 : GRILLE CRITÉRIÉE - ÉVALUATION DE L'ATTEINTE DES ATTENDUS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-600" />
              <span>5.3 Grille critériée — Évaluation de l'atteinte des attendus ({evalConfig.criteria.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Chaque critère permet d'évaluer concrètement le niveau d'atteinte de l'attendu à travers des indicateurs observables.
            </p>
          </div>

          <button
            type="button"
            onClick={() => addCriterionForAttendu()}
            className="flex items-center space-x-1 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un critère libre</span>
          </button>
        </div>

        {evalConfig.criteria.length === 0 ? (
          <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-3">
            <p className="text-slate-500 text-xs">
              Aucun critère d'évaluation défini. Utilisez les boutons ci-dessus pour ajouter des critères dérivés de vos attendus.
            </p>
            {selectedItems.length > 0 && (
              <button
                type="button"
                onClick={handleAutoGenerateCriteria}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
              >
                Générer les critères à partir des attendus sélectionnés
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {evalConfig.criteria.map((crit, idx) => (
              <div key={crit.id} className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                      Critère #{idx + 1}
                    </span>

                    {/* Sélecteur de liaison avec un attendu sélectionné */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <Link className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-slate-600 font-medium">Attendu relié :</span>
                      <select
                        value={crit.attenduId || ''}
                        onChange={e => updateCriterion(crit.id, { attenduId: e.target.value })}
                        className="text-xs bg-white rounded-md border border-slate-300 px-2 py-1 outline-none text-slate-800 font-medium max-w-xs truncate"
                      >
                        <option value="">-- Critère transversal / Sans lien direct --</option>
                        {selectedItems.map((item, itIdx) => (
                          <option key={item.id} value={item.id}>
                            #{itIdx + 1} [{item.type}] {item.intitule} : {item.attendu.substring(0, 45)}...
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCriterion(crit.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition self-end sm:self-auto"
                    title="Supprimer ce critère"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Rappel visuel de l'attendu relié */}
                {crit.attenduText && (
                  <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100 text-xs text-slate-800 flex items-start gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-indigo-900">Attendu élève évalué par ce critère : </span>
                      <span className="italic">« {crit.attenduText} »</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Intitulé du critère d'évaluation *
                    </label>
                    <input
                      type="text"
                      value={crit.criterion}
                      onChange={e => updateCriterion(crit.id, { criterion: e.target.value })}
                      placeholder="Ex: Exactitude de l'algorithme conditionnel"
                      className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Indicateur observable de réussite *
                    </label>
                    <input
                      type="text"
                      value={crit.observableIndicator}
                      onChange={e => updateCriterion(crit.id, { observableIndicator: e.target.value })}
                      placeholder="Ex: Le lutin trie les 3 types d'objets sans aucune erreur"
                      className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                    />
                  </div>
                </div>

                {/* Échelle d'évaluation de l'atteinte de l'attendu */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                    <span>Degrés d'atteinte de l'attendu (Échelle analytique FWB) :</span>
                    <span className="text-[10px] text-slate-500 font-normal">Indiquez ce qui caractérise chaque palier</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/80">
                      <span className="block text-[10px] uppercase font-bold text-rose-800 mb-1">
                        1. Non acquis
                      </span>
                      <textarea
                        rows={2}
                        value={crit.nonAcquis}
                        onChange={e => updateCriterion(crit.id, { nonAcquis: e.target.value })}
                        placeholder="L'attendu n'est pas rencontré..."
                        className="w-full text-xs bg-white rounded border border-rose-200 p-1.5 outline-none resize-none text-slate-700"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                      <span className="block text-[10px] uppercase font-bold text-amber-800 mb-1">
                        2. En voie d'acquisition
                      </span>
                      <textarea
                        rows={2}
                        value={crit.enVoie}
                        onChange={e => updateCriterion(crit.id, { enVoie: e.target.value })}
                        placeholder="Partiellement atteint avec aide..."
                        className="w-full text-xs bg-white rounded border border-amber-200 p-1.5 outline-none resize-none text-slate-700"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                      <span className="block text-[10px] uppercase font-bold text-emerald-800 mb-1">
                        3. Acquis (Seuil de maîtrise)
                      </span>
                      <textarea
                        rows={2}
                        value={crit.acquis}
                        onChange={e => updateCriterion(crit.id, { acquis: e.target.value })}
                        placeholder="Attendu pleinement atteint en autonomie..."
                        className="w-full text-xs bg-white rounded border border-emerald-200 p-1.5 outline-none resize-none font-medium text-emerald-950"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
                      <span className="block text-[10px] uppercase font-bold text-blue-800 mb-1">
                        4. Dépassé (Expert / Transfert)
                      </span>
                      <textarea
                        rows={2}
                        value={crit.depasse || ''}
                        onChange={e => updateCriterion(crit.id, { depasse: e.target.value })}
                        placeholder="Optimisation, créativité, transfert..."
                        className="w-full text-xs bg-white rounded border border-blue-200 p-1.5 outline-none resize-none text-blue-950"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 4 : RÉTROACTION / FEEDBACK FORMATIF */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          5.4 Stratégie de feedback à l'élève
        </label>
        <p className="text-xs text-slate-500">
          Comment l'élève reçoit-il un retour sur l'atteinte des attendus ? Quel dispositif de régulation ou d'auto-positionnement est mis en œuvre ?
        </p>
        <textarea
          rows={2}
          value={evalConfig.feedbackStrategy}
          onChange={e => updateEvaluation({ feedbackStrategy: e.target.value })}
          placeholder="Ex: Débriefing immédiat entre pairs avec la grille critériée + rétroaction formative de l'enseignant pour identifier les ajustements nécessaires avant la clôture de la leçon."
          className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-rose-500 outline-none"
        />
      </div>

      {/* Navigation CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 4 : Activité
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 6 : Diagnostic & Vérification</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
