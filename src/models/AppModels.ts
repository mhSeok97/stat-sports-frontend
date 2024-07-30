import { types } from 'mobx-state-tree'

export const App = types.model('App', {})

export const UiDataCookie = types
  .model({
    snowflake: types.model({
      viewType: types.string,
      sortType: types.string,
    }),
    datahub: types.model({
      viewType: types.string,
      sortType: types.string,
    }),
  })
  .views((self) => ({
    get snowflakeViewType() {
      const jsonObject: {
        [key: string]: string
      } = {}

      self.snowflake.viewType.split(' ').forEach((pair) => {
        const [key, value] = pair.split(':')
        jsonObject[key] = value
      })

      return jsonObject
    },
    get snowflakeSortType() {
      const jsonObject: {
        [key: string]: {
          name: string
          order: string
        }
      } = {}

      self.snowflake.sortType.split(' ').forEach((pair) => {
        const [key, value] = pair.split(':')
        const [name, order] = value.split(',')
        jsonObject[key] = { name, order }
      })
      return jsonObject
    },
    get datahubViewType() {
      const jsonObject: {
        [key: string]: string
      } = {}

      self.datahub.viewType.split(' ').forEach((pair) => {
        const [key, value] = pair.split(':')
        jsonObject[key] = value
      })

      return jsonObject
    },
    get datahubSortType() {
      const jsonObject: {
        [key: string]: {
          name: string
          order: string
        }
      } = {}

      self.datahub.sortType.split(' ').forEach((pair) => {
        const [key, value] = pair.split(':')
        const [name, order] = value.split(',')
        jsonObject[key] = { name, order }
      })
      return jsonObject
    },
  }))
