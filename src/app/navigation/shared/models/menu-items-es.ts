import { MenuItem } from './menu.model';

export const MenuItems: MenuItem[] = [
    { id: 'clientes', name: 'Clientes', collapsed:true},
    { id: 'facturacion-proveedores', name: 'Facturacion de Proveedores', collapsed:true, childrens: [
      { id: 'proveedores',
        name: 'Proveedores',
        icon: '',
        url: '',
        enabled: true,
        tooltip: 'Proveedores',
        inSideBar: true
      },
    ]},
    { id: 'menu-nav', name: 'Menu nav', collapsed:true, childrens: [
      { id: 'sidenav',
        name: 'sidenav',
        icon: '',
        url: '/sidenav',
        enabled: true,
        tooltip: 'Proveedores',
        inSideBar: true
      },
    ]}

  ];

