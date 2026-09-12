import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Info,
  ArrowRight
} from 'lucide-react';
import { LessonPlan, PedagogicalObjective, BloomLevel } from '../../types/lesson';
import { BLOOM_TAXONOMY, VAGUE_VERBS_DICTIONARY, checkVagueVerb } from '../../data/bloom_taxonomy';

interface Step2Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Apprentissages: React.FC<Step2Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const [selectedBloomLevel, setSelectedBloomLevel] = useState<BloomLevel>('appliquer');
  
  // Builder form state
  const [actionVerb, setActionVerb] = useState('');
  const [content, setContent] = useState('');
  const [conditions, setConditions] = useState('');
  const [criteria, setCriteria] = useState('');

  // Live detection of vague verbs
  const vagueCheck = checkVagueVerb(actionVerb);

  const handleSelectVerb = (verb: string, level: BloomLevel) => {
    setActionVerb(verb);
    setSelectedBloomLevel(level);
  };

  const constructSentence = (v: string, c: string, cond: string, crit: string) => {
    let sentence = "À la fin de la leçon, l'élève sera capable de ";
    if (v) sentence += v + ' ';
    if (c) sentence += c + ' ';
    if (cond) sentence += '(' + cond + ') ';
    if (crit) sentence += 'de manière à ' + crit;
    return sentence.trim();
  };

  const handleAddObjective = () => {
    if (!actionVerb.trim() || !content.trim()) return;

    const full = constructSentence(actionVerb, content, conditions, criteria);
    const newObj: PedagogicalObjective = {
      id: 'obj_' + Date.now(),
      actionVerb: actionVerb.trim(),
      bloomLevel: selectedBloomLevel,
      content: content.trim(),
      conditions: conditions.trim(),
      criteria: criteria.trim(),
      fullSentence: full,
      isVagueVerb: !!vagueCheck
    };

    onChange({ objectives: [...lesson.objectives, newObj] });

    // Reset inputs
    setActionVerb('');
    setContent('');
    setConditions('');
    setCriteria('');
  };

  const handleRemoveObjective = (id: string) => {
    onChange({ objectives: lesson.objectives.filter(o => o.id !== id) });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Target className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-300 bg-emerald-500/30 px-2.5 py-0.5 rounded-full">
              Étape 2 sur 8
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Définir l'Apprentissage Visé</h2>
            <p className="text-emerald-100 text-sm mt-2 max-w-3xl leading-relaxed">
              « Qu'est-ce que l'élève doit apprendre ? » Formulez des objectifs pédagogiques <strong>opérationnels et mesurables</strong>.
              L'application vous guide selon la formule canonique :
              <span className="block mt-1 font-mono text-xs bg-black/20 p-2 rounded-lg text-emerald-200">
                À la fin de la leçon, l'élève sera capable de + [Verbe d'action observable] + [Contenu] + [Conditions] + [Critères de réussite].
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Alerte Verbes Interdits / Vagues Didactiques */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2">
        <div className="flex items-center space-x-2 text-amber-900 font-semibold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Règle d'or didactique : Proscrire les verbes flous ou non observables</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Les verbes comme <strong>« connaître »</strong>, <strong>« comprendre »</strong>, <strong>« apprendre »</strong>, <strong>« savoir »</strong> ou <strong>« découvrir »</strong> désignent des états mentaux invisibles. 
          Un objectif doit préciser ce que l'élève <em>fait</em> concrètement pour prouver qu'il a compris (expliquer, programmer, schématiser, identifier, classer, etc.).
        </p>
      </div>

      {/* Constructeur d'Objectif */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-base font-semibold text-slate-900 flex items-center justify-between">
          <span>2.1 Rédiger un objectif opérationnel</span>
          <span className="text-xs font-normal text-slate-500">Taxonomie de Bloom révisée</span>
        </h3>

        {/* Sélecteur de niveau de Bloom */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Niveau taxonomique ciblé :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(BLOOM_TAXONOMY) as BloomLevel[]).map(key => {
              const cat = BLOOM_TAXONOMY[key];
              const isSelected = selectedBloomLevel === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedBloomLevel(key)}
                  className={`p-3 rounded-xl text-left border transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900">{cat.name}</span>
                  <span className="text-[10px] text-slate-500 line-clamp-2 mt-1">{cat.verbs.slice(0, 3).join(', ')}...</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 italic mt-1">
            {BLOOM_TAXONOMY[selectedBloomLevel].description}
          </p>
        </div>

        {/* Banque de verbes cliquables pour ce niveau */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Verbes d'action recommandés pour « {BLOOM_TAXONOMY[selectedBloomLevel].name} » :
            </span>
            <span className="text-[11px] text-slate-500">Cliquez pour insérer</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {BLOOM_TAXONOMY[selectedBloomLevel].verbs.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => handleSelectVerb(v, selectedBloomLevel)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                  actionVerb === v
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Formulaire de construction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Verbe d'action observable *
            </label>
            <input
              type="text"
              value={actionVerb}
              onChange={e => setActionVerb(e.target.value)}
              placeholder="Ex: programmer, identifier, comparer, concevoir"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* Vague Verb Live Warning */}
            {vagueCheck && (
              <div className="mt-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1.5 animate-fadeIn">
                <div className="flex items-center space-x-1.5 text-rose-800 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Verbe flou détecté : « {vagueCheck.verb} »</span>
                </div>
                <p className="text-rose-700">{vagueCheck.reason}</p>
                <div className="pt-1">
                  <span className="font-semibold text-slate-800 block mb-1">Alternatives opérationnelles conseillées :</span>
                  <div className="flex flex-wrap gap-1">
                    {vagueCheck.alternatives.flatMap(alt => alt.verbs).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setActionVerb(s)}
                        className="bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 px-2 py-0.5 rounded text-[11px] font-semibold transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contenu / Notions travaillées *
            </label>
            <input
              type="text"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Ex: un algorithme de détection de seuil avec un capteur"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Conditions de réalisation / Ressources disponibles
            </label>
            <input
              type="text"
              value={conditions}
              onChange={e => setConditions(e.target.value)}
              placeholder="Ex: en binôme, à l'aide de la carte micro:bit et d'un guide pas-à-pas"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Critères d'acceptabilité / Niveau de réussite attendu
            </label>
            <input
              type="text"
              value={criteria}
              onChange={e => setCriteria(e.target.value)}
              placeholder="Ex: la LED s'allume automatiquement lorsque la luminosité descend sous 30%"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Prévisualisation dynamique de la phrase */}
        <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
          <span className="text-xs font-bold text-indigo-900 block mb-1">
            Prévisualisation de l'objectif opérationnel :
          </span>
          <p className="text-sm font-medium text-slate-800 italic">
            "{constructSentence(actionVerb || '...', content || '...', conditions, criteria)}"
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddObjective}
          disabled={!actionVerb.trim() || !content.trim()}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-semibold text-sm rounded-xl shadow transition flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter cet objectif à la préparation</span>
        </button>
      </div>

      {/* Liste des objectifs définis */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-slate-900">
          2.2 Objectifs validés pour la leçon ({lesson.objectives.length})
        </h3>

        {lesson.objectives.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            Aucun objectif n'a encore été ajouté. Utilisez le constructeur ci-dessus.
          </p>
        ) : (
          <div className="space-y-3">
            {lesson.objectives.map((obj, idx) => (
              <div
                key={obj.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">#{idx + 1}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${BLOOM_TAXONOMY[obj.bloomLevel].badgeClass}`}>
                      Niveau Bloom : {BLOOM_TAXONOMY[obj.bloomLevel].name}
                    </span>
                    <span className="font-semibold text-slate-700">
                      Verbe : <strong className="text-indigo-600">{obj.actionVerb}</strong>
                    </span>
                  </div>
                  <p className="text-sm text-slate-900 font-medium leading-relaxed">
                    {obj.fullSentence}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveObjective(obj.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 1
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 3 : Éducation aux Médias</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
