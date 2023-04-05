import { Component, OnInit } from '@angular/core';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { LoginService } from 'app/login/login.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/user-list', title: constantsProps.USER_DETAILS.USER_LIST_PAGE_NAME ,  icon:'pe-7s-user', class: '' },    
    { path: '/add-user', title: constantsProps.USER_DETAILS.USER_ADD_PAGE_NAME,  icon:'pe-7s-add-user', class: '' },
    { path: '/dataset-list', title: constantsProps.DATASET_DETAILS.DATASET_LIST_PAGE_NAME ,  icon:'pe-7s-user', class: '' },    
    { path: '/add-dataset', title: constantsProps.DATASET_DETAILS.DATASET_ADD_PAGE_NAME,  icon:'pe-7s-add-user', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  props = constantsProps;
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  // Logout current User
  logout() {
    this.loginService.logout();
  }
}
