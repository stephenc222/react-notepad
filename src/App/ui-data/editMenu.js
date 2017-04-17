const EditMenu = {
  label: 'Edit',
  onClick: 'toggleEditMenu',
  cssClass: 'editMenu',
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
    },
    {
      label: 'Find Next',
      onClick: 'editFindNext'
    },
    {
      label: 'Replace...',
      onClick: 'editReplace',
    },
    {
      label: 'Go To...',
      onClick: 'editGoTo',
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

export default EditMenu