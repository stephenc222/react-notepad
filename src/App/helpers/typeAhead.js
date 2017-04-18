export default function typeAhead (fileName, userGists) {
  // console.log(`TypeAhead fileName: ${fileName}`)
  // console.log(`TypeAhead userGists:`)
  // console.log(userGists)
  const resultArr = []
  // TODO: add regex to search filenames of gists against user input
  for (let gist in userGists) {
    if (gist) {
      //console.log(userGists[gist])
      for (let file in userGists[gist]) {
        if (file) {
          let nameToCheck = userGists[gist][file].name
          let fileRe = new RegExp(`${fileName}`)
          if(fileRe.exec(`${nameToCheck}`)) {
            // console.log(`will open: ${fileRe.exec(`${nameToCheck}`)}`)
            // console.log(`will really open: ${nameToCheck}`)
            const result = {}
            result.name = nameToCheck
            result.url = userGists[gist][file].url
            result.id = userGists[gist][file].id
            result.public = userGists[gist][file].public
            // return {name, url}
            resultArr.push(result)
          }
          //console.log(`will open: ${/${}/nameToCheck}`)
        }
      }
    }
  }
  console.log('array is:')
  console.log(resultArr)
  return resultArr
}