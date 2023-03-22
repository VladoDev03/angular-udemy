import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' }) this is the better option
export class AnalyticsService {
  registerClick() {
    console.log('Clicked!');
  }
}
