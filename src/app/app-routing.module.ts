import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '2021',
    loadChildren: () =>
      import('./index/index.module').then((mod) => mod.IndexModule),
  },
  {
    path: '',
    redirectTo: '/2021',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./error/error.module').then((mod) => mod.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
