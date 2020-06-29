import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

//blok kelika belum login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['welcome']);

const routes: Routes = [
  //blok kelika belum login
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'addberita', loadChildren: './addberita/addberita.module#AddberitaPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'edit-news', loadChildren: './edit-news/edit-news.module#EditNewsPageModule', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'berita/:idBerita',
    loadChildren: () => import('./berita/berita.module').then( m => m.BeritaPageModule)
  },
  {
    path: 'edit-news/:idBerita',
    loadChildren: () => import('./edit-news/edit-news.module').then( m => m.EditNewsPageModule)
  },
  {
    path: 'addberita',
    loadChildren: () => import('./addberita/addberita.module').then( m => m.AddberitaPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
