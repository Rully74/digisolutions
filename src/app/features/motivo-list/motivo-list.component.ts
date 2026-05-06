import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MotivosService } from '../../services/motivos.service';
import { CommonModule } from '@angular/common';
import { Motivo } from '../../core/motivo.model';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MotivoFormDialogComponent, MotivoFormDialogData } from './motivo-form-dialog.component';

@Component({
  selector: 'app-motivo-list',
  templateUrl: './motivo-list.component.html',
  styleUrl: './motivo-list.component.css',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class MotivoListComponent implements OnInit {
  motivos: Motivo[] = [];
  motivosFiltered: Motivo[] = [];
  valueToFilter: string = '';
  motivosService = inject(MotivosService);
  private dialog = inject(MatDialog);
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

  // Metodo para crear un nuevo motivo
  createMotivo() {
    this.openMotivoForm({ mode: 'create' });
  }

  // Metodo editar un motivo
  editMotivo(motivo: Motivo) {
    this.openMotivoForm({ mode: 'edit', motivo });
  }

  // Metodo eliminar un motivo (a implementar)
  deleteMotivo(motivo: Motivo) {
    console.log('Eliminar motivo: ', motivo);
    // Lógica para eliminar el motivo
    if (motivo.motivo) {
      this.loading = true;
      this.errorMessage = '';
      this.motivosService.deleteMotivo(motivo).subscribe({
        next: (response) => {
          console.log('Respuesta de la API al eliminar motivo: ', response);
          if (response.success) {
            this.motivos = this.motivos.filter((item) => item.motivo !== motivo.motivo);
            this.filterMotivos();
          } else {
            console.error('Error al eliminar motivo: ', response);
            this.errorMessage = 'Error al eliminar el motivo';
          }
          this.loading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error en la solicitud de eliminación de motivo: ', err);
          this.errorMessage = 'Error en la solicitud de eliminación del motivo';
          this.loading = false;
          this.cdr.markForCheck();
        },
      });
    }
  }

  private openMotivoForm(data: MotivoFormDialogData) {
    const dialogRef = this.dialog.open(MotivoFormDialogComponent, {
      data,
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((motivo) => {
      if (!motivo) {
        return;
      }

      if (data.mode === 'create') {
        this.saveNewMotivo(motivo);
      } else {
        this.saveEditedMotivo(motivo);
      }
    });
  }

  private saveNewMotivo(motivo: Motivo) {
    this.loading = true;
    this.errorMessage = '';
    this.motivosService
      .createMotivo(motivo)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Respuesta de la API al crear motivo: ', response);
          if (response.success) {
            this.loadMotivos();
          } else {
            console.error('Error al crear motivo: ', response);
            this.errorMessage = 'Error al crear el motivo';
          }
        },
        error: (err) => {
          console.error('Error en la solicitud de creación de motivo: ', err);
          this.errorMessage = 'Error en la solicitud de creación del motivo';
        },
      });
  }

  private saveEditedMotivo(motivo: Motivo) {
    this.loading = true;
    this.errorMessage = '';
    this.motivosService
      .updateMotivo(motivo)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Respuesta de la API al actualizar motivo: ', response);
          if (response.success) {
            this.loadMotivos();
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
