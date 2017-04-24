export default function typeAhead (fileName, userGists) {
  const resultArr = []
  for (let gist in userGists) {
    if (gist) {
      for (let file in userGists[gist]) {
        if (file) {
          let nameToCheck = userGists[gist][file].name
          let fileRe = new RegExp(`${fileName}`)
          if(fileRe.exec(`${nameToCheck}`)) {
            const result = {}
            result.name = nameToCheck
            result.url = userGists[gist][file].url
            result.id = userGists[gist][file].id
            result.public = userGists[gist][file].public
            resultArr.push(result)
          }
        }
      }
    }
  }
  return resultArr
}

// TODO: for handling large gists, to create batches of content to store
    // instead of a single massive object

    // const getLinearChunk = (content, { start, end }) => {
    //   const chunk = []

    //   let currentRow = start.row

    //   while (currentRow <= end.row) {
    //     const rowData = content[currentRow]

    //     if (rowData.length) {
    //       let currentColumn = currentRow === start.row ? start.column : 0

    //       const lastColumn = currentRow === end.row ? end.column + 1 : rowData.length
          
    //       while (currentColumn < lastColumn) {
    //         chunk.push(rowData[currentColumn])
    //         currentColumn += 1
    //       }

    //       currentRow !== end.row && chunk.push(String.fromCharCode(0xbb))
    //     }

    //     currentRow += 1
    //   }

    //   return chunk
    // }