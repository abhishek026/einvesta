import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = 'John Doe';
  portfolio = [
    { name: 'AAPL', price: '$150.75', change: +1.23 },
    { name: 'GOOGL', price: '$2750.10', change: -0.85 },
    { name: 'TSLA', price: '$690.20', change: +3.14 }
  ];
  liveStocks = [
    { name: 'AMZN', price: '$3450.50', change: +2.01 },
    { name: 'MSFT', price: '$299.99', change: -0.67 }
  ];

  ngOnInit(): void {}

  buyStock(): void {
    alert('Redirecting to Buy Stocks page...');
  }

  sellStock(): void {
    alert('Redirecting to Sell Stocks page...');
  }

  viewReports(): void {
    alert('Redirecting to Reports page...');
  }
}
