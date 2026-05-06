import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  // Inyección del servicio HttpClient para realizar solicitudes HTTP
  http = inject(HttpClient);
  // URL base para las solicitudes a la API
  private urlBase: string = 'https://desarrolloaws.datascoring.co:9995';

  // Metodos
  //Metodo para obtener Tipo de motivo desde la API
  getTipo() {
    const body = {
      sTabla: 'motivos',
      sCampo: 'tipo',
      iIdioma: 0,
    };
    return this.http.post(`${this.urlBase}/OpcionesSolicitud/GetOpcionesVariables`, body);
  }

  // Metodo para obtener Tipo_motivo desde la API
  getTipoMotivo() {
    const body = {
      sTabla: 'motivos',
      sCampo: 'Tipo_Motivo',
      iIdioma: 0,
    };
    return this.http.post(`${this.urlBase}/OpcionesSolicitud/GetOpcionesVariables`, body);
  }
}
