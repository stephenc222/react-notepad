export default function selectFindText (findInFile,documentContent,matchCase) {
  // console.log('target: ', findInFile)
  // needs to change, temporary
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
      console.log('findInFileRow: ', findInFileRow)
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
            data: rowString.substring(count, count + findInFileRow.length)
          }                                

          foundInFileArray.push(found)
          count += findInFileRow.length
        }
      }
    }
  }
  // console.log(foundInFileArray)
  return foundInFileArray
}