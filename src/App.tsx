import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@views/home/Layout'
import Main from '@views/home/Main'
import { AppStore } from '@stores/AppStore'
import { useCreateStore, useProvider } from 'mobx-store-provider'
import { FootballView } from '@views/home/football/FootballView'
import { BasketballView } from '@views/home/basketball/BasketballView'
import { Error } from '@views/home/shared/Error'
import { FootballStore } from '@stores/FootballStore'

const App = () => {
  const footballStore = useCreateStore(FootballStore)
  const appStore = useCreateStore(AppStore, { footballStore: footballStore })

  const FootballProvider = useProvider(FootballStore)
  const AppProvider = useProvider(AppStore)

  return (
    <FootballProvider value={footballStore}>
      <AppProvider value={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="/football/:leagueType" element={<FootballView />}></Route>
              <Route path="/basketball" element={<BasketballView />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </FootballProvider>
  )
}

export default App
