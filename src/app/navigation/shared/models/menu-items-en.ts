import { MenuItem } from './menu.model';

export const MenuItemsENG: MenuItem[] = [
    { id: 'dashboard', name: 'home', collapsed:true, childrens: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'home',
        url: '/dashboard',
        enabled: true,
        tooltip: 'Initial view',
        inSideBar: true
      }
    ]},
    { id: 'invoice', name: 'invoice', collapsed:true, childrens: [
      { id: 'invoice_list',
        name: 'List Invoice',
        icon: 'list',
        url: '/invoice/list',
        enabled: true,
        tooltip: 'List invoice',
        inSideBar: true
      },
      {
        id: 'invoice_add',
        name: 'new Invoice',
        icon: 'add',
        url: '/invoice/add',
        enabled: true,
        tooltip: 'new Invoice',
        inSideBar: true
      }
    ]},

  ];

