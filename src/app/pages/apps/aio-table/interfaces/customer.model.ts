export class Customer {
  id: number;
  EPC: string;
  ModuloId: number;
  ModuloRol: string;
  Lecturas: number;
  Local: string;
  telefono: string;
  Antena: string;
  Empresa: string;
  RUC: string;
  UltimaLectura: string;
  labels: string;

  constructor(customer) {
    this.id = customer.id;
    this.EPC = customer.EPC;
    this.ModuloId = customer.ModuloId;
    this.Lecturas = customer.Lecturas;
    this.Local = customer.Local;
    this.telefono = customer.telefono;
    this.Antena = customer.Antena;
    this.Empresa = customer.Empresa;
    this.RUC = customer.RUC;
    this.UltimaLectura = customer.UltimaLectura;
    this.labels = customer.labels;
  }


  set name(value) {
  }

  set address(value) {
  }
}
