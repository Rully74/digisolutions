import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseMotivo, Motivo } from '../core/motivo.model';

@Injectable({
  providedIn: 'root',
})
export class MotivosService {
  // Inyección del servicio HttpClient para realizar solicitudes HTTP
  http = inject(HttpClient);
  // URL base para las solicitudes a la API
  private urlBase: string = 'https://desarrolloaws.datascoring.co:9995';

  // Metodos
  // Metodo para obtener la lista de motivos desde la API
  getMotivos() {
    const body = {
      que: 4,
      tope: '999',
      cmd: '',
      codigo: '0',
      tipo: '',
      descripcion: '',
      tipo_motivo: '',
      iIdioma: 0,
    };
    return this.http.post<ApiResponseMotivo<Motivo[]>>(`${this.urlBase}/Motivos/MotivosList`, body);
  }

  // Metodo para crear un nuevo motivo en la API
  createMotivo(motivo: Motivo) {
    const body = {
      que: 1,
      tope: '100',
      cmd: '',
      codigo: motivo.motivo,
      tipo: motivo.tipo,
      descripcion: motivo.descripcion,
      tipo_motivo: motivo.tipo_motivo,
      iIdioma: 0,
    };
    return this.http.post<ApiResponseMotivo<boolean>>(`${this.urlBase}/Motivos/MotivosAdd`, body);
  }

  // Metodo para actualizar un motivo existente en la API
  updateMotivo(motivo: Motivo) {
    const body = {
      que: 2,
      tope: '',
      cmd: '',
      codigo: motivo.motivo,
      tipo: motivo.tipo,
      descripcion: motivo.descripcion,
      tipo_motivo: motivo.tipo_motivo,
      iIdioma: 0,
    };
    return this.http.post<ApiResponseMotivo<boolean>>(`${this.urlBase}/Motivos/MotivosUpd`, body);
  }

  // Metodo para eliminar un motivo de la API
  deleteMotivo(motivo: Motivo) {
    const body = {
      que: 3,
      tope: '',
      cmd: '',
      codigo: motivo.motivo,
      tipo: '',
      descripcion: '',
      tipo_motivo: '',
      iIdioma: 0,
    };
    return this.http.post<ApiResponseMotivo<boolean>>(`${this.urlBase}/Motivos/MotivosDelete`, body);
  }
}
