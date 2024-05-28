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
    icon: 'dashboard',
    link: '/',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Noclock',
    icon: 'time_tracker',
    link: '/noclock',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Calendário',
    icon: 'calendar',
    link: '/calendar',
    roles: ['Admin', 'Desenvolvedor'],
  },
  {
    label: 'Projetos',
    icon: 'projects',
    link: '/projects',
    roles: ['Admin', 'Desenvolvedor'],
  },
];
