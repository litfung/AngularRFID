export class Tag {
  id: number;
  tAG: string;
  ePC: string;
  invTimes: number;
  rSSI: number;
  antID: number;
  color: string;
  moduloId: string;
  moduloRol: string;

  constructor(tag) {
    this.id = tag.id;
    this.tAG = tag.tAG;
    this.ePC = tag.ePC;
    this.invTimes = tag.invTimes;
    this.rSSI = tag.rSSI;
    this.antID = tag.antID;
    this.color = tag.color;
    this.moduloId = tag.moduloId;
    this.moduloRol = tag.moduloRol;
  }

  // get name() {
  //   let name = '';

  //   if (this.firstName && this.lastName) {
  //     name = this.firstName + ' ' + this.lastName;
  //   } else if (this.firstName) {
  //     name = this.firstName;
  //   } else if (this.lastName) {
  //     name = this.lastName;
  //   }

  //   return name;
  // }

  // set name(value) {
  // }

  // get address() {
  //   return `${this.street}, ${this.zipcode} ${this.city}`;
  // }

  // set address(value) {
  // }
}
