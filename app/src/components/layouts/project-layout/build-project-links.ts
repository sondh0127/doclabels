export const buildProjectLinks = (makeAction: (path: string) => () => void) => [
  {
    label: 'Dashboard',
    onClick: makeAction('dashboard'),
    iconType: 'dashboardApp',
  },
  {
    label: 'Contributor',
    onClick: makeAction('contributor'),
    iconType: 'usersRolesApp',
  },
  {
    label: 'Label',
    onClick: makeAction('label'),
    iconType: 'indexPatternApp',
  },
  {
    label: 'Guideline',
    onClick: makeAction('guide'),
    iconType: 'canvasApp',
  },
  {
    label: 'Document',
    onClick: makeAction('document'),
    iconType: 'notebookApp',
  },
  {
    label: 'Settings',
    onClick: makeAction('setting'),
    iconType: 'advancedSettingsApp',
  },
]
