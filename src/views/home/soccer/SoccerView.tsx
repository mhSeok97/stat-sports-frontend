import { observer } from 'mobx-react-lite'
import React from 'react'

export const SoccerView = observer(() => {
  return (
    <div className="flex text-white justify-around mt-10">
      <div className="flex flex-col mr-10 flex-grow-0 basis-2/7">
        <div className="mb-5">1-1</div>
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
