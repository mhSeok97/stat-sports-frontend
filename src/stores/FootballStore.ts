import { types } from 'mobx-state-tree'
import { League } from '@models/FootballModel'

export const FootballStore = types
  .model({
    selectedLeague: types.optional(types.maybeNull(League), null),
    selectedSeasonStartDate: types.optional(types.string, ''),
    selectedSeasonEndDate: types.optional(types.string, ''),
  })

  .actions((self) => ({
    async afterCreate() {},
    setSelectedLeague: (leagueName: string) => {
      // get league data
      if (leagueName === 'premier-league')
        self.selectedLeague = {
          id: 0,
          name: 'Premier League ',
          label_en: 'EPL',
          label_ko: '프리미어리그',
          path: 'football/premier-league',
          logo_url: '/images/premier_league_logo.png',
          margin_end: '4',
          country: 'england',
        }
    },
  }))
  .views((self) => ({}))
