export const buildMainLinks = (makeAction: (path: string) => () => void) => [
  {
    label: 'Home',
    onClick: makeAction('home'),
    iconType: 'dashboardApp',
    isActive: true,
    extraAction: {
      alwaysShow: true,
    },
  },
  {
    label: 'Dashboard',
    onClick: makeAction('dashboard'),
    iconType: 'notebookApp',
  },
  {
    label: 'Explore',
    onClick: makeAction('explore'),
    iconType: 'notebookApp',
  },
]
