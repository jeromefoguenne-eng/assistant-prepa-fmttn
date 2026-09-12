import hechLogo from '../assets/hech.jpg';
import React from 'react';
import { Sparkles, Download, RotateCcw } from 'lucide-react';
import { LessonPlan } from '../types/lesson';
import { SAMPLE_LESSON_PLANS } from '../data/initial_templates';

interface HeaderProps {
  lesson: LessonPlan;
  onLoadTemplate: (template: LessonPlan) => void;
  onReset: () => void;
  onExportClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lesson, onLoadTemplate, onReset, onExportClick }) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="h-11 w-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden border border-slate-700/50 flex-shrink-0">
            <img 
              src={hechLogo} 
              alt="Logo Haute École Charlemagne (HECh)" 
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
                Assistant Préparation cours FMTTN
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 hidden md:inline-block">
                  HECh • FWB
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Formation Manuelle, Technique, Technologique et Numérique (Tronc Commun P1 à S3)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Templates dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 transition"
              title="Charger une préparation exemple"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Modèles inspirants</span>
            </button>
            <div className="absolute right-0 mt-1 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Exemples officiels FWB
              </div>
              {SAMPLE_LESSON_PLANS.map(t => (
                <button
                  key={t.id}
                  onClick={() => onLoadTemplate(t)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-700/80 transition flex flex-col"
                >
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-500/30 text-blue-300">
                      {t.grade}
                    </span>
                    {t.title}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate mt-0.5">{t.duration} • {t.targetAudience}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onExportClick}
            type="button"
            className="flex items-center space-x-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Aperçu & Export</span>
          </button>

          <button
            onClick={onReset}
            type="button"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            title="Réinitialiser la préparation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
