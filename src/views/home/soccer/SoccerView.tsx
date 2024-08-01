import { observer } from 'mobx-react-lite'
import React from 'react'
import { DatePicker } from './partial/DatePicker'
import '../soccer/css/DatePicker.scss'

export const SoccerView = observer(() => {
  return (
    <div className="flex text-white mt-10">
      <div className="flex flex-col mr-10 flex-grow-0 basis-1/7">
        <div className="mb-5">
          <DatePicker></DatePicker>
        </div>
        <div>1-2</div>
      </div>
      <div className="flex flex-col mr-10 flex-grow-0 basis-3/7">
        <div>2-1</div>
        <div>2-2</div>
      </div>
      <div className="flex flex-col flex-grow-0 basis-2/7">
        <div>3-1</div>
        <div>3-2</div>
      </div>
    </div>
  )
})
