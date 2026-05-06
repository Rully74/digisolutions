import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MotivosService } from '../../services/motivos.service';
import { CommonModule } from '@angular/common';
import { Motivo } from '../../core/motivo.model';
import { FormsModule } from '@angular/forms';
// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-motivo-list',
  templateUrl: './motivo-list.component.html',
  styleUrl: './motivo-list.component.css',
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
})
export class MotivoListComponent implements OnInit {
  motivos: Motivo[] = [];
  motivosFiltered: Motivo[] = [];
  valueToFilter: string = '';
  motivosService = inject(MotivosService);
  private cdr = inject(ChangeDetectorRef);
  loading: boolean = false;
  errorMessage: string = '';
  columnsToDisplay: string[] = ['motivo', 'tipo', 'descripcion', 'tipo_motivo', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.loadMotivos();
  }

  // Metodo para cargar los motivos desde la API
  loadMotivos() {
    console.log('Cargando motivos...');
    this.loading = true;
    this.errorMessage = '';
    this.motivosService.getMotivos().subscribe({
      next: (response) => {
        console.log('Respuesta de la API: ', response);
        if (response.success) {
          this.motivos = response.data || [];
          this.filterMotivos();
        } else {
          console.error('Error al cargar motivos: ', response);
          this.errorMessage = 'Error al cargar los motivos';
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error en la solicitud de motivos: ', err);
        this.errorMessage = 'Error en la solicitud de motivos';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  // Metodo para filtrar por motivo o descripcion
  filterMotivos() {
    if (!this.valueToFilter) {
      this.motivosFiltered = [...this.motivos];
    } else {
      const filterValue = this.valueToFilter.toLowerCase();
      this.motivosFiltered = this.motivos.filter(
        (motivo) =>
          (motivo.motivo || '').toLowerCase().includes(filterValue) ||
          (motivo.descripcion || '').toLowerCase().includes(filterValue),
      );
    }
  }

  // Metodo para crear un nuevo motivo (a implementar)
  createMotivo() {
    console.log('Crear nuevo motivo');
    // Lógica para crear un nuevo motivo (a implementar)
  }

  // Metodo editar un motivo (a implementar)
  editMotivo(motivo: Motivo) {
    console.log('Editar motivo: ', motivo);
    // Lógica para editar el motivo (a implementar)
    if (motivo.motivo) {
      this.motivosService.updateMotivo(motivo).subscribe({
        next: (response) => {
          console.log('Respuesta de la API al actualizar motivo: ', response);
          if (response.success) {
            this.loadMotivos(); // Recargar la lista de motivos después de actualizar
          } else {
            console.error('Error al actualizar motivo: ', response);
            this.errorMessage = 'Error al actualizar el motivo';
          }
        },
        error: (err) => {
          console.error('Error en la solicitud de actualización de motivo: ', err);
          this.errorMessage = 'Error en la solicitud de actualización del motivo';
        },
      });
    }
  }

  // Metodo eliminar un motivo (a implementar)
  deleteMotivo(motivo: Motivo) {
    console.log('Eliminar motivo: ', motivo);
    // Lógica para eliminar el motivo
    if (motivo.motivo) {
      this.motivosService.deleteMotivo(motivo).subscribe({
        next: (response) => {
          console.log('Respuesta de la API al eliminar motivo: ', response);
          if (response.success) {
            this.loadMotivos();
          } else {
            console.error('Error al eliminar motivo: ', response);
            this.errorMessage = 'Error al eliminar el motivo';
          }
        },
        error: (err) => {
          console.error('Error en la solicitud de eliminación de motivo: ', err);
          this.errorMessage = 'Error en la solicitud de eliminación del motivo';
        },
      });
    }
  }
}
