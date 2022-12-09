import Page from '../Page'
import React, { useState, useEffect } from 'react'
import RieLink from '../RieLink'
// import { MdDelete } from 'react-icons/md'
import { YesNoPopup } from '../YesNoPopup'

const mealplan = {
  id: 1,
  name: 'Plan 1',
  createdAt: 166969232,
  days: [{
    name: 'Sunday',
    meals: [{
      name: 'Lunch',
      recipes: [{
        name: 'Turkey Sandwich'
      }, {
        name: 'Apple'
      }]
    }, {
      name: 'Dinner',
      recipes: [{
        name: 'Pasta with Meat Saurce'
      }]
    }]
  }, {
    id: 2,
    name: 'Monday',
    meals: [
      {
        name: 'Breakfast',
        recipes: [{
          name: 'Cherios'
        }, {
          name: 'Banana'
        }]
      },
      {
        name: 'Lunch',
        recipes: [{
          name: 'Peanut Butter and Jelly Sandwhich'
        }, {
          name: 'Potato Chips'
        }]
      }, {
        name: 'Dinner',
        recipes: [{
          name: 'Seaseme Green Beans'
        }, {
          name: 'Chicken Stirfry'
        }, {
          name: 'White Rice'
        }]
      }
    ]
  }, {
    id: 3,
    name: 'Tuesday',
    meals: [{
      id: 1,
      name: 'Lunch',
      recipes: [{
        leftovers: {
          dayId: '1234'
        },
        name: 'Chicken Stirfry'
      }, {
        leftovers: {
          dayId: '1234'
        },
        name: 'White Rice'
      }]
    }, {
      id: 2,
      name: 'Dinner',
      recipes: [{
        name: 'Shackshuka'
      }, {
        name: 'Bread'
      }]
    }]
  }]
}

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

function mealplanDayCard (day) {
  return (
    <div class='max-w-sm rounded overflow-hidden shadow-lg'>
      <div class='border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
        {
          day.meals.map(m =>
            <div key={m.id}>
              {mealplan.name}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default function Mealplan () {
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
      <Page header='Plan 2' sideSelected='mealplans' isLoading={false}>
        <div className='px-8'>
          {
            mealplan.days.map(mealplanDayCard)
        }
        </div>
      </Page>
    </div>
  )
}
