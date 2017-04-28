import getIndexOfPosition from './getIndexOfPosition'

export default function selectFindText (findInFile,documentContent,matchCase) {
  const foundInFileArray = []      
  const content = documentContent
  let findRe = new RegExp(`${findInFile}`, 'g')
  for (let row in content) {
    let rowString = content[row]
    let findInFileRow = findInFile
    if (!matchCase) {
      rowString = rowString.toLowerCase()
      findInFileRow = findInFileRow.toLowerCase()
      findRe = new RegExp(`${findInFileRow}`, 'g')      
    }
    if (rowString.match(findRe) && findInFileRow !== '') {
      let count = 0
      const indexArr = []
      const foundStrings = rowString.split(findInFileRow)

      for (let indexPos in foundStrings) {
        if (indexPos < foundStrings.length - 1) {
          count += foundStrings[indexPos].length
          indexArr.push(count)

          const found = {
            row: parseInt(row, 10),
            startColumn: count,
            endColumn: count + findInFileRow.length - 1,
            data: rowString.substring(count, count + findInFileRow.length),
            startIndex: getIndexOfPosition(
              documentContent,
              {
                column: count, 
                row:parseInt(row, 10)
              }
            ),
            endIndex: getIndexOfPosition(
              documentContent,
              {
                column: count + findInFileRow.length - 1,
                row:parseInt(row, 10)
              }
            )
          }                                

          foundInFileArray.push(found)
          count += findInFileRow.length
        }
      }
    }
  }
  return foundInFileArray
}