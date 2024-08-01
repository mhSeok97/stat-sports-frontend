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

  return (
    <div className={containerColor}>
      <Navbar />
      <SubNavbar />
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
})
export default Layout
