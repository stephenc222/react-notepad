const FormatMenu = {
  label: 'Format',
  onClick: 'toggleFormatMenu',
  cssClass: 'formatMenu',
  visible: false,
  items: [
    {
      label: 'Word Wrap',
      onClick: 'formatWordWrap'
    },
    {
      label: 'Font...',
      onClick: 'formatFont',
    }
  ]
}

export default FormatMenu