export interface IVisa {
  document: string; // nom codifié du document associé
  validation: string; // code de la validation demandée
  timeLimit: number; // délai accordé à l'intervenant pour réaliser le visa. Au-delà le visa est considéré comme en retard
  at: Date; // date d'origine de la demande de visa
  doneAt?: Date; // date à laquelle le visa a été émis
};

export interface IVisaStat {
  document: string; // nom codifié du document associé
  validation: string; // code la validation demandée
  lateness: number; // nb de jours de retard (arrondi au jour inférieur)
}