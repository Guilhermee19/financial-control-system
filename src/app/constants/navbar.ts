export type TypeProfile =
  | 'Desenvolvedor'
  | 'Admin';

export const NAVBAR_PAGES: {
  label: string;
  icon: string;
  link: string;
  roles: TypeProfile[];
}[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Finanças',
    icon: 'finance',
    link: '/finance',
    roles: ['Admin', 'Desenvolvedor'],
  },
];
