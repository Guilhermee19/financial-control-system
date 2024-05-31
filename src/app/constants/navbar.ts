export type TypeProfile = 'Desenvolvedor' | 'Admin';

export const NAVBAR_PAGES: {
  label: string;
  icon: string;
  link: string;
  roles: TypeProfile[];
}[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Finanças',
    icon: 'finance',
    link: '/finance',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Cartão',
    icon: 'cards',
    link: '/cards',
    roles: ['Admin', 'Desenvolvedor'],
  },
];
