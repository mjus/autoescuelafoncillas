import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

interface PermitInfo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  age: string;
  requirements: string[];
  vehicles: string[];
  exams: string[];
  icon: string;
  images: string[];
}

@Component({
  selector: 'app-permiso-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './permiso-detalle.component.html',
  styleUrls: ['./permiso-detalle.component.css']
})
export class PermisoDetalleComponent implements OnInit {
  permitId: string = '';
  permitInfo: PermitInfo | null = null;

  permits: { [key: string]: PermitInfo } = {
    'A': {
      id: 'A',
      name: 'Permiso A',
      fullName: 'Motocicletas sin limitación',
      description: 'El permiso A te permite conducir motocicletas sin limitación de potencia. Es el permiso más completo para motos.',
      age: '20 años (o 2 años con A2)',
      requirements: [
        'Tener 20 años cumplidos',
        'O tener el permiso A2 con al menos 2 años de antigüedad',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Motocicletas sin limitación de potencia',
        'Motocicletas de cualquier cilindrada',
        'Triciclos de motor con potencia superior a 15kW'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🏍️',
      images: ['assets/img/permisos/permiso-a-1.jpg', 'assets/img/permisos/permiso-a-2.jpg']
    },
    'Am': {
      id: 'Am',
      name: 'Permiso AM',
      fullName: 'Ciclomotores',
      description: 'El permiso AM te permite conducir ciclomotores de 2 o 3 ruedas y cuadriciclos ligeros. Ideal para empezar a conducir.',
      age: '15 años',
      requirements: [
        'Tener 15 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Ciclomotores de 2 ruedas',
        'Ciclomotores de 3 ruedas',
        'Cuadriciclos ligeros (hasta 50cc)'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🛵',
      images: ['assets/img/permisos/permiso-am-1.jpg', 'assets/img/permisos/permiso-am-2.jpg']
    },
    'A1': {
      id: 'A1',
      name: 'Permiso A1',
      fullName: 'Motocicletas hasta 125cc',
      description: 'El permiso A1 te permite conducir motocicletas hasta 125cc con una potencia máxima de 11kW. Perfecto para moverse por ciudad.',
      age: '16 años',
      requirements: [
        'Tener 16 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Motocicletas hasta 125cc',
        'Potencia máxima de 11kW',
        'Relación potencia/peso máxima de 0,1kW/kg'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🏍️',
      images: ['assets/img/permisos/permiso-a1-1.jpg', 'assets/img/permisos/permiso-a1-2.jpg']
    },
    'A2': {
      id: 'A2',
      name: 'Permiso A2',
      fullName: 'Motocicletas hasta 35kW',
      description: 'El permiso A2 te permite conducir motocicletas con una potencia máxima de 35kW. Un paso intermedio hacia el permiso A.',
      age: '18 años',
      requirements: [
        'Tener 18 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Motocicletas con potencia máxima de 35kW',
        'Relación potencia/peso máxima de 0,2kW/kg',
        'No puede exceder el doble de la potencia original'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🏍️',
      images: ['assets/img/permisos/permiso-a2-1.jpg', 'assets/img/permisos/permiso-a2-2.jpg']
    },
    'B': {
      id: 'B',
      name: 'Permiso B',
      fullName: 'Turismos manual o automático',
      description: 'El permiso B es el más solicitado y te permite conducir turismos y vehículos ligeros hasta 3.500 kg. Disponible en versión manual o automática. Esencial para la mayoría de conductores.',
      age: '18 años',
      requirements: [
        'Tener 18 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en circulación',
        'Realizar las clases prácticas obligatorias',
        'Disponible en transmisión manual o automática'
      ],
      vehicles: [
        'Turismos manual o automático',
        'Vehículos hasta 3.500 kg de MMA',
        'Hasta 8 plazas además del conductor',
        'Puede llevar remolque hasta 750 kg'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en circulación abierta',
        'Clases prácticas obligatorias'
      ],
      icon: '🚗',
      images: ['assets/img/permisos/coche-moderno.jpg', 'assets/img/permisos/permiso-b-1.jpg', 'assets/img/permisos/permiso-b-2.jpg']
    },
    'B%E': {
      id: 'B+E',
      name: 'Permiso B+E',
      fullName: 'Turismos con remolque',
      description: 'El permiso B+E te permite conducir turismos con remolques de más de 750 kg. Ideal para transportar cargas o remolques pesados.',
      age: '18 años',
      requirements: [
        'Tener el permiso B',
        'Tener 18 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Turismos con remolque superior a 750 kg',
        'MMA del conjunto no superior a 3.500 kg',
        'Remolques de cualquier peso (si el conjunto no supera 3.500 kg)'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🚗',
      images: ['assets/img/permisos/permiso-be-1.jpg', 'assets/img/permisos/permiso-be-2.jpg']
    },
    'C': {
      id: 'C',
      name: 'Permiso C',
      fullName: 'Camiones',
      description: 'El permiso C te permite conducir camiones y vehículos pesados. Esencial para el transporte profesional de mercancías.',
      age: '21 años',
      requirements: [
        'Tener 21 años cumplidos',
        'Tener el permiso B',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Camiones con MMA superior a 3.500 kg',
        'Hasta 8 pasajeros además del conductor',
        'Puede llevar remolque hasta 750 kg'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🚚',
      images: ['assets/img/permisos/permiso-c-1.jpg', 'assets/img/permisos/permiso-c-2.jpg']
    },
    'C+E': {
      id: 'C+E',
      name: 'Permiso C+E',
      fullName: 'Camiones con remolque',
      description: 'El permiso C+E te permite conducir camiones con remolques pesados. El permiso más completo para transporte profesional.',
      age: '21 años',
      requirements: [
        'Tener el permiso C',
        'Tener 21 años cumplidos',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Camiones con remolque de más de 750 kg',
        'Conjuntos de vehículos sin limitación de peso',
        'Vehículos articulados'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🚛',
      images: ['assets/img/permisos/permiso-ce-1.jpg', 'assets/img/permisos/permiso-ce-2.jpg']
    },
    'D': {
      id: 'D',
      name: 'Permiso D',
      fullName: 'Autobuses',
      description: 'El permiso D te permite conducir autobuses y vehículos para transporte de viajeros. Esencial para el transporte público y privado.',
      age: '24 años',
      requirements: [
        'Tener 24 años cumplidos',
        'Tener el permiso B',
        'Superar el examen teórico',
        'Superar el examen práctico en pista',
        'Superar el examen práctico en circulación'
      ],
      vehicles: [
        'Autobuses de más de 8 plazas',
        'Vehículos para transporte de viajeros',
        'Puede llevar remolque hasta 750 kg'
      ],
      exams: [
        'Examen teórico sobre normas de circulación',
        'Examen práctico en pista cerrada',
        'Examen práctico en circulación abierta'
      ],
      icon: '🚌',
      images: ['assets/img/permisos/permiso-d-1.jpg', 'assets/img/permisos/permiso-d-2.jpg']
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.permitId = params['id'] || '';
      // Decodificar el ID si viene codificado (B+E -> B%E, C+E -> C%E)
      if (this.permitId === 'B%E') {
        this.permitId = 'B+E';
      } else if (this.permitId === 'C%E') {
        this.permitId = 'C+E';
      }
      this.permitInfo = this.permits[this.permitId] || null;
    });
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      console.warn('Error loading image:', img.src);
      // En lugar de ocultar, mostrar un placeholder
      img.style.opacity = '0.5';
      img.alt = 'Imagen no disponible';
    }
  }
}

