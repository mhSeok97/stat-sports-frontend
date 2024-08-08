import type React from 'react'

type ENV = 'PRODUCTION' | 'QA' | 'DEVELOPMENT' | 'LOCAL'
export type Feature = 'MONOLAKE' | 'CUTIE' | 'DATAHUB'

export class AppConfig {
  static readonly ENV: ENV = process.env.REACT_APP_ENV ? (process.env.REACT_APP_ENV as ENV) : 'DEVELOPMENT'
  static readonly STAT_SPORTS_API: string | undefined = process.env.REACT_APP_STATKICK_API_URL

  static hasFeature = (f: Feature) => {
    const featureString = process.env.REACT_APP_FEATURES
    if (featureString) {
      const features = featureString.split(',')
      return features.includes(f)
    }
    return false
  }
  static IsProduction = () => {
    return AppConfig.ENV && AppConfig.ENV === 'PRODUCTION'
  }

  static IsTestAccountNames = (accountId: string) => {
    return process.env.REACT_APP_MONOLAKE_TEST_ACCOUNTS && process.env.REACT_APP_MONOLAKE_TEST_ACCOUNTS.split(',').includes(accountId)
  }

  static ErrorImageHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/no_profile.jpeg'
  }
}

export const DisplayString = {
  PRODUCTION: '',
  QA: 'QA용',
  DEVELOPMENT: '개발용',
  LOCAL: '로컬',
}
