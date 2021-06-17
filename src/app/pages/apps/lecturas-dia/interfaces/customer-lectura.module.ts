export class customerLectura {
    id: number;
    epc: string;
    moduloId: number;
    moduloRol: string;
    lecturas: number;
    local: string;
    telefono: string;
    antena: string;
    empresa: string;
    ruc: string;
    ultimaLectura: string;
    labels: string;
  
    constructor(customerLectura) {
      this.id = customerLectura.id;
      this.epc = customerLectura.epc;
      this.moduloId = customerLectura.moduloId;
      this.lecturas = customerLectura.lecturas;
      this.local = customerLectura.local;
      this.telefono = customerLectura.telefono;
      this.antena = customerLectura.Antena;
      this.empresa = customerLectura.empresa;
      this.ruc = customerLectura.ruc;
      this.ultimaLectura = customerLectura.ultimaLectura;
      this.labels = customerLectura.labels;
    }
  
  
    set name(value) {
    }
  
    set address(value) {
    }
  }
  