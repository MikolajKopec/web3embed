import { Component } from '@angular/core';
import { Router } from '@angular/router';
interface SideMenuItem {
    name: string;
    link: string;
    icon?: string;
}
interface SideMenuCategory {
    name: string;
    items: SideMenuItem[];
}
interface SideMenu {
    categories: SideMenuCategory[];
}
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor( public router:Router){}
  sideMenu:SideMenu = {
    categories: [
      {
        name: 'Main',
        items: [
          {
            name: 'Dashboard',
            link: '/app/dashboard',
            icon: 'home'
    },
    {
      name: 'Offers',
      link: '/app/offers',
      icon: 'sell'
    }
  ] 
}
]}}
