const mainMenu = {
  topLevel: {
    warningFromMenuItem: '',    
    items: [
      {
        label: 'File',
        onClick: 'toggleFileMenu',
        menu: 'fileMenu',
        showNotSavedWarningBox: false,
        subLevel: {
          visible: false,
          items: [
            {
              label: 'New',
              onClick: 'fileNewMenu',
              showNewFileBox: false,
            },
            {
              label: 'Open...',
              onClick: 'fileOpenMenu',
              showOpenFileBox: false,
              disableOtherMenuHandlers: false,
              gists: {
                fileNames: [],
                filePaths: [],
                files: []
              }
            },
            {
              label: 'Save',
              onClick: 'fileSaveMenu',
              showFirstSaveBox: false
            },
            {
              label: 'Save As...',
              onClick: 'fileSaveAsMenu',
              showSaveAsBox: false,
              disableOtherMenuHandlers: false,
            },
            // {
            //   label: 'Page Setup...',
            //   onClick: 'pageSetUpMenu'
            // },
            {
              label: 'Print...',
              onClick: 'printMenu',
              // showPrintFileBox: false,
              // disableOtherMenuHandlers: false
            },
            {
              label: 'Exit',
              onClick: 'exitNotepad',
              showExitNotepadBox: false,
              disableOtherMenuHandlers: false
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
              label: 'Redo',
              onClick: 'editRedo'
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
              onClick: 'editFind',
              showFindBox: false
            },
            {
              label: 'Find Next',
              onClick: 'editFindNext'
            },
            {
              label: 'Replace...',
              onClick: 'editReplace',
              showReplaceBox: false
            },
            {
              label: 'Go To...',
              onClick: 'editGoTo',
              showGoToBox: false
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
              onClick: 'formatFont',
              showFontBox: false
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
              onClick: 'viewHelpBox',
              showHelpBox: false
            },
            {
              label: 'About Notepad',
              onClick: 'helpAboutNotepad',
              showAboutBox: false
            }
          ]
        }
      }
    ]
  }
}


export default mainMenu