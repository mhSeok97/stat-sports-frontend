import '@views/home/soccer/styles/ReactCalendar.scss'

import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { AppStore } from '@stores/AppStore'
import { useStore } from 'mobx-store-provider'

type Value = Date | null

export const DatePicker = observer(() => {
  const appStore = useStore(AppStore)
  const [selectedDate, setSelectedDate] = useState<Value>(new Date())

  const handleChange = (date: Date) => {
    setSelectedDate(date)
  }

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const calendarMonth = selectedDate ? selectedDate.getMonth() : new Date().getMonth()
      const tileMonth = date.getMonth()
      if (tileMonth !== calendarMonth) {
        return 'out-of-month'
      }
    }
    return null
  }

  return (
    <div className={`w-full max-w-sm mx-auto`}>
      <Calendar
        onChange={(date) => handleChange(date as Date)}
        value={selectedDate}
        locale="en-US"
        className={`${appStore.selectedtheme === 'dark' ? 'dark-mode' : ''}`}
        tileClassName={tileClassName}
      />
      {selectedDate && selectedDate.toString()}
    </div>
  )
})
