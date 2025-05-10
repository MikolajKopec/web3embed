import { Component } from '@angular/core';
import { inject } from "@vercel/analytics"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  analytics = inject()
}
