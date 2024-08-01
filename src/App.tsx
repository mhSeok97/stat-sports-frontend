import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '@views/home/Layout'
import Main from '@views/home/Main'
import { AppStore } from '@stores/AppStore'
import { SoccerStore } from '@stores/SoccerStore'
import { useCreateStore, useProvider } from 'mobx-store-provider'
import { SoccerView } from '@views/home/soccer/SoccerView'
import { BasketballView } from '@views/home/basketball/BasketballView'

const App = () => {
  const soccerStore = useCreateStore(SoccerStore)
  const appStore = useCreateStore(AppStore, { soccerStore: soccerStore })

  const AppProvider = useProvider(AppStore)

  return (
    <AppProvider value={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/soccer" element={<SoccerView />} />
            <Route path="/basketball" element={<BasketballView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
