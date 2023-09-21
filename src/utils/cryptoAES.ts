import CryptoJS from 'crypto-js'

// Methods for encrypt using AES256
export const encrypt = (data: any, key: string) => {
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    keySize: process.env.REACT_APP_KEY_SIZE,
    iv: CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV!),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return encrypted.toString()
}

// Methods for decrypt using AES256
export function decrypt(text: any, key: string) {
  console.log('text', text, 'key', key)
  var bytes = CryptoJS.AES.decrypt(text, key, {
    keySize: process.env.REACT_APP_KEY_SIZE!,
    iv: CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV!),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
