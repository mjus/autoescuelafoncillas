import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-area-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './area-alumnos.component.html',
  styleUrls: ['./area-alumnos.component.css']
})
export class AreaAlumnosComponent {
  onSubmit(form: any) {
    if (form.valid) {
      alert('Redirigiendo al área de alumnos...');
      // Aquí iría la lógica de autenticación
    }
  }
}

