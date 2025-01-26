import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: 'light' | 'dark' | 'auto' = 'auto';

  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.theme = theme;
    this.applyTheme();
  }

  getTheme() {
    return this.theme;
  }

  private applyTheme() {
    const html = document.documentElement;

    if (this.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      html.setAttribute('data-theme', this.theme);
    }
  }
}
