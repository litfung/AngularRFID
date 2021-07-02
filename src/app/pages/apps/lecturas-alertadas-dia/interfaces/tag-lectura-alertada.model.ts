export class TagLecturaAlertada {
    id: number;
    tAG: string;
    ePC: string;
    invTimes: number;
    rSSI: number;
    antID: number;
    color: string;
    moduloId: string;
    moduloRol: string;
  
    constructor(TagLecturaAlertada) {
      this.id = TagLecturaAlertada.id;
      this.tAG = TagLecturaAlertada.tAG;
      this.ePC = TagLecturaAlertada.ePC;
      this.invTimes = TagLecturaAlertada.invTimes;
      this.rSSI = TagLecturaAlertada.rSSI;
      this.antID = TagLecturaAlertada.antID;
      this.color = TagLecturaAlertada.color;
      this.moduloId = TagLecturaAlertada.moduloId;
      this.moduloRol = TagLecturaAlertada.moduloRol;
    }
}
  