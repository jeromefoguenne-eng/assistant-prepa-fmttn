import React, { useState } from 'react';
import { 
  Workflow, 
  Check, 
  Users, 
  Search, 
  FolderKanban, 
  Compass, 
  HelpCircle, 
  Repeat, 
  Trophy, 
  Gamepad2,
  Laptop,
  Sparkles,
  Edit3,
  X
} from 'lucide-react';
import { LessonPlan } from '../../types/lesson';
import { ACTIVE_METHODOLOGIES } from '../../data/methodologies';

interface Step4Props {
  lesson: LessonPlan;
  onChange: (updated: Partial<LessonPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  FolderKanban,
  Compass,
  HelpCircle,
  Users,
  Repeat,
  Trophy,
  Gamepad2,
  Laptop
};

export const Step4Methodologie: React.FC<Step4Props> = ({ lesson, onChange, onNext, onPrev }) => {
  const currentMethodology = lesson.methodology;
  const isCustomSelected = currentMethodology.selectedMethodologyId === 'custom';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState(currentMethodology.customMethodologyTitle || '');
  const [customDescription, setCustomDescription] = useState('');
  const [customTeacherRole, setCustomTeacherRole] = useState('');
  const [customStudentRole, setCustomStudentRole] = useState('');
  const [customRationale, setCustomRationale] = useState(currentMethodology.rationale || '');

  const selectMethodology = (id: string) => {
    if (id === 'custom') {
      onChange({
        methodology: {
          ...currentMethodology,
          selectedMethodologyId: 'custom',
          customMethodologyTitle: customTitle || 'Méthodologie personnalisée'
        }
      });
      setIsModalOpen(true);
    } else {
      onChange({
        methodology: {
          ...currentMethodology,
          selectedMethodologyId: id
        }
      });
    }
  };

  const handleSaveCustomModal = () => {
    let combinedRationale = customRationale.trim();
    if (customDescription.trim() || customStudentRole.trim() || customTeacherRole.trim()) {
      const details = [
        customDescription ? `Démarche : ${customDescription.trim()}` : '',
        customStudentRole ? `Rôle élève : ${customStudentRole.trim()}` : '',
        customTeacherRole ? `Posture enseignant : ${customTeacherRole.trim()}` : '',
        customRationale ? `Justification : ${customRationale.trim()}` : ''
      ].filter(Boolean).join(' | ');
      combinedRationale = details;
    }

    onChange({
      methodology: {
        ...currentMethodology,
        selectedMethodologyId: 'custom',
        customMethodologyTitle: customTitle.trim() || 'Méthodologie personnalisée',
        rationale: combinedRationale || currentMethodology.rationale
      }
    });
    setIsModalOpen(false);
  };

  const handleRationaleChange = (rationale: string) => {
    onChange({
      methodology: {
        ...currentMethodology,
        rationale
      }
    });
  };

  const handleGroupingChange = (groupingStrategy: any) => {
    onChange({
      methodology: {
        ...currentMethodology,
        groupingStrategy
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Workflow className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-300 bg-amber-500/30 px-2.5 py-0.5 rounded-full">
              Étape 3 sur 7 • Didactique Active
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Choisir la Méthodologie Pédagogique</h2>
            <p className="text-amber-100 text-sm mt-2 max-w-3xl leading-relaxed">
              <strong>Cette étape intervient impérativement AVANT la scénarisation de l'activité.</strong>
              « Quelle démarche pédagogique active est la plus propice pour atteindre votre objectif d'apprentissage sans tomber dans la simple transmission passive ? »
            </p>
          </div>
        </div>
      </div>

      {/* Grille des démarches actives */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            3.1 Démarches pédagogiques actives en FMTTN
          </h3>
          <p className="text-xs text-slate-500">
            Créez votre propre méthodologie ou choisissez parmi les démarches didactiques recommandées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TUILE 1 : JE CRÉE MA PROPRE MÉTHODOLOGIE (Ajoutée en premier) */}
          <div
            onClick={() => selectMethodology('custom')}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between relative overflow-hidden ${
              isCustomSelected
                ? 'bg-gradient-to-br from-indigo-50 to-amber-50 border-indigo-600 shadow-md ring-2 ring-indigo-500/50'
                : 'bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-sm'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl ${isCustomSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>Je crée ma propre méthodologie</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        Sur-mesure
                      </span>
                    </h4>
                    <p className="text-xs text-indigo-700 font-medium">
                      {currentMethodology.customMethodologyTitle && isCustomSelected
                        ? currentMethodology.customMethodologyTitle
                        : 'Démarche pédagogique personnalisée'}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                    isCustomSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Vous concevez une démarche sur-mesure (ateliers tournants, démarche de design thinking, modélisation coopérative, etc.). 
                Cliquez pour ouvrir la boîte de dialogue et décrire les étapes, les postures et la plus-value de votre méthodologie.
              </p>

              <div className="pt-2 border-t border-indigo-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectMethodology('custom');
                    setIsModalOpen(true);
                  }}
                  className="flex items-center space-x-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white px-3 py-1.5 rounded-lg border border-indigo-200 shadow-2xs transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isCustomSelected ? 'Modifier la description' : 'Configurer ma méthodologie'}</span>
                </button>
                {isCustomSelected && (
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Active
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Les autres démarches */}
          {ACTIVE_METHODOLOGIES.map(method => {
            const Icon = ICONS_MAP[method.iconName] || Workflow;
            const isSelected = currentMethodology.selectedMethodologyId === method.id;

            return (
              <div
                key={method.id}
                onClick={() => selectMethodology(method.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-500/50'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{method.name}</h4>
                        <p className="text-xs text-amber-700 font-medium">{method.tagline}</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {method.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-700 block">Rôle de l'élève :</span>
                      <span className="text-slate-500">{method.studentRole}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">Posture enseignant :</span>
                      <span className="text-slate-500">{method.teacherRole}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organisation sociale et Justification */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <h3 className="text-base font-semibold text-slate-900">
          3.2 Modalité sociale & Justification de la démarche
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Modalité de travail dominante *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'individuel', label: 'Individuel' },
              { id: 'binome', label: 'Binômes (îlots de 2)' },
              { id: 'petits_groupes', label: 'Petits groupes (3-4)' },
              { id: 'classe_entiere', label: 'Classe entière' },
              { id: 'mixte', label: 'Mixte évolutive' }
            ].map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleGroupingChange(m.id)}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  currentMethodology.groupingStrategy === m.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Justification didactique : Pourquoi cette méthodologie sert-elle votre objectif ? *
          </label>
          <textarea
            rows={3}
            value={currentMethodology.rationale}
            onChange={e => handleRationaleChange(e.target.value)}
            placeholder="Justifiez le choix de cette démarche active au regard des attendus visés..."
            className="w-full text-sm rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      {/* MODAL : DÉFINIR MA MÉTHODOLOGIE PERSONNALISÉE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Définir ma méthodologie personnalisée
                  </h3>
                  <p className="text-xs text-slate-500">
                    Explicitez le cadre pédagogique et les dynamiques de travail que vous allez mettre en place.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Intitulé de votre méthodologie *
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  placeholder="Intitulé de votre méthodologie personnalisée..."
                  className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description de la démarche (comment s'articulent les étapes ?)
                </label>
                <textarea
                  rows={3}
                  value={customDescription}
                  onChange={e => setCustomDescription(e.target.value)}
                  placeholder="Description des différentes phases et dynamiques de travail..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Rôle & Activité de l'élève
                  </label>
                  <input
                    type="text"
                    value={customStudentRole}
                    onChange={e => setCustomStudentRole(e.target.value)}
                    placeholder="Rôle et actions attendues de l'élève..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Posture & Rôle de l'enseignant
                  </label>
                  <input
                    type="text"
                    value={customTeacherRole}
                    onChange={e => setCustomTeacherRole(e.target.value)}
                    placeholder="Posture et interventions de l'enseignant..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Pourquoi cette démarche est-elle la plus pertinente pour cet apprentissage ?
                </label>
                <textarea
                  rows={2}
                  value={customRationale}
                  onChange={e => setCustomRationale(e.target.value)}
                  placeholder="Plus-value didactique de cette démarche..."
                  className="w-full rounded-lg border border-slate-300 p-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveCustomModal}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Enregistrer ma méthodologie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav CTA */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium text-sm transition"
        >
          ← Retour à l'Étape 2 : Éducation aux Médias
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 4 : Scénariser l'Activité</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
