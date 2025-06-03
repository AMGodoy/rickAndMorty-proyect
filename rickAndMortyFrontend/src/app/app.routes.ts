import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'characters',
        pathMatch: 'full'
    },
    {
        path:'',
        loadChildren:() => import('./features/characters/characters.routes'),
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        title: 'Not Found'
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
