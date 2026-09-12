import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { LessonPlan } from '../../types/lesson';
import { analyzeAlignment } from '../../utils/alignment_engine';

interface Step7Props {
  lesson: LessonPlan;
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (step: number) => void;
}

export const Step7Verification: React.FC<Step7Props> = ({ lesson, onNext, onPrev, onGoToStep }) => {
  const diagnostic = analyzeAlignment(lesson);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return {
          label: 'Alignement Didactique Optimal',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          iconClass: 'text-emerald-600'
        };
      case 'acceptable':
        return {
          label: 'Alignement Globalement Cohérent',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: CheckCircle2,
          iconClass: 'text-blue-600'
        };
      case 'fragile':
        return {
          label: 'Alignement Fragile (Points à consolider)',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: AlertTriangle,
          iconClass: 'text-amber-600'
        };
      default:
        return {
          label: 'Désalignement Pédagogique Détecté',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: XCircle,
          iconClass: 'text-rose-600'
        };
    }
  };

  const statusInfo = getStatusBadge(diagnostic.tripleConcordanceStatus);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <ShieldCheck className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-300 bg-indigo-500/30 px-2.5 py-0.5 rounded-full">
              Étape 7 sur 8 • Contrôle Qualité Pédagogique
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Diagnostic d'Alignement Didactique</h2>
            <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
              Le moteur d'audit vérifie la <strong>Triple Concordance de Biggs</strong> (Cohérence Objectifs ↔ Activités ↔ Évaluation), 
              le respect de la <strong>Taxonomie de Bloom</strong>, la <strong>justification médiatique</strong> et l'<strong>absence de techno-centrisme</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <StatusIcon className={`w-6 h-6 ${statusInfo.iconClass}`} />
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.badgeClass}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Indice de qualité didactique calculé sur l'ensemble de votre préparation.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-right">
              <span className="block text-2xl font-black text-slate-900">{diagnostic.score} / 100</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Score d'alignement</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow">
              {diagnostic.score}%
            </div>
          </div>
        </div>

        {/* 4 Jauges Didactiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate">1. Rigueur Bloom</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.bloomConsistency}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-900">{diagnostic.metrics.bloomConsistency}%</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate">2. Éducation Médias</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.mediaJustification}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-900">{diagnostic.metrics.mediaJustification}%</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate">3. Pertinence Numérique</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-cyan-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.digitalRelevance}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-900">{diagnostic.metrics.digitalRelevance}%</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate">4. Précision Évaluative</span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.evaluativePrecision}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-900">{diagnostic.metrics.evaluativePrecision}%</span>
          </div>
        </div>
      </div>

      {/* Points forts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <h3 className="text-base font-semibold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Points forts pédagogiques validés ({diagnostic.strengths.length})</span>
        </h3>
        <div className="space-y-2">
          {diagnostic.strengths.map((str, i) => (
            <div key={i} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-xs text-emerald-950 flex items-start space-x-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="font-medium leading-relaxed">{str}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Alertes & Recommandations */}
      {diagnostic.warnings.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-semibold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Alertes et suggestions d'amélioration ({diagnostic.warnings.length})</span>
          </h3>

          <div className="space-y-2.5">
            {diagnostic.warnings.map((warn, i) => (
              <div key={i} className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center space-x-2 font-bold">
                  <span>⚠️ {warn}</span>
                </div>
                {diagnostic.recommendations[i] && (
                  <div className="text-slate-700 pl-4 border-l-2 border-amber-400 mt-1">
                    <strong className="text-indigo-900">Conseil :</strong> {diagnostic.recommendations[i]}
                  </div>
                )}
              </div>
            ))}
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
          ← Retour à l'Étape 6
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 8 : Aperçu Officiel & Export</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
