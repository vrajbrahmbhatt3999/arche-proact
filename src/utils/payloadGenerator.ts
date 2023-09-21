import JSEncrypt from 'jsencrypt'
import { store } from '../redux/store/store'
import { encrypt, decrypt } from './cryptoAES'
import { IAPIPayload } from '../interfaces/apiInterface'

interface requestModel {
  requestId: string // userid_current-timestamp
  appId: string // WEB & MOBILE
  sessionId: string // optional SK or DK
  userId: string // Current login user id
  isEncrypt: boolean // boolean true/false
  requestData: {
    // Data to be send in JSON stringified format
    customerAuthentication?: {
      // optional
      Otp?: {
        requestId: string
        customerMobileNo: string
        otpPin: string
        otpParam?: Object
      }
      // if there is other auth related data can be pass here...
    }
  }
}
export const requestGenerator = (payload: any): IAPIPayload => {
  const { encryptionKey } = store.getState().login
  let plainReqObj: requestModel = {
    requestId: `u_id${Date.now()}`,
    appId: `WEB`,
    sessionId: 'sk',
    userId: 'loggedInUser',
    isEncrypt: true,
    requestData: payload,
  }

  let enc = new JSEncrypt() // RSA
  const public_key = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1pwwWbKiwVd2L+Q6TGAe
  41qZYv+oaaHWMYuP1oZc+iSXX5zwHUvnN9AqGWKvZJVwpDSJ1LRcX5HAT//1X6HX
  439VJGtmm2gPdN5prIq8gReVemaQo4fIXILEahg4qyeQ4jhO74bl8aeZ3JBsgkVE
  0g5B9btWWYUym2/a74h6y5/DNIiKqYZTF7M5MDrsZg4gCRUCLTd8VIZfTdAp8zmq
  zP6EOY2oUd0zuFgrjO6sGYtZLiI/AUkQymn9KTNhzWngvvFWak1JFOqgQUGgpMnw
  TjKgSjNX15NzkF8zoesj+2scSPOS/GpM7eIHGD2uaL3e45AHBu+5vUJqge5yEfkp
  QwIDAQAB`
  enc.setPublicKey(public_key)
  let finalPayload = {
    payloadData: plainReqObj, // encrypt(plainReqObj, encryptionKey), // encryption of Plain Request Body should be pass here
    sessionId: encryptionKey, //enc.encrypt(encryptionKey), // encrypted SK or DK
    appChannelId: 1, // 0 = super admin , 1 = WebApp & 2 = MobileApp
  }

  // finalPayload will goes into

  return finalPayload
}

export const responseGenerator = (response: any) => {
  const { encryptionKey } = store.getState().login
  response.dk = decrypt(response.dk, encryptionKey)
  response.payloadResponse = decrypt(response.payloadResponse, response.dk)
  return response
}
