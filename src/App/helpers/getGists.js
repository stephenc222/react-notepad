export
function getGists (url, options, callback) {
  const getRequest = fetch(url, options)
    .then(response => {
      const filesArray = []
      if (response.ok) {
        return response.json()
          .then(gistArray => {
            for (let gist in gistArray) {
              if (gist) {
              let multiFileGist = []
              for (let filePath in gistArray[gist].files) {
                if (Object.keys(gistArray[gist].files).length > 1) {
                    let file = {}
                    file.name = gistArray[gist].files[filePath].filename
                    file.id = gistArray[gist].id
                    file.url = gistArray[gist].files[filePath].raw_url
                    multiFileGist.push(file)
                  } else {
                    let file = {}                    
                    file.name = gistArray[gist].files[filePath].filename
                    file.id = gistArray[gist].id                    
                    file.url = gistArray[gist].files[filePath].raw_url
                    filesArray.push([file])
                  }
                }
                if (multiFileGist.length) {
                  filesArray.push(multiFileGist)
                }                           
              }               
            }
            return filesArray
          })
          .then (filesArray => {  
            callback(filesArray)
          })
        }
        throw new Error('problem with network response...')
    })
    .catch( error => {
      console.log(`problem with fetch of url: ${url} and error message: ${error.message}`)
    })
  return Promise.resolve(getRequest)  
}
