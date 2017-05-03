export default function getIndexOfPosition (content, {column, row}) {
  let index = 0
  let currentRow = 0

  const charactersToCount = (currentRow, rowData) => {
    if (currentRow === row) {
      return 1 + rowData.length + (-1 * (rowData.length - column))
    } else {
      return rowData.length + 1
    }
  }

  while (currentRow <= row) {
    const rowData = content[currentRow]

    if (rowData.length) {
        index += charactersToCount(currentRow, rowData)
    }

    currentRow += 1
  }
  return index
}