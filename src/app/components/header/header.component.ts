import { Component, HostListener, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMenuOpen = false;
  
  // Variables para detectar swipe
  private touchStartY = 0;
  private touchEndY = 0;
  private minSwipeDistance = 50; // Distancia mínima para considerar un swipe

  constructor(private router: Router) {
    // Cerrar menú al navegar solo en móvil
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (window.innerWidth <= 768) {
        this.closeMenu();
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.nav-menu');
    const toggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    // En móvil: cerrar al hacer click fuera del menú
    if (window.innerWidth <= 768) {
      if (this.isMenuOpen && 
          menu && 
          toggle && 
          !menu.contains(target) && 
          !toggle.contains(target)) {
        this.closeMenu();
      }
    } else {
      // En desktop: cerrar al hacer click fuera del nav-wrapper cuando el menú está activo
      if (this.isMenuOpen && 
          navWrapper && 
          menu &&
          !navWrapper.contains(target) && 
          !menu.contains(target)) {
        this.closeMenu();
      }
    }
  }

  ngOnInit() {
    this.onWindowScroll();
  }

  ngOnDestroy() {
    // Limpiar listeners si es necesario
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Manejar inicio del touch para detectar swipe
  onTouchStart(event: TouchEvent) {
    if (window.innerWidth <= 768 && this.isMenuOpen) {
      this.touchStartY = event.touches[0].clientY;
      this.touchEndY = this.touchStartY; // Inicializar touchEndY
    }
  }

  // Manejar movimiento del touch
  onTouchMove(event: TouchEvent) {
    if (window.innerWidth <= 768 && this.isMenuOpen) {
      this.touchEndY = event.touches[0].clientY;
    }
  }

  // Manejar fin del touch y detectar swipe up
  onTouchEnd(event: TouchEvent) {
    if (window.innerWidth <= 768 && this.isMenuOpen) {
      const swipeDistance = this.touchStartY - this.touchEndY;
      const menu = document.querySelector('.nav-menu');
      
      // Solo cerrar si:
      // 1. El swipe es hacia arriba (touchStartY > touchEndY)
      // 2. La distancia es suficientemente larga
      // 3. El swipe comenzó en la parte superior del menú (primeros 100px)
      if (swipeDistance > this.minSwipeDistance && menu) {
        const target = event.target as HTMLElement;
        const menuElement = menu as HTMLElement;
        const touchStartRelativeY = this.touchStartY - menuElement.getBoundingClientRect().top;
        
        // Si el swipe comenzó en la parte superior del menú (área del header/padding-top)
        if (touchStartRelativeY < 150) {
          this.closeMenu();
        }
      }
      
      // Resetear valores
      this.touchStartY = 0;
      this.touchEndY = 0;
    }
  }
}

