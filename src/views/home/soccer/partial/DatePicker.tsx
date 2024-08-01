import '../css/DatePicker.scss'

import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export const DatePicker = observer(() => {
  const [selected, setSelected] = useState<Date>()
  return (
    <div className="w-full max-w-sm mx-auto">
      <DayPicker mode="single" selected={selected} onSelect={setSelected} style={{ width: '200px', margin: '0 auto' }} />
    </div>
  )
})
