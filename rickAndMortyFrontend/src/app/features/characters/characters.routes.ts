import { Component } from "@angular/core";
import { CharactersComponent } from "./characters.component";
import { getActionCache } from "@angular/core/primitives/event-dispatch";
import { Title } from "@angular/platform-browser";
import { Routes } from "@angular/router";

export default [
    {
        path:'',
        component: CharactersComponent,
        children:[
            {
                path:'characters',
                title:'Characters',
                loadComponent: () => import('./characters-list/characters-list.component').then((m)=>m.CharactersListComponent)
            },
            {
                path:'characters-detail/:id',
                title:'Characters Detail',
                loadComponent: () => import('./characters-detail/characters-detail.component').then((m)=>m.CharactersDetailComponent)
            }
        ]
    },
    {
        path:'',
        redirectTo: 'characters',
        pathMatch: 'full',
    },

] as Routes;
    
