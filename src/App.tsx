import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { Step1Referentiel } from './components/steps/Step1Referentiel';
import { Step3EducationMedias } from './components/steps/Step3EducationMedias';
import { Step4Methodologie } from './components/steps/Step4Methodologie';
import { Step5Activite } from './components/steps/Step5Activite';
import { Step6Evaluation } from './components/steps/Step6Evaluation';
import { Step7Verification } from './components/steps/Step7Verification';
import { Step8Export } from './components/steps/Step8Export';

import { LessonPlan } from './types/lesson';
import { EMPTY_LESSON_PLAN } from './data/initial_templates';

const STORAGE_KEY = 'fmttn_lesson_designer_plan_v5';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [lesson, setLesson] = useState<LessonPlan>(() => {
    try {
      // Nettoyage proactif des anciennes clés pour éviter la résurgence d'anciens exemples en cache
      ['fmttn_lesson_designer_current_plan', 'fmttn_lesson_designer_current_plan_v2', 'fmttn_lesson_designer_current_plan_v3', 'fmttn_lesson_designer_current_plan_v4'].forEach(k => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && !parsed.id?.startsWith('sample_')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load plan from localStorage", e);
    }
    // Démarrage par défaut sur un canevas strictement vierge (bulles vides, 3 phases initiales non remplies)
    return { ...EMPTY_LESSON_PLAN, id: 'plan_' + Date.now() };
  });

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lesson));
    } catch (e) {
      console.error("Failed to save plan to localStorage", e);
    }
  }, [lesson]);

  const handleLessonChange = (updated: Partial<LessonPlan>) => {
    setLesson(prev => ({
      ...prev,
      ...updated,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleLoadTemplate = (template: LessonPlan) => {
    setLesson({ ...template, id: 'plan_' + Date.now() });
    setCurrentStep(1);
  };

  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser la préparation en cours ?")) {
      setLesson({ ...EMPTY_LESSON_PLAN, id: 'plan_' + Date.now() });
      setCurrentStep(1);
    }
  };

  const nextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    setCurrentStep(prev => Math.min(7, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      <Header
        lesson={lesson}
        onLoadTemplate={handleLoadTemplate}
        onReset={handleReset}
        onExportClick={() => setCurrentStep(7)}
      />

      <div className="no-print">
        <ProgressBar
          currentStep={currentStep}
          onSelectStep={step => {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedSteps={completedSteps}
        />
      </div>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        {currentStep === 1 && (
          <Step1Referentiel
            lesson={lesson}
            onChange={handleLessonChange}
            onNext={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Step3EducationMedias
            lesson={lesson}
            onChange={handleLessonChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Step4Methodologie
            lesson={lesson}
            onChange={handleLessonChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Step5Activite
            lesson={lesson}
            onChange={handleLessonChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Step6Evaluation
            lesson={lesson}
            onChange={handleLessonChange}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {currentStep === 6 && (
          <Step7Verification
            lesson={lesson}
            onNext={nextStep}
            onPrev={prevStep}
            onGoToStep={step => setCurrentStep(step)}
          />
        )}
        {currentStep === 7 && (
          <Step8Export
            lesson={lesson}
            onImportLesson={imported => setLesson(imported)}
            onPrev={prevStep}
          />
        )}
      </main>

      <footer className="no-print py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <p>
          Assistant Préparation cours FMTTN • Haute École Charlemagne (HECh) • Jérôme Foguenne
        </p>
      </footer>
    </div>
  );
};

export default App;
