import { FootballStore } from '@stores/FootballStore'
import { LeagueHeader } from '@views/home/football/partial/LeagueHeader'
import { observer } from 'mobx-react-lite'
import { useStore } from 'mobx-store-provider'
import React from 'react'
import { useParams } from 'react-router-dom'

export const FootballView = observer(() => {
  const footballStore = useStore(FootballStore)
  const params = useParams()

  footballStore.setSelectedLeague(params.leagueType as string)

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <LeagueHeader />
        </div>

        <div className="space-y-4 md:col-span-1 w-full">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Player of the Season</h2>
            <p>Rodri - 8.01</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Top Players</h2>
            <ul>
              <li>Phil Foden - 7.79</li>
              <li>Bruno Fernandes - 7.75</li>
              <li>Bukayo Saka - 7.72</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold">Top Stats</h2>
            <ul>
              <li>Phil Foden - 10</li>
              <li>Cole Palmer - 10</li>
              <li>Eberechi Eze - 10</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
})
