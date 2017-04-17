const FileMenu = {
  label: 'File',
  onClick: 'toggleFileMenu',
  cssClass: 'fileMenu',
  visible: false,
  items: [
    {
      label: 'New',
      onClick: 'fileNewMenu',
    },
    {
      label: 'Open...',
      onClick: 'fileOpenMenu',
    },
    {
      label: 'Save',
      onClick: 'fileSaveMenu',
    },
    {
      label: 'Save As...',
      onClick: 'fileSaveAsMenu',
    },
    {
      label: 'Print...',
      onClick: 'printMenu',
    },
    {
      label: 'Exit',
      onClick: 'exitNotepad',
    }
  ]
}

export default FileMenu