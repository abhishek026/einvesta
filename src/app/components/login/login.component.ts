import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<any>;

  constructor(private fb: FormBuilder,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this.loaderService.showLoader();
    //this.toastService.showSuccess("I am Abhishek Kumar","Success!")
  }
  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      if (username === 'admin' && password === 'admin') {
        this.auth.login(username,password)
        this.router.navigate(['/strategy-home']);
      } else {
        this.toastService.showError("Invalid Username and Password!!")
      }
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
