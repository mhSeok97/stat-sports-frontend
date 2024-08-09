import '@views/home/football/styles/LeagueHeader.scss'

import { FootballStore } from '@stores/FootballStore'
import { observer } from 'mobx-react-lite'
import { useStore } from 'mobx-store-provider'
import React from 'react'

export const LeagueHeader = observer(() => {
  const footballStore = useStore(FootballStore)
  return (
    <div
      className="bg-gray-800 p-4 rounded-lg w-full h-40 md:h-44"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)' }}
    >
      {footballStore.selectedLeague && (
        <div className="league-header-content">
          <div className="league-header-content-logo">
            <img src={footballStore.selectedLeague.logo_url} alt="logo" style={{ width: '76px' }} />
          </div>
          <div className="league-header-content-description">
            <h2 className="league-header-content-description-name">{footballStore.selectedLeague.name}</h2>
          </div>
        </div>
      )}
    </div>
  )
})
