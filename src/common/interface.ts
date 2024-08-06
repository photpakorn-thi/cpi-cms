export interface ISidebarMenu {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: ISidebarMenu[];
}

export interface IUserData {
  name: string;
  role: string;
  email: string;
}
