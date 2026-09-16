import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Check, 
  Trash2, 
  AlertCircle,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import { LessonPlan, GradeLevel, ReferentielItem } from '../../types/lesson';
import rawReferentiel from '../../data/fmttn_referentiel.json';

interface Step1Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
}

const GRADES: { id: GradeLevel; label: string; cycle: string }[] = [
  { id: 'P1', label: 'P1 (1re primaire)', cycle: 'Cycle 2' },
  { id: 'P2', label: 'P2 (2e primaire)', cycle: 'Cycle 2' },
  { id: 'P3', label: 'P3 (3e primaire)', cycle: 'Cycle 3' },
  { id: 'P4', label: 'P4 (4e primaire)', cycle: 'Cycle 3' },
  { id: 'P5', label: 'P5 (5e primaire)', cycle: 'Cycle 4 Fond.' },
  { id: 'P6', label: 'P6 (6e primaire)', cycle: 'Cycle 4 Fond.' },
  { id: 'S1', label: 'S1 (1re secondaire)', cycle: 'Cycle 4 Sec.' },
  { id: 'S2', label: 'S2 (2e secondaire)', cycle: 'Cycle 4 Sec.' },
  { id: 'S3', label: 'S3 (3e secondaire)', cycle: 'Cycle 4 Sec.' },
];

