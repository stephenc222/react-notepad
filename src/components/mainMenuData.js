const mainMenu = {
  fileMenu: {
    visible: false,
    items: [
      {
        label: 'New',
        onClick: 'fileNewMenu'
      },
      {
        label: 'Save',
        onClick: 'fileSaveMenu'
      },
      {
        label: 'Open',
        onClick: 'fileOpenMenu'
      }
    ]
  },
  
  editMenu: {
  },
  
  viewMenu: {
  },
  
  topLevel: {
    items: [
      {
        label: 'File',
        onClick: 'toggleFileMenu',
        menu: 'fileMenu'
      },
      {
        label: 'Edit',
        menu: 'editMenu'
      },
      {
        label: 'Format',
        menu: 'formatMenu'
      },
      {
        label: 'View',
        menu: 'viewMenu'
      }
    ]
  }
}


export default mainMenu