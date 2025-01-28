import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StrategybuilderComponent } from './components/strategybuilder/strategybuilder.component';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/core/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Required for animations
import { FormsModule } from '@angular/forms';
import { StrategyHomeComponent } from './components/strategy-home/strategy-home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TalbeComponent } from './components/talbe/talbe.component';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    StrategybuilderComponent,
    OrderhistoryComponent,
    LoaderComponent,
    StrategyHomeComponent,
    TalbeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    ToastrModule.forRoot({    // Configure the ToastrModule
      timeOut: 3000,          // Duration of toast in milliseconds
      positionClass: 'toast-top-right',  // Positioning the toast
      closeButton: true,      // Show close button
      progressBar: true,      // Show progress bar
      preventDuplicates: true // Prevent duplicate toasts
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
