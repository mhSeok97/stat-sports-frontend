import { types } from 'mobx-state-tree'

export const SoccerStore = types
  .model({})

  .actions((self) => ({
    async afterCreate() {},
  }))
  .views((self) => ({}))
