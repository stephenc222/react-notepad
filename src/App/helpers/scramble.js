export default function scramble (data) {
  // just obscures a bit of data from React devTools inspection, not a serious encyption algorithm
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  // 'data' is not accessible after the first call
  return (scramble) => {
      return (scramble  
      && data.split('').reduce((value) => { 
        let randomI = Math.floor(Math.random()*chars.length)
        return value += chars[randomI]
      }, '')) 
      || data
  }
}
