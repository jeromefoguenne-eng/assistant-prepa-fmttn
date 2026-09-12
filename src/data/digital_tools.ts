export interface DigitalToolPreset {
  name: string;
  category: 'Programmation & Robotique' | 'Modélisation & CAO' | 'Multimédia & Création' | 'Collaboration & Partage' | 'Simulation & Mesure';
  defaultSamr: 'substitution' | 'augmentation' | 'modification' | 'redefinition';
  typicalUsage: string;
  pedagogicalValueExample: string;
}

export const POPULAR_DIGITAL_TOOLS: DigitalToolPreset[] = [
  {
    name: 'Scratch',
    category: 'Programmation & Robotique',
    defaultSamr: 'redefinition',
    typicalUsage: 'Programmation par blocs pour créer des histoires interactives, jeux ou simulations.',
    pedagogicalValueExample: 'Permet de matérialiser la pensée algorithmique (boucles, conditions, variables) avec un feedback visuel instantané impossible sur papier.'
  },
  {
    name: 'BBC micro:bit (MakeCode)',
    category: 'Programmation & Robotique',
    defaultSamr: 'redefinition',
    typicalUsage: 'Programmation d\'une carte à microcontrôleur avec capteurs (accéléromètre, boussole, lumière) et actionneurs.',
    pedagogicalValueExample: 'Relie directement le code au monde physique en instrumentant un objet technique réel avec des capteurs mesurables.'
  },
  {
    name: 'Thymio / mBot',
    category: 'Programmation & Robotique',
    defaultSamr: 'modification',
    typicalUsage: 'Robotique pédagogique pour expérimenter le comportement d\'agents autonomes.',
    pedagogicalValueExample: 'Favorise la démarche d\'investigation par essai-erreur en observant la réaction physique du robot aux capteurs d\'obstacles.'
  },
  {
    name: 'Tinkercad',
    category: 'Modélisation & CAO',
    defaultSamr: 'modification',
    typicalUsage: 'Modélisation 3D géométrique et simulation de circuits électroniques Arduino.',
    pedagogicalValueExample: 'Développe la vision dans l\'espace et permet de tester un circuit électrique sans risque de court-circuit matériel.'
  },
  {
    name: 'Canva / Genially',
    category: 'Multimédia & Création',
    defaultSamr: 'augmentation',
    typicalUsage: 'Création d\'infographies de synthèse, affiches de prévention ou présentations interactives.',
    pedagogicalValueExample: 'Oblige l\'élève à synthétiser et hiérarchiser visuellement des informations techniques complexes.'
  },
  {
    name: 'Audacity / Enregistreur audio',
    category: 'Multimédia & Création',
    defaultSamr: 'modification',
    typicalUsage: 'Enregistrement de podcast, découpage audio, mixage d\'ambiances sonores.',
    pedagogicalValueExample: 'Travaille la précision de la diction, l\'argumentation orale et le traitement numérique du signal sonore.'
  },
  {
    name: 'Digipad / Padlet',
    category: 'Collaboration & Partage',
    defaultSamr: 'augmentation',
    typicalUsage: 'Mur collaboratif pour collecter des ressources, des hypothèses ou partager les productions de la classe.',
    pedagogicalValueExample: 'Rend visibles les démarches de tous les îlots simultanément et facilite la confrontation des résultats en direct.'
  },
  {
    name: 'Wooclap / QCM interactif',
    category: 'Collaboration & Partage',
    defaultSamr: 'augmentation',
    typicalUsage: 'Sondage en direct pour évaluation diagnostique ou formative instantanée.',
    pedagogicalValueExample: 'Offre un feedback immédiat à 100% des élèves sans stigmatisation, permettant une remédiation en temps réel.'
  }
];
