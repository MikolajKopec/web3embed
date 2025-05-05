// navigation.component.ts
import { Component, OnInit } from '@angular/core';

interface DropdownItem {
  label: string;
  link: string;
}

interface NavItem {
  label: string;
  link?: string;
  isDropdown: boolean;
  dropdownItems?: DropdownItem[];
  isActive?: boolean;
  dropdownOpen?: boolean; // Używamy nazwy 'dropdownOpen' dla zgodności z oryginalną logiką
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false,
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  userDropdownOpen = false;
  
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      isDropdown: false,
      isActive: true
    },
    {
      label: 'Offers',
      isDropdown: true,
      dropdownOpen: false,
      dropdownItems: [
        { label: 'Create Offer', link: '/offers/create' },
        { label: 'My Offers', link: '/offers/list' },
        { label: 'Payment History', link: '/offers/payments' }
      ]
    },
    {
      label: 'Wallets',
      isDropdown: true,
      dropdownOpen: false,
      dropdownItems: [
        { label: 'My Wallets', link: '/wallets/list' },
        { label: 'Add Wallet', link: '/wallets/add' }
      ]
    },
    {
      label: 'Settings',
      isDropdown: true,
      dropdownOpen: false,
      dropdownItems: [
        { label: 'Profile', link: '/settings/profile' },
        { label: 'Subscription Plan', link: '/settings/subscription' },
        { label: 'Notifications', link: '/settings/notifications' },
        { label: 'API Keys', link: '/settings/api-keys' }
      ]
    },
    {
      label: 'Documentation',
      link: '/docs',
      isDropdown: false
    },
    {
      label: 'Support',
      link: '/support',
      isDropdown: false
    }
  ];

  user = {
    initials: 'JS',
    name: 'John Smith',
    email: 'john.smith@example.com',
    subscription: 'Basic'
  };

  constructor() {}

  ngOnInit(): void {}

  // Sprawdzenie, czy jesteśmy w trybie mobilnym
  get isMobileView(): boolean {
    return window.innerWidth < 768;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  toggleUserDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.userDropdownOpen = !this.userDropdownOpen;
  }

  signOut(): void {
    // Logika wylogowania
    console.log('Signing out...');
  }
}