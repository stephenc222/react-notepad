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
                    file.public = gistArray[gist].public                                     
                    file.url = gistArray[gist].files[filePath].raw_url
                    multiFileGist.push(file)
                  } else {
                    let file = {}                    
                    file.name = gistArray[gist].files[filePath].filename
                    file.id = gistArray[gist].id   
                    file.public = gistArray[gist].public                 
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

function saveAsGist (url, postOptions) {
  const save = fetch(url, postOptions)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log('saved Gist as:', data.html_url)
  })
  .catch ( error => {
    console.error(`SAVE AS gist fetch error: ${error}`)
  })
  return Promise.resolve(save)
}

function saveGist (url,patchOptions) {
  fetch(url, patchOptions)
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    console.log('SAVE Gist -not- saved-as:', data.html_url)
  })
  .catch ( error => {
    console.error(`SAVE gist fetch error: ${error}`)
  })
}

function openGist (url, options) {
  //put fetch of onGistClick here
  const open = fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.text()
      }
    }).then ( text => {
      const gistTextData = text.split('\n')
      const newDocumentContent = []
      gistTextData.forEach(line => newDocumentContent.push(line))
      // 13 lines is how a full textarea is, roughly
      while (newDocumentContent.length < 13) { newDocumentContent.push('') }
      return newDocumentContent
    })
    .catch ( error => {
      console.error(`gist fetch error: ${error}`)
    })
  return Promise.resolve(open)
}

const Api = {
  getGists,
  saveAsGist,
  saveGist,
  openGist
}


// export {getGists, saveAsGist, saveGist}
export default Api