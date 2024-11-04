export interface MenuItem {
    id: string;
    name: string;
    collapsed: boolean;
    childrens?: MenuItemChildren[];
}

export interface MenuItemChildren {
    id: string;
    name: string;
    icon: string;
    url: string;
    enabled: boolean;
    tooltip: string;
    inSideBar: boolean;
}


export interface VerticalMenuItem {
    id: string;
    name: string;
    icon: string;
    disabled: boolean;
}
