import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentTime: string = '';
  currentDate: string = '';
  currentDay: string = '';
  currentMonthYear: string = '';
  weekdays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  dates: { day: number; isToday: boolean; isCurrentMonth: boolean }[] = [];

  ngOnInit(): void {
    this.updateTimeAndDate();
    this.generateCalendar();
  }

  updateTimeAndDate() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    this.currentDay = now.getDate().toString();
    this.currentMonthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  generateCalendar() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Populate previous month's dates
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      this.dates.push({ day: prevMonthDays - i, isToday: false, isCurrentMonth: false });
    }

    // Populate current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
      this.dates.push({ day: i, isToday: i === now.getDate(), isCurrentMonth: true });
    }

    // Populate next month's dates
    const remainingDates = 42 - this.dates.length;
    for (let i = 1; i <= remainingDates; i++) {
      this.dates.push({ day: i, isToday: false, isCurrentMonth: false });
    }
  }

}
