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
              label: 'Open...',
              onClick: 'fileOpenMenu'
            },
            {
              label: 'Save',
              onClick: 'fileSaveMenu'
            },
            {
              label: 'Save As...',
              onClick: 'fileSaveAsnMenu'
            },
            {
              label: 'Page Setup...',
              onClick: 'pageSetUpMenu'
            },
            {
              label: 'Print...',
              onClick: 'printMenu'
            },
            {
              label: 'Exit',
              onClick: 'exitReact'
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
              label: 'Undo',
              onClick: 'undoOption'
            },
            {
              label: 'Cut',
              onClick: 'cutOption'
            },
            {
              label: 'Copy',
              onClick: 'copyOption'
            },
            {
              label: 'Paste',
              onClick: 'pasteOption'
            },
            {
              label: 'Delete',
              onClick: 'deleteOption'
            },
            {
              label: 'Find...',
              onClick: 'FindOption'
            },
            {
              label: 'Find Next',
              onClick: 'findNextOption'
            },
            {
              label: 'Replace...',
              onClick: 'ReplaceOption'
            },
            {
              label: 'Go To...',
              onClick: 'goToOption'
            },
            {
              label: 'Select All',
              onClick: 'undoMenu'
            },
            {
              label: 'Time/Date',
              onClick: 'timeDateOption'
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
              label: 'Word Wrap',
              onClick: 'wordWrapOption'
            },
            {
              label: 'Font...',
              onClick: 'fontOption'
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
              label: 'Status Bar',
              onClick: 'statusBarMenu'
            }
          ]
        }
      },
      {
        label: 'Help',
        menu: 'helpMenu',
        subLevel: {
          visible: false,
          items: [
            {
              label: 'View Help',
              onClick: 'helpMenu'
            },
            {
              label: 'About Notepad',
              onClick: 'aboutNotepadMenu'
            }
          ]
        }
      }
    ]
  }
}


export default mainMenu