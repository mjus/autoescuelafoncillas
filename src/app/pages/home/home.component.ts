import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FLOTA_IMAGES } from '../nosotros/flota-images';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentFlotaSlide = 0;
  // Las imágenes se cargan dinámicamente desde flota-images.ts
  // que se genera automáticamente por el script generate-flota-images.ps1
  flotaImages: string[] = FLOTA_IMAGES;
  flotaSlideInterval: any;
  currentTestimonial = 0;
  testimonialInterval: any;

  get flotaSlides(): number {
    return this.flotaImages.length;
  }

  ngAfterViewInit() {
    // Inicializar animaciones AOS
    this.initializeAnimations();
    // Iniciar auto-slide para la flota
    this.startFlotaAutoSlide();
    // Inicializar testimonios
    this.initializeTestimonials();
  }

  ngOnDestroy() {
    if (this.flotaSlideInterval) {
      clearInterval(this.flotaSlideInterval);
    }
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, observerOptions);

    // Observar todas las tarjetas de imágenes
    document.querySelectorAll('.about-image-card[data-aos]').forEach(el => {
      // Hacer visible inmediatamente
      el.classList.add('aos-animate');
      observer.observe(el);
    });

    // Asegurar que las tarjetas why-card sean visibles
    document.querySelectorAll('.why-card[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.visibility = 'visible';
      observer.observe(el);
    });

    // Observar las tarjetas de cursos especiales
    document.querySelectorAll('.special-course-card[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.visibility = 'visible';
      observer.observe(el);
    });
  }

  startFlotaAutoSlide() {
    this.flotaSlideInterval = setInterval(() => {
      this.nextFlotaSlide();
    }, 2000); // Cambiar cada 2 segundos
  }

  nextFlotaSlide() {
    this.currentFlotaSlide = (this.currentFlotaSlide + 1) % this.flotaSlides;
  }

  prevFlotaSlide() {
    this.currentFlotaSlide = (this.currentFlotaSlide - 1 + this.flotaSlides) % this.flotaSlides;
  }

  goToFlotaSlide(index: number) {
    this.currentFlotaSlide = index;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      console.error('Error loading image:', img.src);
      // No ocultar la imagen en el slider, solo mostrar un mensaje
      img.style.opacity = '0.5';
      img.alt = 'Imagen no disponible';
    }
  }

  initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-modern-card');
    const testimonialDots = document.querySelectorAll('.dot-modern');
    
    if (testimonialCards.length === 0) return;

    const showTestimonial = (index: number) => {
      testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      this.currentTestimonial = index;
    };

    // Auto-rotate testimonials
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(this.currentTestimonial);
    }, 5000);

    // Click on dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
  }
}
