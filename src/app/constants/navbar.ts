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
    link: '/dashboard',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Finanças',
    icon: 'finance',
    link: '/finance',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Categorias',
    icon: 'category',
    link: '/category',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Contas',
    icon: 'account',
    link: '/accounts',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Cartão',
    icon: 'cards',
    link: '/cards',
    roles: ['Admin', 'Desenvolvedor'],
  },
  // {
  //   label: 'Relatórios',
  //   icon: 'report',
  //   link: '/report',
  //   roles: ['Admin', 'Desenvolvedor'],
  // },
  {
    label: 'Configuração',
    icon: 'config',
    link: '/config',
    roles: ['Admin', 'Desenvolvedor'],
  },
];
