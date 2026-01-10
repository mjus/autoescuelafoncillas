import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentTestimonial = 0;
  testimonialInterval: any;

  // Flota slider properties
  flotaImages: string[] = [
    'assets/img/flota/1000028958.jpg',
    'assets/img/flota/1000028959.jpg',
    'assets/img/flota/1000028960.jpg',
    'assets/img/flota/autobus_nuevo.jpg',
    'assets/img/flota/flota-1.jpeg',
    'assets/img/flota/flota-2.jpeg',
    'assets/img/flota/flota-3.jpeg',
    'assets/img/flota/nosotros-3.jpg'
  ];
  currentFlotaSlide = 0;
  get flotaSlides(): number {
    return this.flotaImages.length;
  }

  ngOnInit() {
    // Counter animation will be handled by service
  }

  ngAfterViewInit() {
    this.initializeAnimations();
    this.initializeTestimonials();
    this.initializeCounters();
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

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.dot');
    
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

    // Dot navigation
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
      });
    });
  }

  initializeCounters() {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber) {
            this.animateCounter(statNumber);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  animateCounter(element: Element) {
    const target = parseInt(element.getAttribute('data-target') || '0');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toString();
      }
    };
    
    updateCounter();
  }

  // Flota slider methods
  prevFlotaSlide() {
    this.currentFlotaSlide = (this.currentFlotaSlide - 1 + this.flotaSlides) % this.flotaSlides;
  }

  nextFlotaSlide() {
    this.currentFlotaSlide = (this.currentFlotaSlide + 1) % this.flotaSlides;
  }

  goToFlotaSlide(index: number) {
    if (index >= 0 && index < this.flotaSlides) {
      this.currentFlotaSlide = index;
    }
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.error('Error loading image:', img.src);
    // Hide the broken image
    img.style.display = 'none';
  }

  ngOnDestroy() {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }
}

