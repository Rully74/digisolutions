import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Motivo } from '../../core/motivo.model';

export interface MotivoFormDialogData {
  mode: 'create' | 'edit';
  motivo?: Motivo;
}

@Component({
  selector: 'app-motivo-form-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './motivo-form-dialog.component.html',
  styleUrl: './motivo-form-dialog.component.css',
})
export class MotivoFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MotivoFormDialogComponent, Motivo | undefined>);
  data = inject<MotivoFormDialogData>(MAT_DIALOG_DATA);

  isEditMode = this.data.mode === 'edit';

  form = this.fb.nonNullable.group({
    motivo: [{ value: this.data.motivo?.motivo ?? '', disabled: this.isEditMode }, Validators.required],
    tipo: [this.data.motivo?.tipo ?? '', Validators.required],
    descripcion: [this.data.motivo?.descripcion ?? '', Validators.required],
    tipo_motivo: [this.data.motivo?.tipo_motivo ?? '', Validators.required],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }
}
