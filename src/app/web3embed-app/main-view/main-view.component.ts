import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
@Component({
  selector: 'app-main-view',
  standalone: false,
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
  public authStore = inject(AuthStore);
  constructor(private router: Router) { 
    this.authStore.restoreFromStorage();
  }

  ngOnInit(): void {
    if(!this.authStore.isLoggedIn()){
      this.router.navigate(['/app/auth/login']);
    }else{
      this.router.navigate(['/app']);
    } 
  }
}
