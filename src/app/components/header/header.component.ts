import { Component, HostListener, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;

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
    // Solo cerrar con click en móvil, en desktop el hover maneja la visibilidad
    if (window.innerWidth <= 768) {
      const target = event.target as HTMLElement;
      const menu = document.querySelector('.nav-menu');
      const toggle = document.querySelector('.menu-toggle');
      
      if (this.isMenuOpen && 
          menu && 
          toggle && 
          !menu.contains(target) && 
          !toggle.contains(target)) {
        this.closeMenu();
      }
    }
  }

  ngOnInit() {
    this.onWindowScroll();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    // Solo cerrar el menú en móvil, en desktop se cierra automáticamente al salir del hover
    if (window.innerWidth <= 768) {
      this.isMenuOpen = false;
    }
  }
}

