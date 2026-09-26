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
  Award,
  AlertOctagon
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

  const getStatusBadge = () => {
    if (diagnostic.isVirginPlan || diagnostic.score === 0) {
      return {
        label: 'Préparation Vierge (0 / 100)',
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-300 font-bold',
        icon: XCircle,
        iconClass: 'text-slate-500',
        subtext: 'Aucun contenu didactique substantiel saisi. Renseignez la thématique, les attendus et la scénarisation.'
      };
    }

    if (diagnostic.severeFailures && diagnostic.severeFailures.length > 0) {
      return {
        label: 'Échec Didactique Sévère — Fondamentaux Manquants',
        badgeClass: 'bg-rose-100 text-rose-900 border-rose-400 font-extrabold shadow-sm',
        icon: AlertOctagon,
        iconClass: 'text-rose-600',
        subtext: 'La préparation est sanctionnée : un ou plusieurs piliers indispensables (titre, attendus, scénarisation, évaluation) sont absents.'
      };
    }

    switch (diagnostic.tripleConcordanceStatus) {
      case 'optimal':
        return {
          label: 'Alignement Didactique Optimal',
          badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
          icon: CheckCircle2,
          iconClass: 'text-emerald-600',
          subtext: 'Excellente triple concordance entre attendus du référentiel, activités scénarisées et évaluation critériée.'
        };
      case 'acceptable':
        return {
          label: 'Alignement Globalement Cohérent',
          badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 font-bold',
          icon: CheckCircle2,
          iconClass: 'text-blue-600',
          subtext: 'Structure solide. Quelques ajustements mineurs recommandés pour optimiser la cohérence.'
        };
      case 'fragile':
        return {
          label: 'Alignement Fragile (Points à consolider)',
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 font-bold',
          icon: AlertTriangle,
          iconClass: 'text-amber-600',
          subtext: 'Plusieurs composantes manquent de précision (critères, posture enseignante ou justification médiatique).'
        };
      default:
        return {
          label: 'Désalignement Pédagogique Détecté',
          badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
          icon: XCircle,
          iconClass: 'text-rose-600',
          subtext: 'Éléments pédagogiques incohérents ou incomplets nécessitant une refonte ciblée.'
        };
    }
  };

  const statusInfo = getStatusBadge();
  const StatusIcon = statusInfo.icon;

  const getScoreColorClass = (score: number) => {
    if (score === 0) return 'bg-slate-500 text-white';
    if (score < 35) return 'bg-rose-600 text-white shadow-rose-200';
    if (score < 50) return 'bg-rose-500 text-white shadow-rose-200';
    if (score < 70) return 'bg-amber-500 text-white shadow-amber-200';
    if (score < 85) return 'bg-blue-600 text-white shadow-blue-200';
    return 'bg-emerald-600 text-white shadow-emerald-200';
  };

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
              Étape 6 sur 7 • Contrôle Qualité Pédagogique
            </span>
            <h2 className="text-2xl font-bold mt-1 text-white">Diagnostic d'Alignement Didactique</h2>
            <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
              Le moteur d'audit évalue la <strong>Triple Concordance</strong> (Cohérence Référentiel FMTTN ↔ Activités didactiques ↔ Dispositif d'évaluation), 
              la <strong>scénarisation des phases</strong>, la <strong>justification médiatique</strong> et l'<strong>absence de techno-centrisme</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <StatusIcon className={`w-6 h-6 flex-shrink-0 ${statusInfo.iconClass}`} />
              <span className={`px-3 py-1 rounded-full text-xs border ${statusInfo.badgeClass}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              {statusInfo.subtext}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 flex-shrink-0">
            <div className="text-right">
              <span className="block text-2xl font-black text-slate-900">{diagnostic.score} / 100</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Score d'alignement</span>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-all ${getScoreColorClass(diagnostic.score)}`}>
              {diagnostic.score}%
            </div>
          </div>
        </div>

        {/* 4 Jauges Didactiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          {/* Jauge 1 : Ancrage Référentiel */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate" title="Ancrage Référentiel FMTTN (Savoirs & Attendus)">
              1. Ancrage Référentiel
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.referentielCoverage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{diagnostic.metrics.referentielCoverage}%</span>
              <span className="text-[10px] text-slate-400">Poids 30%</span>
            </div>
          </div>

          {/* Jauge 2 : Scénarisation Didactique */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate" title="Scénarisation Didactique (Phases, rôle élève/enseignant)">
              2. Scénarisation Didactique
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.scenarisationQuality}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{diagnostic.metrics.scenarisationQuality}%</span>
              <span className="text-[10px] text-slate-400">Poids 30%</span>
            </div>
          </div>

          {/* Jauge 3 : Précision Évaluative */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate" title="Précision Évaluative & Concordance">
              3. Précision Évaluative
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.evaluativePrecision}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{diagnostic.metrics.evaluativePrecision}%</span>
              <span className="text-[10px] text-slate-400">Poids 25%</span>
            </div>
          </div>

          {/* Jauge 4 : Éducation Médias */}
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-600 block truncate" title="Éducation aux Médias & Numérique">
              4. Éducation aux Médias
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all"
                style={{ width: `${diagnostic.metrics.mediaJustification}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">{diagnostic.metrics.mediaJustification}%</span>
              <span className="text-[10px] text-slate-400">Poids 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerte Bloquante : Échecs fondamentaux */}
      {diagnostic.severeFailures && diagnostic.severeFailures.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-3">
            <AlertOctagon className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <h3 className="text-base font-bold text-rose-950">
              Échec Pédagogique Sévère — Éléments fondamentaux manquants ({diagnostic.severeFailures.length})
            </h3>
          </div>
          <p className="text-xs text-rose-900 leading-relaxed">
            Une préparation didactique de qualité ne peut faire l'impasse sur ces piliers constitutifs. Le score global restera bloqué tant que ces éléments ne sont pas renseignés :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {diagnostic.severeFailures.map((failure, idx) => (
              <div key={idx} className="bg-white/80 border border-rose-200 rounded-xl p-3 text-xs text-rose-900 font-semibold flex items-center space-x-2">
                <span className="text-rose-600 font-black">✕</span>
                <span>{failure}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points forts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <h3 className="text-base font-semibold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Points forts pédagogiques validés ({diagnostic.strengths.length})</span>
        </h3>
        {diagnostic.strengths.length === 0 ? (
          <p className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">
            Aucun point fort validé pour l'instant. Complétez les étapes de la préparation pour valoriser votre démarche didactique.
          </p>
        ) : (
          <div className="space-y-2">
            {diagnostic.strengths.map((str, i) => (
              <div key={i} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 text-xs text-emerald-950 flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span className="font-medium leading-relaxed">{str}</span>
              </div>
            ))}
          </div>
        )}
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
                  <span>{warn}</span>
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
          ← Retour à l'Étape 5 (Évaluation)
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md transition flex items-center space-x-2"
        >
          <span>Passer à l'Étape 7 : Fiche & Export</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
