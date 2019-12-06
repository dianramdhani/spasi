interface State { to: string, params: {} }

interface SubMenu {
    label: string,
    state: State
}

export interface Menu {
    type: Type,
    label: string,
    icon?: string,
    state?: State,
    subMenus?: SubMenu[],
}

export enum Type {
    TITLE,
    LINK,
    HASSUBMENUS
}