import { type Menus } from '@models/NavbarMenuModel'
import { AppStore } from '@stores/AppStore'
import { observer } from 'mobx-react-lite'
import { useStore } from 'mobx-store-provider'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Navbar = observer((props: Menus) => {
  const appStore = useStore(AppStore)
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<Boolean>(false)
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<Boolean>(true)

  const navbarColor = appStore.selectedtheme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'
  const searchInputColor = appStore.selectedtheme === 'dark' ? 'bg-gray-900' : 'bg-white'
  const mobileHoverColor = appStore.selectedtheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-white hover:opacity-50'

  const handelProfileClick = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu)
  }

  const handelMobileMenuClick = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('.profile-icon')) {
      return
    }

    if (!target.closest('.profile')) {
      setIsOpenProfileMenu(false)
    }
  }

  const handelMainLogoClick = () => {
    navigate('')
  }

  const handelMenuClick = (menu: string) => {
    navigate(`${menu}`)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <nav className={navbarColor}>
      <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" onClick={handelMobileMenuClick}></span>
              <span className="sr-only">Open main menu</span>

              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center hover:cursor-pointer" onClick={handelMainLogoClick}>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div className="hidden sm:grid sm:grid-cols-10 sm:gap-4 sm:items-center sm:justify-center w-full hidden sm:ml-6 sm:block">
              <div className="col-span-1 flex justify-center">
                {/* <a href="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">
                  Dashboard
                </a> */}
              </div>
              <div className="col-span-1 flex justify-center">
                {/* <a href="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Team
                </a> */}
              </div>
              <div className="col-span-6 flex justify-center">
                <div className="relative w-full max-w-md" style={{ width: '360px', height: '40px' }}>
                  <input
                    type="text"
                    className={`w-full text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${searchInputColor}`}
                    placeholder={appStore.selectedLanguage === 'korean' ? '무엇을 찾으세요?' : 'Search...'}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35M16.75 10.5a6.25 6.25 0 1 0-12.5 0 6.25 6.25 0 0 0 12.5 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 border-white"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-3">
              <div className="profile-icon">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={handelProfileClick}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={appStore.isLogined ? '/test' : '/no_profile.png'} alt="profile_image" />
                </button>
              </div>
              {isOpenProfileMenu && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <a href="/" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">
                    Your Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        {isOpenMobileMenu && (
          <div className="space-y-1 px-2 pb-3 pt-2">
            {props.menus.map((menu) => {
              return (
                <div
                  key={menu.key}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${mobileHoverColor} hover:text-white flex cursor-pointer text-white`}
                  onClick={() => {
                    handelMenuClick(menu.path)
                  }}
                >
                  <img src={menu.logo_url} alt="logo" style={{ width: '18px', height: '18px', marginRight: '15px' }} />
                  <span className={`${location.pathname.includes(menu.name) ? 'text-white' : 'text-gray-300'}`}>
                    {appStore.selectedLanguage === 'korean' ? `${menu.label_ko}` : `${menu.label_en}`}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
})
