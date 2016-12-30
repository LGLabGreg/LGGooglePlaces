import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }   from './components/home/home.component';
//import { UsersComponent }   from './components/users/users.component';
//import { UserComponent }   from './components/users/user.component';
//import { UserCreateComponent }   from './components/users/user-create.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  //{ path: 'users',  component: UsersComponent },
  //{ path: 'user/create',  component: UserCreateComponent },
  //{ path: 'user/:id',  component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}