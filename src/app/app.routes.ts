import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CapComponent } from './pages/cap/cap.component';
import { CarnesProfesionalesComponent } from './pages/carnes-profesionales/carnes-profesionales.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { OtrosServiciosComponent } from './pages/otros-servicios/otros-servicios.component';
import { AreaAlumnosComponent } from './pages/area-alumnos/area-alumnos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { MatriculaComponent } from './pages/matricula/matricula.component';
import { AvisoLegalComponent } from './pages/aviso-legal/aviso-legal.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';
import { PermisoDetalleComponent } from './pages/permiso-detalle/permiso-detalle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cap', component: CapComponent },
  { path: 'carnes-profesionales', component: CarnesProfesionalesComponent },
  { path: 'permisos', component: PermisosComponent },
  { path: 'permiso/:id', component: PermisoDetalleComponent },
  { path: 'otros-servicios', component: OtrosServiciosComponent },
  { path: 'area-alumnos', component: AreaAlumnosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'matricula', component: MatriculaComponent },
  { path: 'aviso-legal', component: AvisoLegalComponent },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: '**', redirectTo: '' }
];

