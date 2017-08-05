const ViewMenu = {
  label: 'View',
  onClick: 'toggleViewMenu',
  cssClass: 'viewMenu',
  visible: false,
  items: [
    {
      label: 'Status Bar',
      onClick: 'viewStatusBar'
    },
    {
      label: 'toggle Dev Mode',
      onClick: 'switchDevMode'
    }
  ]
}

export default ViewMenu