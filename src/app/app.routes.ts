import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import ('./pages/home-page/home-page.component' ).then( m => m.HomePageComponent)
    },
    {
        path: 'Characters',
        loadComponent: () => import ('./pages/characters-page/characters-page.component' ).then(m => m.CharactersPageComponent)
    },
    {
        path: 'Episodes',
       loadComponent: () => import ('./pages/episode-page/episode-page.component' ).then(m => m.EpisodePageComponent)
    },
    {
        path: 'Locations',
        loadComponent: () => import ('./pages/location-page/location-page.component' ).then(m => m.LocationPageComponent)
    },
];
