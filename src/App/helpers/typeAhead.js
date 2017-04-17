export default function typeAhead (fileName, userGists) {
  // console.log(`TypeAhead fileName: ${fileName}`)
  // console.log(`TypeAhead userGists:`)
  // console.log(userGists)
  let gistName = ''
  let gistRawURL = ''
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
            gistName = nameToCheck
            gistRawURL = userGists[gist][file].url
            return {gistName, gistRawURL}
          }

          //console.log(`will open: ${/${}/nameToCheck}`)
        }
      }
    }
  }
}