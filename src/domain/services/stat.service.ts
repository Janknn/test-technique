import { IVisa, IVisaStat } from "../entities/interfaces";

export class StatService {
  compute(visas: IVisa[], date: Date): IVisaStat[] {
    const visaStats: IVisaStat[] = [];

    for (const visa of visas) {
      if (visa !== undefined) {
        const visaDate = new Date(visa.at);
        const timeLimit = visa.timeLimit * 24 * 60 * 60 * 1000;
        const deadline = new Date(visaDate.getTime() + timeLimit);
        const lateness = Math.floor(
          (date.getTime() - deadline.getTime()) / (24 * 60 * 60 * 1000)
        );
        if (lateness > 0) {
          visaStats.push({
            document: visa.document,
            validation: visa.validation,
            lateness: lateness,
          });
        }
      }
    }
    visaStats.sort((a, b) => b.lateness - a.lateness);
    return visaStats;
  }
}