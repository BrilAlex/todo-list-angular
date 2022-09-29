import {ResultCode} from "../enum/resultCode.enum";

export interface BaseResponse<T = {}> {
  resultCode: ResultCode
  data: T
  messages: string[]
  fieldsErrors: string[]
}
