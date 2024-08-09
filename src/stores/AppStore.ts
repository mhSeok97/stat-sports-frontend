import { User } from '@models/UserModel'
import { FootballStore } from '@stores/FootballStore'
import { types } from 'mobx-state-tree'

export const AppStore = types
  .model({
    footballStore: FootballStore,
    user: types.optional(types.maybeNull(User), null),
    isLogined: types.optional(types.boolean, false),
    selectedLanguage: types.optional(types.enumeration('Language', ['english_us', 'english_uk', 'korean']), 'english_uk'),
    selectedtheme: types.optional(types.enumeration('theme', ['light', 'dark']), 'dark'),
  })

  .actions((self) => ({
    async afterCreate() {
      console.info('create app store')
    },
    setSelectedLanguage: (language: 'english_us' | 'english_uk' | 'korean') => {
      self.selectedLanguage = language
    },
    setSelectedTheme: (theme: 'light' | 'dark') => {
      self.selectedtheme = theme
    },
  }))
  .views(() => ({}))
