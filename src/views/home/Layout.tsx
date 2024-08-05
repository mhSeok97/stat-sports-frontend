import { observer } from 'mobx-react-lite'
import React from 'react'
import { Navbar } from '@views/partial/Navbar'
import { SubNavbar } from '@views/partial/SubNavbar'
import { Outlet } from 'react-router-dom'
import { AppStore } from '@stores/AppStore'
import { useStore } from 'mobx-store-provider'

const Layout = observer(() => {
  const appStore = useStore(AppStore)
  const containerColor = `${appStore.selectedtheme === 'dark' ? 'bg-gray-900' : 'bg-[#FAFBFC]'} min-h-screen`

  const menus = [
    {
      key: 0,
      name: 'premier-league',
      label_en: 'EPL',
      label_ko: '프리미어리그',
      path: 'football/premier-league',
      logo_url: 'images/premier_league_logo.png',
      margin_end: '4',
    },
    {
      key: 1,
      name: 'laliga',
      label_en: 'La Liga',
      label_ko: '라리가',
      path: 'football/laliga',
      logo_url: 'images/laliga_logo.png',
      margin_end: '4',
    },
    {
      key: 2,
      name: 'bundesliga',
      label_en: 'Bundesliga',
      label_ko: '분데스리가',
      path: 'football/bundesliga',
      logo_url: 'images/bundesliga_logo.png',
      margin_end: '4',
    },
    {
      key: 3,
      name: 'serie-a',
      label_en: 'Serie A',
      label_ko: '세리에 A',
      path: 'football/serie-a',
      logo_url: 'images/serie_a_logo.png',
      margin_end: '4',
    },
    {
      key: 4,
      name: 'ligue-1',
      label_en: 'Ligue 1',
      label_ko: '리그앙 1',
      path: 'football/ligue-1',
      logo_url: 'images/ligue1_logo.png',
      margin_end: '4',
    },
    {
      key: 5,
      name: 'uefa-champions-league',
      label_en: 'UCL',
      label_ko: '챔피언스리그',
      path: 'football/uefa-champions-league',
      logo_url: 'images/champions_league_logo.png',
      margin_end: '4',
    },
    {
      key: 5,
      name: 'uefa-europa-league',
      label_en: 'UEL',
      label_ko: '유로파리그',
      path: 'football/uefa-europa-league',
      logo_url: 'images/europa_league_logo.png',
      margin_end: '4',
    },
    {
      key: 6,
      name: 'nba',
      label_en: 'NBA',
      label_ko: 'NBA',
      path: 'basketball/nba',
      logo_url: 'images/nba_logo.png',
      margin_end: '4',
    },
  ]

  return (
    <div className={containerColor}>
      <Navbar menus={menus} />
      <SubNavbar menus={menus} />
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
})
export default Layout
