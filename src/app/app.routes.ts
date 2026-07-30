import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'pt', children: [] },
  { path: 'en', children: [] },
  { path: '', redirectTo: 'pt', pathMatch: 'full' }
];
