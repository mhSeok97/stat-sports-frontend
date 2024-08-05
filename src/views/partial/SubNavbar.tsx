import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { AppStore } from '@stores/AppStore'
import { useStore } from 'mobx-store-provider'
import { CircleFlag } from 'react-circle-flags'
import { MdArrowDropUp } from 'react-icons/md'
import { MdArrowDropDown } from 'react-icons/md'
import { IoIosRadioButtonOn } from 'react-icons/io'
import { IoIosRadioButtonOff } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Menus } from '@models/NavbarMenuModel'

export const SubNavbar = observer((props: Menus) => {
  const appStore = useStore(AppStore)
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<Boolean>(false)
  const [isOpenLanguageDropdown, setIsOpenLanguageDropdown] = useState<Boolean>(false)

  const languages = [
    { code: 'us', label: 'English (US)', value: 'english_us' },
    { code: 'uk', label: 'English (UK)', value: 'english_uk' },
    { code: 'kr', label: 'Korean', value: 'korean' },
  ]

  const subNavbarColor = appStore.selectedtheme === 'dark' ? 'bg-gray-600' : 'bg-blue-900'
  const settingsMenuColor =
    appStore.selectedtheme === 'dark'
      ? 'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
      : 'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'

  const settingsMenuLanguageTextColor =
    appStore.selectedtheme === 'dark' ? 'text-sm text-gray-300 hover:text-gray-400' : 'text-sm text-gray-900 hover:text-gray-900'

  const settingsMenuThemeTextColor =
    appStore.selectedtheme === 'dark' ? 'ms-2 text-sm font-medium text-gray-300' : 'ms-2 text-sm font-medium text-gray-900'

  const activeItem = 'text-gray-200'

  const handelMenuClick = (menu: string) => {
    navigate(`${menu}`)
  }

  const handelSettingsClick = () => {
    setIsOpenSettingsMenu(!isOpenSettingsMenu)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('.settings-icon')) {
      return
    }

    if (!target.closest('.settings')) {
      setIsOpenSettingsMenu(false)
    }
  }

  const toggleDropdown = () => {
    setIsOpenLanguageDropdown(!isOpenLanguageDropdown)
  }

  const handelLanguageClick = (language: 'english_us' | 'english_uk' | 'korean') => {
    appStore.setSelectedLanguage(language)
    setIsOpenLanguageDropdown(false)
  }

  const handleThemeClick = (theme: 'dark' | 'light') => {
    appStore.setSelectedTheme(theme)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className={`${subNavbarColor} hidden sm:block`}>
      <ul className="container flex flex-wrap -mb-px text-sm font-medium text-center text-gray-400 dark:text-gray-400 h-52px">
        {props.menus.map((menu) => {
          return (
            <li className={`me-${menu.margin_end}`} key={menu.key}>
              <div
                className={`inline-flex items-center justify-center pt-2 pr-2 pb-1 pl-2 border-transparent rounded-t-lg hover:text-gray-300 hover:cursor-pointer group ${
                  location.pathname.includes(menu.name) && activeItem
                }`}
                onClick={() => {
                  handelMenuClick(menu.path)
                }}
              >
                <div className="flex flex-col items-center">
                  <img src={menu.logo_url} alt="logo" style={{ width: '18px', height: '18px' }} />
                  {appStore.selectedLanguage === 'korean' ? `${menu.label_ko}` : `${menu.label_en}`}
                </div>
              </div>
            </li>
          )
        })}
        <li className="relative ml-auto">
          <div className="settings-icon">
            <button
              onClick={handelSettingsClick}
              className="inline-flex items-center justify-center p-4 border-transparent rounded-t-lg text-gray-400 hover:text-gray-200 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isOpenSettingsMenu && (
              <div className={settingsMenuColor} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                {languages
                  .filter((lang) => lang.value === appStore.selectedLanguage)
                  .map((lang) => {
                    return (
                      <div
                        className={`block px-4 py-2 hover:cursor-pointer ${isOpenLanguageDropdown && 'shadow'}`}
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-0"
                        key={lang.value}
                      >
                        <div className="flex items-center justify-between space-x-2" onClick={toggleDropdown}>
                          <div className="flex items-center space-x-2">
                            <CircleFlag countryCode={lang.code} style={{ height: '25px' }} />
                            <div className={settingsMenuLanguageTextColor}>{lang.label}</div>
                          </div>
                          {!isOpenLanguageDropdown ? <MdArrowDropDown size={20} /> : <MdArrowDropUp size={20} />}
                        </div>
                      </div>
                    )
                  })}
                {isOpenLanguageDropdown &&
                  languages
                    .filter((lang) => lang.value !== appStore.selectedLanguage)
                    .map((lang) => {
                      return (
                        <div
                          className="block px-4 py-2 hover:cursor-pointer"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-0"
                          key={lang.value}
                        >
                          <div
                            className="flex items-center space-x-2"
                            onClick={() => {
                              handelLanguageClick(lang.value as 'english_us' | 'english_uk' | 'korean')
                            }}
                          >
                            <CircleFlag countryCode={lang.code} style={{ height: '25px' }} />
                            <div className={settingsMenuLanguageTextColor}>{lang.label}</div>
                          </div>
                        </div>
                      )
                    })}
                <div
                  className="block px-4 py-2 text-sm text-white-700 border-t border-gray-200 border-opacity-50"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                >
                  <div className="flex items-center">
                    {appStore.selectedtheme === 'dark' ? (
                      <IoIosRadioButtonOn className="hover:cursor-pointer" color="#7B68EE" size={25} />
                    ) : (
                      <IoIosRadioButtonOff
                        className="hover:cursor-pointer"
                        color="#7B68EE"
                        size={25}
                        onClick={() => {
                          handleThemeClick('dark')
                        }}
                      />
                    )}
                    <label htmlFor="default-radio-2" className={settingsMenuThemeTextColor}>
                      Dark
                    </label>
                  </div>
                </div>
                <div className="block px-4 py-2 text-sm text-white-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">
                  <div className="flex items-center me-4 ">
                    {appStore.selectedtheme === 'light' ? (
                      <IoIosRadioButtonOn className="hover:cursor-pointer" color="#7B68EE" size={25} />
                    ) : (
                      <IoIosRadioButtonOff
                        className="hover:cursor-pointer"
                        color="#7B68EE"
                        size={25}
                        onClick={() => {
                          handleThemeClick('light')
                        }}
                      />
                    )}
                    <label htmlFor="purple-radio" className={settingsMenuThemeTextColor}>
                      Light
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
})
