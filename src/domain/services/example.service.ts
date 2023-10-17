import { IVisa } from '../entities/interfaces';

export class ExampleService {
  private readonly PHA = ['EXE'];
  private readonly EME = ['VCF', 'BYT', 'GCC', 'GOY', 'BAL'];
  private readonly LOT = ['GO', 'CVC', 'PLB', 'CFA', 'CFO', 'ETA', 'PEI', 'RSS', 'FAC'];
  private readonly TYP = ['NDC', 'PLN', 'DET', 'SCH', 'CAL'];
  private readonly NIV = ['SS1', 'RDC', 'R+1', 'R+2', 'R+3', 'R+4', 'R+5', 'TT'];
  private readonly VALIDATIONS = ['ARC', 'PLB', 'STR', 'ENV', 'BC', 'MOX'];
  private readonly TIME_LIMITS = [10, 10, 10, 5, 15, 3];

  private shuffle<T>(data: T[]): T[] {
    const rnd = new Map();
    data.forEach(item => rnd.set(item, Math.random()));
    return [...data].sort((i1, i2) => rnd.get(i1) - rnd.get(i2));
  }

  private fakeName(): string {
    return this.PHA[Math.floor(this.PHA.length * .99 * Math.random())] + '_' +
           this.EME[Math.floor(this.EME.length * .99 * Math.random())] + '_' +
           this.LOT[Math.floor(this.LOT.length * .99 * Math.random())] + '_' +
           this.TYP[Math.floor(this.TYP.length * .99 * Math.random())] + '_' +
           this.NIV[Math.floor(this.NIV.length * .99 * Math.random())] + '_' +
           Math.floor(9999 * Math.random()).toFixed().padStart(4, '0');
  }

  generate(quantity: number): IVisa[] {
    const data: IVisa[] = [];
    const date = Date.now() - 2 * 30 * 24 * 60 * 60 * 1000; // - 2 mois
    const names = new Set();

    for (let i = 0; i < quantity; i++) {
      const document = this.fakeName();
      if (names.has(document)) {
        i--;
        continue;
      } else {
        names.add(document);
      }
      const timestamp = date + Math.floor(30 * 60 * 60 * 1000 * Math.random());
      for (let j = 0; j < this.VALIDATIONS.length; j++) {
        const timeLimit = this.TIME_LIMITS[j] + Math.floor(-2 + 4 * Math.random());
        const at = new Date(timestamp + Math.floor(5 * 60 * 60 * 1000 * Math.random()));
        data.push({
          document,
          validation: this.VALIDATIONS[j],
          timeLimit,
          at,
          doneAt: Math.random() < .33
            ? new Date(at.getTime() + Math.floor(0.8 * timeLimit * 60 * 60 * 1000 + 2 * timeLimit * 60 * 60 * 1000 * Math.random()))
            : undefined
        });
      }
    }

    return this.shuffle(data).slice(0, data.length * .5);
  }
}
