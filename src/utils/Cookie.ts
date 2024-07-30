import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, {
    path: '/',
    secure: true,
    maxAge: 10 * 365 * 24 * 60 * 60,
    sameSite: 'none',
  })
}

export const getCookies = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name)
}

export const getUiCookieName = () => {
  const env = process.env.REACT_APP_ENV as string

  if (env === 'PRODUCTION') {
    return 'prod-datahub-ui-settings'
  } else if (env === 'QA') {
    return 'qa-datahub-ui-settings'
  } else if (env === 'DEVELOPMENT') {
    return 'dev-datahub-ui-settings'
  } else if (env === 'LOCAL') {
    return 'local-datahub-ui-settings'
  } else {
    return 'unavailable-datahub-ui-settings'
  }
}
