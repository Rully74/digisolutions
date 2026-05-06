// Interface que representa el Motivo
export interface Motivo {
  motivo: string;
  tipo: string;
  descripcion: string;
  tipo_motivo: string;
}

// Interface que representa la respuesta de la API al obtener los motivos
export interface ApiResponseMotivo<T> {
  success: boolean;
  data: T;
}

// Interface que representa una opcion de catalago para los campos tipo y tipo_motivo
export interface OpcionCatalogo {
  sOption: string;
  sValue: string;
}
