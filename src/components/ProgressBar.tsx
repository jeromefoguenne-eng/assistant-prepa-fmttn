import React from 'react';
import { 
  BookOpen, 
  Target, 
  Radio, 
  Workflow, 
  Layers, 
  CheckSquare, 
  ShieldCheck, 
  FileCheck2,
  Check
} from 'lucide-react';

export interface StepDef {
  number: number;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STEPS: StepDef[] = [
  { number: 1, label: 'Référentiel', shortLabel: '1. Référentiel', icon: BookOpen },
  { number: 2, label: 'Apprentissages', shortLabel: '2. Apprentissages', icon: Target },
  { number: 3, label: 'Éduc. Médias', shortLabel: '3. Médias', icon: Radio },
  { number: 4, label: 'Méthodologie', shortLabel: '4. Méthode', icon: Workflow },
  { number: 5, label: 'Activité', shortLabel: '5. Activité', icon: Layers },
  { number: 6, label: 'Évaluation', shortLabel: '6. Évaluation', icon: CheckSquare },
  { number: 7, label: 'Diagnostic', shortLabel: '7. Diagnostic', icon: ShieldCheck },
  { number: 8, label: 'Export', shortLabel: '8. Export', icon: FileCheck2 },
];

interface ProgressBarProps {
  currentStep: number;
  onSelectStep: (stepNumber: number) => void;
  completedSteps?: number[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, onSelectStep, completedSteps = [] }) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isCurrent = step.number === currentStep;
              const isCompleted = completedSteps.includes(step.number) || step.number < currentStep;

              return (
                <li key={step.number}>
                  <button
                    type="button"
                    onClick={() => onSelectStep(step.number)}
                    className={`w-full group flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                      isCurrent
                        ? 'bg-indigo-50/80 ring-2 ring-indigo-600 text-indigo-700 shadow-sm'
                        : isCompleted
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        : 'bg-transparent hover:bg-slate-50 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                          isCurrent
                            ? 'bg-indigo-600 text-white shadow'
                            : isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                        }`}
                      >
                        {isCompleted && !isCurrent ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                      </span>
                    </div>
                    <span className="text-xs font-medium truncate w-full tracking-tight">
                      {step.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
