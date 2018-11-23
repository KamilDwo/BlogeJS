function RandomString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function RandomTitle(characters, type) {
  let text = ''
  let possible = ''

  if (type === 1) {
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '
  } else if (type === 3) {
    possible = 'abcdefghijklmnopqrstuvwxyz'
  } else {
    possible = '123456789'
  }
  for (let i = 0; i < characters; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export { RandomString, RandomTitle, RandomInt }
