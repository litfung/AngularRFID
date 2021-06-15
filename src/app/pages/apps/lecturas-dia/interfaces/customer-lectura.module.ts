export class customerLectura {
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
  
    constructor(customerLectura) {
      this.id = customerLectura.id;
      this.EPC = customerLectura.EPC;
      this.ModuloId = customerLectura.ModuloId;
      this.Lecturas = customerLectura.Lecturas;
      this.Local = customerLectura.Local;
      this.telefono = customerLectura.telefono;
      this.Antena = customerLectura.Antena;
      this.Empresa = customerLectura.Empresa;
      this.RUC = customerLectura.RUC;
      this.UltimaLectura = customerLectura.UltimaLectura;
      this.labels = customerLectura.labels;
    }
  
  
    set name(value) {
    }
  
    set address(value) {
    }
  }
  