const HelpMenu = {
  label: 'Help',
  onClick: 'toggleHelpMenu',
  cssClass: 'helpMenu',
  visible: false,
  items: [
    {
      label: 'View Help',
      onClick: 'viewHelpBox',
    },
    {
      label: 'About React Notepad',
      onClick: 'helpAboutNotepad',
    }
  ]
}

export default HelpMenu