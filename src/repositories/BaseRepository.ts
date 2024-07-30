import { AppConfig } from '@configs/AppConfig'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

interface IRequestConfig extends Pick<AxiosRequestConfig, 'url' | 'params' | 'data' | 'headers' | 'method' | 'timeout' | 'cancelToken'> {}

interface IResponse {
  success: boolean
  data: any
  apiError: {
    message: string
    errorData: any
  }
}

export class BaseRepository {
  private ax: AxiosInstance

  constructor(baseURL: string | undefined) {
    const axiosOption: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
      headers: {},
      timeout: 60 * 60 * 1000,
    }

    if (AppConfig.ENV === 'LOCAL') {
      if (axiosOption.headers !== undefined) {
        // axiosOption.headers['x-auth-payload'] = process.env.REACT_APP_PAYLOAD as string
        axiosOption.headers['Authorization'] = ('Bearer ' + process.env.REACT_APP_AUTHORIZATION) as string
      }
    }

    this.ax = axios.create(axiosOption)
  }

  async requestWithAuth(requestConfig: IRequestConfig) {
    try {
      const result = await this.ax.request({
        ...requestConfig,
      })

      if (!!result && !!result.data) {
        const data = result.data as IResponse

        if (!data.success) {
          throw new Error(data.apiError.message)
        }
        return data.data
      } else {
        console.debug(result)
        throw new Error(`Unexpected Error: ${result.statusText}`)
      }
    } catch (e: any) {
      console.debug(e)
      // location.href = 'dev-datahub.na.nexon.com/error/' + e.status

      throw e
    }
  }

  async requestWithPopup(requestConfig: IRequestConfig, successFunc: Function, failFunc: Function) {
    try {
      const result = await this.ax.request({
        ...requestConfig,
      })

      if (result) {
        const statusCode = result.status
        const customMessage = this.getCustomMessageByStatusCode(statusCode)

        if (result.data) {
          const data = result.data as IResponse

          if (!data.success) {
            const apiErrorMessage = data.apiError.message
            console.error(apiErrorMessage)
            failFunc(apiErrorMessage)
            throw new Error(apiErrorMessage)
          } else {
            successFunc(customMessage)
          }
          return data.data
        } else {
          console.info(customMessage)
          console.debug(result)
          failFunc(customMessage)
          throw new Error(customMessage)
        }
      }
    } catch (e: any) {
      console.error(e)
      const customMessage = this.getCustomMessageByStatusCode(
        e.response.data.apiError.datahubErrorCode ? e.response.data.apiError.datahubErrorCode : 500,
      )
      console.info(customMessage)
      console.debug(e)
      failFunc(customMessage)
      throw new Error(customMessage)
    }
  }

  getCustomMessageByStatusCode(statusCode: number): string {
    if (statusCode >= 200 && statusCode <= 299) {
      return 'Success!'
    }

    const customResponseCodes: { [key: number]: string } = {
      10101: '이미 존재하는 유저입니다.',
      10103: '유저 생성/수정을 위한 필수 파라미터가 없습니다',
      10104: '유저 생성/수정을 위한 필수 파라미터가 없습니다',
      10201: '이미 존재하는 데이터베이스입니다.',
      10203: '데이터베이스 생성/수정을 위한 필수 파라미터가 없습니다',
      10204: '데이터베이스 생성/수정을 위한 필수 파라미터가 없습니다',
      10301: '이미 존재하는 웨어하우스입니다.',
      10303: '웨어하우스 생성/수정을 위한 필수 파라미터가 없습니다',
      10304: '웨어하우스 생성/수정을 위한 필수 파라미터가 없습니다',
      10377: 'Optimized Warehouse생성을 위한 최소 Warehouse Size를 확인해주세요',
      10401: '이미 존재하는 권한입니다.',
      10403: '권한 생성/수정을 위한 필수 파라미터가 없습니다',
      10404: '권한이 존재하지 않습니다',
    }

    return customResponseCodes[statusCode] || '에러가 발생했습니다.'
  }
}