export const Step1Referentiel: React.FC<Step1Props> = ({ lesson, onChange, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoletFilter, setSelectedVoletFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');

  const allItems: ReferentielItem[] = (rawReferentiel.items || []) as ReferentielItem[];

  // Filter items based on current grade and user filters
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // Must match selected grade
      if (item.annee !== lesson.grade) return false;

      // Volet filter
      if (selectedVoletFilter !== 'all') {
        if (selectedVoletFilter === 'volet1' && !item.volet.includes('Volet 1')) return false;
        if (selectedVoletFilter === 'volet2' && !item.volet.includes('Volet 2')) return false;
        if (selectedVoletFilter === 'communs' && !item.volet.includes('communs')) return false;
      }

      // Type filter
      if (selectedTypeFilter !== 'all' && item.type !== selectedTypeFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = (item.intitule || '').toLowerCase().includes(q);
        const matchAttendu = (item.attendu || '').toLowerCase().includes(q);
        const matchChamp = (item.champ || '').toLowerCase().includes(q);
        return matchTitle || matchAttendu || matchChamp;
      }

      return true;
    });
  }, [allItems, lesson.grade, selectedVoletFilter, selectedTypeFilter, searchTerm]);

  const toggleItem = (item: ReferentielItem) => {
    const isAlready = lesson.selectedItems.some(x => x.id === item.id);
    let updated: ReferentielItem[];
    if (isAlready) {
      updated = lesson.selectedItems.filter(x => x.id !== item.id);
    } else {
      updated = [...lesson.selectedItems, item];
    }
    onChange({ selectedItems: updated });
  };

  const removeItem = (id: string) => {
    onChange({ selectedItems: lesson.selectedItems.filter(x => x.id !== id) });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <BookOpen className="w-8 h-8 text-blue-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-300 bg-blue-500/30 px-2.5 py-0.5 rounded-full">
              Étape 1 sur 7
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">
              Ancrage dans le Référentiel FMTTN
            </h2>
            <p className="text-blue-100 text-sm mt-2 max-w-3xl leading-relaxed">
              Toute préparation pédagogique rigoureuse s'articule autour de la double structure officielle de la Fédération Wallonie-Bruxelles :
              les <strong>Contenus (savoirs, savoir-faire, compétences (enseignant))</strong> et les <strong>Attendus (élèves)</strong>.
              L'application intègre l'intégralité du référentiel officiel du Tronc Commun (449 items de P1 à S3).
            </p>
          </div>
        </div>
      </div>

      {/* Cadre de la leçon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <span>1.1 Paramètres généraux de la leçon</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Titre de la leçon *
            </label>
            <input
              type="text"
              value={lesson.title}
              onChange={e => onChange({ title: e.target.value })}
              placeholder="Titre de la leçon..."
              className="w-full text-sm rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Année / Niveau *
            </label>
            <select
              value={lesson.grade}
              onChange={e => onChange({ grade: e.target.value as GradeLevel })}
              className="w-full text-sm rounded-lg border-slate-300 border px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
            >
              {GRADES.map(g => (
                <option key={g.id} value={g.id}>
                  {g.label} — {g.cycle}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Durée estimée *
            </label>
            <input
              type="text"
              value={lesson.duration}
              onChange={e => onChange({ duration: e.target.value })}
              placeholder="Durée de la séance..."
              className="w-full text-sm rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Public cible / Composition de la classe
            </label>
            <input
              type="text"
              value={lesson.targetAudience}
              onChange={e => onChange({ targetAudience: e.target.value })}
              placeholder="Composition de la classe et caractéristiques du public..."
              className="w-full text-sm rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Prérequis indispensables
            </label>
            <input
              type="text"
              value={lesson.prerequisites}
              onChange={e => onChange({ prerequisites: e.target.value })}
              placeholder="Prérequis indispensables pour cette séquence..."
              className="w-full text-sm rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Éléments sélectionnés : Contenus et Attendus */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              1.2 Contenus (savoirs, savoir-faire, compétences (enseignant)) et attendus (élèves) sélectionnés ({lesson.selectedItems.length})
            </h3>
            <p className="text-xs text-slate-500">
              Ces éléments officiels constitueront la base d'ancrage de vos objectifs d'apprentissage et de votre grille d'évaluation à l'étape 6.
            </p>
          </div>
        </div>

        {lesson.selectedItems.length === 0 ? (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Aucun contenu ni attendu sélectionné pour l'instant.</p>
              <p className="mt-0.5">
                Utilisez le moteur de recherche et les filtres ci-dessous pour choisir au moins un élément du référentiel officiel pour le niveau <strong>{lesson.grade}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {lesson.selectedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4 text-xs"
              >
                <div className="space-y-2 flex-1">
                  {/* Badges d'identification */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      item.type === 'Compétence'
                        ? 'bg-purple-100 text-purple-800'
                        : item.type === 'Savoir-faire'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.type}
                    </span>
                    <span className="font-medium text-slate-600">
                      {item.volet} • <strong className="text-slate-800">{item.champ}</strong>
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {item.annee}
                    </span>
                  </div>

                  {/* Répartition bipartite : Contenu Enseignant & Attendu Élève */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Colonne Contenu Enseignant */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 uppercase tracking-wide">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Contenu ({item.type.toLowerCase()} - enseignant)</span>
                      </div>
                      <div className="font-semibold text-slate-900 text-xs leading-snug">
                        {item.intitule}
                      </div>
                    </div>

                    {/* Colonne Attendu Élève */}
                    <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 uppercase tracking-wide">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Attendu (élève)</span>
                      </div>
                      <p className="text-slate-800 italic text-xs leading-snug">
                        « {item.attendu} »
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-200 transition mt-1"
                  title="Retirer cet élément"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explorateur du Référentiel FWB */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span>1.3 Référentiel officiel FMTTN pour {lesson.grade} — Contenus (savoirs, savoir-faire, compétences (enseignant)) et attendus (élèves)</span>
              <span className="text-xs font-normal text-slate-500">
                ({filteredItems.length} résultat{filteredItems.length > 1 ? 's' : ''})
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Recherche directe par mot-clé dans les contenus et attendus officiels de la FWB (Tronc commun).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Rechercher (ex: algorithme, boucle, matériaux...)"
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none w-56 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 text-xs text-slate-500 mr-2">
            <Filter className="w-3.5 h-3.5" /> Volet :
          </div>
          <button
            type="button"
            onClick={() => setSelectedVoletFilter('all')}
            className={`px-2.5 py-1 text-xs rounded-lg transition ${
              selectedVoletFilter === 'all'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous les volets
          </button>
          <button
            type="button"
            onClick={() => setSelectedVoletFilter('volet1')}
            className={`px-2.5 py-1 text-xs rounded-lg transition border ${
              selectedVoletFilter === 'volet1'
                ? 'bg-[#0084c0] text-white border-[#0084c0] font-semibold shadow-xs'
                : 'bg-sky-50 text-[#006a9b] border-sky-200 hover:bg-sky-100'
            }`}
            title="Volet 1 : Formation manuelle, technique et technologique (Code couleur officiel FWB : Bleu #0084C0)"
          >
            Volet 1 : Technique & Manuel
          </button>
          <button
            type="button"
            onClick={() => setSelectedVoletFilter('volet2')}
            className={`px-2.5 py-1 text-xs rounded-lg transition border ${
              selectedVoletFilter === 'volet2'
                ? 'bg-[#4b368a] text-white border-[#4b368a] font-semibold shadow-xs'
                : 'bg-purple-50 text-[#4b368a] border-purple-200 hover:bg-purple-100'
            }`}
            title="Volet 2 : Numérique (Code couleur officiel FWB : Violet #4B368A)"
          >
            Volet 2 : Numérique
          </button>
          <button
            type="button"
            onClick={() => setSelectedVoletFilter('communs')}
            className={`px-2.5 py-1 text-xs rounded-lg transition border ${
              selectedVoletFilter === 'communs'
                ? 'bg-[#589acd] text-white border-[#589acd] font-semibold shadow-xs'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Contenus communs aux deux volets (Code couleur officiel FWB : Bleu-gris #589ACD)"
          >
            Contenus communs
          </button>

          <div className="h-4 w-px bg-slate-300 my-auto mx-1"></div>

          <div className="flex items-center gap-1 text-xs text-slate-500 mr-1">
            Type :
          </div>
          {['all', 'Compétence', 'Savoir-faire', 'Savoir'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTypeFilter(t)}
              className={`px-2.5 py-1 text-xs rounded-lg transition ${
                selectedTypeFilter === t
                  ? 'bg-slate-800 text-white font-medium'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'Tous' : t}
            </button>
          ))}
        </div>

        {/* Scrollable list */}
        <div className="max-h-96 overflow-y-auto space-y-3 pr-2 divide-y divide-slate-100">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              Aucun contenu ni attendu ne correspond à votre filtre de recherche pour le niveau {lesson.grade}.
            </div>
          ) : (
            filteredItems.map(item => {
              const isSelected = lesson.selectedItems.some(x => x.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  className={`pt-3 pb-3 px-3.5 rounded-xl cursor-pointer transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-50/70 border border-indigo-200 shadow-sm'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Badge Volet avec couleur officielle du référentiel FMTTN */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        item.volet.includes('Volet 1')
                          ? 'bg-sky-50 text-[#006a9b] border-sky-300'
                          : item.volet.includes('Volet 2')
                          ? 'bg-purple-50 text-[#4b368a] border-purple-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}>
                        {item.volet.includes('Volet 1') ? 'Volet 1 : Manuel & Tech' : item.volet.includes('Volet 2') ? 'Volet 2 : Numérique' : 'Contenus communs'}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        item.type === 'Compétence'
                          ? 'bg-purple-100 text-purple-800'
                          : item.type === 'Savoir-faire'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-slate-600 font-medium text-xs">
                        {item.champ}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1.5 py-0.2 rounded">
                        {item.annee}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-900">
                      <span className="text-indigo-700 font-bold mr-1">Contenu :</span>
                      {item.intitule}
                    </div>

                    <div className="text-xs text-slate-700 bg-white/80 p-2 rounded-lg border border-slate-200/60">
                      <span className="text-slate-500 font-medium mr-1 text-[11px] uppercase tracking-wide">Attendu (élève) :</span>
                      <span className="italic">« {item.attendu} »</span>
                    </div>
                  </div>

                  <div className="mt-1 flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 text-transparent hover:border-indigo-400'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Rationale didactique obligatoire */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          1.4 Justification didactique de l'ancrage *
        </label>
        <p className="text-xs text-slate-500">
          Expliquez en quelques mots pourquoi cette leçon s'inscrit précisément dans ces contenus et attendus du référentiel et quel est son intérêt formatif.
        </p>
        <textarea
          rows={3}
          value={lesson.referentielRationale}
          onChange={e => onChange({ referentielRationale: e.target.value })}
          placeholder="Justifiez la pertinence didactique de l'ancrage dans le référentiel FMTTN..."
          className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Next Step CTA */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 2 : Éducation aux Médias</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
