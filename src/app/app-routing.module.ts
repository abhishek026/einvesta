import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { StrategybuilderComponent } from './components/strategybuilder/strategybuilder.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StrategyHomeComponent } from './components/strategy-home/strategy-home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'strategy',
    component: StrategybuilderComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'order-history',
    component: OrderhistoryComponent
  },
  {
    path:'strategy-home',
    component:StrategyHomeComponent
  }
]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
