import { StudentPremiumListComponent } from './student-premium-list/student-premium-list.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationDrawerComponent } from './navigationDrawer/navigationDrawer.component';
import { OffersComponent } from './offers/offers.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'navigation', component: NavigationDrawerComponent,children:[
    { path: 'home', component: HomeComponent},
    { path: '', component: OffersComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'offers', component: OffersComponent },
    { path: 'premium', component: StudentPremiumListComponent }
  ] },

  { path: '**',redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
