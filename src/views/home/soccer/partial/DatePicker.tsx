import '../styles/ReactCalendar.scss'

import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { AppStore } from '@stores/AppStore'
import { useStore } from 'mobx-store-provider'

type Value = Date | null

export const DatePicker = observer(() => {
  const appStore = useStore(AppStore)
  const [value, setValue] = useState<Value>(new Date())

  const handleChange = (date: Date) => {
    setValue(date)
  }

  return (
    <div className={`w-full max-w-sm mx-auto`}>
      <Calendar
        onChange={(date) => handleChange(date as Date)}
        value={value}
        locale="en-US"
        className={`${appStore.selectedtheme === 'dark' ? 'dark-mode' : ''}`}
      />
    </div>
  )
})
