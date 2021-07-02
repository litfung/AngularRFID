export class customerLecturaAlertada {
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
  
    constructor(customerLecturaAlertada) {
      this.id = customerLecturaAlertada.id;
      this.epc = customerLecturaAlertada.epc;
      this.moduloId = customerLecturaAlertada.moduloId;
      this.lecturas = customerLecturaAlertada.lecturas;
      this.local = customerLecturaAlertada.local;
      this.telefono = customerLecturaAlertada.telefono;
      this.antena = customerLecturaAlertada.Antena;
      this.empresa = customerLecturaAlertada.empresa;
      this.ruc = customerLecturaAlertada.ruc;
      this.ultimaLectura = customerLecturaAlertada.ultimaLectura;
      this.labels = customerLecturaAlertada.labels;
    }
  
  
    set name(value) {
    }
  
    set address(value) {
    }
  }
  