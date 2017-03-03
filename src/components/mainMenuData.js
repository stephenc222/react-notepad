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
        menu: 'fileMenu',
        subLevel: {
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
        }
      },
      {
        label: 'Edit',
        menu: 'editMenu',
        subLevel: {
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
        }
      },
      {
        label: 'Format',
        menu: 'formatMenu',
        subLevel: {
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
        }
      },
      {
        label: 'View',
        menu: 'viewMenu',
        subLevel: {
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
        }
      }
    ]
  }
}


export default mainMenu