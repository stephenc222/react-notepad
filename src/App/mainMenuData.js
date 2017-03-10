const mainMenu = {
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
              onClick: 'fileSaveAsMenu'
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
              onClick: 'exitNotepad'
            }
          ]
        }
      },
      {
        label: 'Edit',
        onClick: 'toggleEditMenu',
        menu: 'editMenu',
        subLevel: {
          visible: false,
          items: [
            {
              label: 'Undo',
              onClick: 'editUndo'
            },
            {
              label: 'Cut',
              onClick: 'editCut'
            },
            {
              label: 'Copy',
              onClick: 'editCopy'
            },
            {
              label: 'Paste',
              onClick: 'editPaste'
            },
            {
              label: 'Delete',
              onClick: 'editDelete'
            },
            {
              label: 'Find...',
              onClick: 'editFind'
            },
            {
              label: 'Find Next',
              onClick: 'editFindNext'
            },
            {
              label: 'Replace...',
              onClick: 'editReplace'
            },
            {
              label: 'Go To...',
              onClick: 'editGoTo'
            },
            {
              label: 'Select All',
              onClick: 'editSelectAll'
            },
            {
              label: 'Time/Date',
              onClick: 'editTimeDate'
            }
          ]
        }
      },
      {
        label: 'Format',
        onClick: 'toggleFormatMenu',
        menu: 'formatMenu',
        subLevel: {
          visible: false,
          items: [
            {
              label: 'Word Wrap',
              onClick: 'formatWordWrap'
            },
            {
              label: 'Font...',
              onClick: 'formatFont'
            }
          ]
        }
      },
      {
        label: 'View',
        onClick: 'toggleViewMenu',
        menu: 'viewMenu',
        subLevel: {
          visible: false,
          items: [
            {
              label: 'Status Bar',
              onClick: 'viewStatusBar'
            }
          ]
        }
      },
      {
        label: 'Help',
        onClick: 'toggleHelpMenu',
        menu: 'helpMenu',
        subLevel: {
          visible: false,
          items: [
            {
              label: 'View Help',
              onClick: 'helpViewHelp'
            },
            {
              label: 'About Notepad',
              onClick: 'helpAboutNotepad'
            }
          ]
        }
      }
    ]
  }
}


export default mainMenu