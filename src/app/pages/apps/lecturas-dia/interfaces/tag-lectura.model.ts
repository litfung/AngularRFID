export class TagLectura {
    id: number;
    tAG: string;
    ePC: string;
    invTimes: number;
    rSSI: number;
    antID: number;
    color: string;
    moduloId: string;
    moduloRol: string;
  
    constructor(tagLectura) {
      this.id = tagLectura.id;
      this.tAG = tagLectura.tAG;
      this.ePC = tagLectura.ePC;
      this.invTimes = tagLectura.invTimes;
      this.rSSI = tagLectura.rSSI;
      this.antID = tagLectura.antID;
      this.color = tagLectura.color;
      this.moduloId = tagLectura.moduloId;
      this.moduloRol = tagLectura.moduloRol;
    }
}
  