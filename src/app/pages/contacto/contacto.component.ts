import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  onSubmit(form: any) {
    if (form.valid) {
      alert('¡Mensaje enviado! Te responderemos lo antes posible.');
      form.reset();
    }
  }
}

