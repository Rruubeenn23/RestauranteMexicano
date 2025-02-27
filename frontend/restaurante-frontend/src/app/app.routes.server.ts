import { Routes } from '@angular/router';
import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server  // ✅ Solo definimos renderMode aquí
  }
];

// ✅ Usamos las rutas normales para el enrutamiento de Angular
export const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];
