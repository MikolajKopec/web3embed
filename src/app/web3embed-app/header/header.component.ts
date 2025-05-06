import { Component, inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthStore);

}
