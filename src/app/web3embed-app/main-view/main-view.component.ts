import { Component, inject } from '@angular/core';
import { AuthStore } from '../store/auth.store';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-main-view',
  standalone: false,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  public authStore = inject(AuthStore);
  public httpClient = inject(HttpClient);
}
