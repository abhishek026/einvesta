import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    // Subscribe to the loader service's loader state to get visibility updates
    this.loaderService.loaderState$.subscribe(state => {
      this.isLoading = state;
    });
  }
}
