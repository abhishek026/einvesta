import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  // Success toast
  showSuccess(message: string, title: string = ''): void {
    this.toastr.success(message, title);
  }

  // Error toast
  showError(message: string, title: string = ''): void {
    this.toastr.error(message, title);
  }

  // Info toast
  showInfo(message: string, title: string = ''): void {
    this.toastr.info(message, title);
  }

  // Warning toast
  showWarning(message: string, title: string = ''): void {
    this.toastr.warning(message, title);
  }
}
