import Page from '../Page'
import React, { useState, useEffect } from 'react'
import RieLink from '../RieLink'
import { MdDelete } from 'react-icons/md'
import { YesNoPopup } from '../YesNoPopup'

const mealplans = [
  {
    id: 1,
    name: 'Plan 1',
    createdAt: 166969232
  }, {
    id: 2,
    name: 'Plan 2',
    createdAt: 166969232
  }, {
    id: 3,
    name: 'Plan 3',
    createdAt: 166969232
  }, {
    id: 4,
    name: 'Plan 4',
    createdAt: 166969232
  }
]

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

export default function MealPlanHomePage () {
  const [showYesNo, setShowYesNo] = useState(false)

  return (
    <div>
      <YesNoPopup
        onNo={() => setShowYesNo(false)}
        onYes={() => {
          setShowYesNo(false)
        }}
        show={showYesNo}
      >
        <p>
          Are you sure you want to delete this mealplan?
        </p>
      </YesNoPopup>
      <Page header='Mealplans' sideSelected='mealplans' isLoading={false}>
        <div className='px-8'>
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <RieLink to='/mealplan/new'>
                <div className='text-gray-900 text-xl'>+New Plan</div>
              </RieLink>
            </div>
            <div className='text-right col-span-1 text-gray-900 font-bold text-xl'>
              Created Date
            </div>
            <div />
            {mealplans.map(m =>
              <React.Fragment key={m.id}>
                <div>
                  <RieLink to={`/mealplan/${m.id}`}>
                    <div className='text-gray-900 font-bold text-xl'>{m.name}</div>
                  </RieLink>
                </div>
                <div className='text-right'>{formatDate(m.createdAt)}</div>
                <div className='text-2xl cursor-pointer' onClick={() => setShowYesNo(true)}>
                  <MdDelete />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Page>
    </div>
  )
}
