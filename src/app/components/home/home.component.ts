import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidebarExpanded: boolean = false;
  ngOnInit(): void {
    this.toastService.showSuccess("I am Abhishek Kumar","Success!");
  }
  constructor(private loaderService:LoaderService,private toastService: ToastService) {
  }

}
