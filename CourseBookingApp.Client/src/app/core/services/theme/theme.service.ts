import { Injectable } from '@angular/core';
import { ThemeType } from '../../models/enums/theme-type.enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'app-theme';

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey) as ThemeType | null;
    if (savedTheme === ThemeType.Dark) {
      this.enableTheme(ThemeType.Dark);
    } else {
      this.enableTheme(ThemeType.Light);
    }
  }

  enableTheme(theme: ThemeType) {
    if (theme === ThemeType.Dark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    this.enableTheme(isDark ? ThemeType.Light : ThemeType.Dark);
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }

  getCurrentTheme(): ThemeType {
    return this.isDarkMode() ? ThemeType.Dark : ThemeType.Light;
  }
}
