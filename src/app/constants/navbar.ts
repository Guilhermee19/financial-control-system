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
    label: 'Tag',
    icon: 'tag',
    link: '/tags',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Contas',
    icon: 'account',
    link: '/accounts',
    roles: ['Admin', 'Desenvolvedor'],
  },
  // {
  //   label: 'Categoria',
  //   icon: 'category',
  //   link: '/category',
  //   roles: ['Admin', 'Desenvolvedor'],
  // },
  // {
  //   label: 'Cartão',
  //   icon: 'cards',
  //   link: '/cards',
  //   roles: ['Admin', 'Desenvolvedor'],
  // },
  {
    label: 'Configuração',
    icon: 'config',
    link: '/config',
    roles: ['Admin', 'Desenvolvedor'],
  },
];
