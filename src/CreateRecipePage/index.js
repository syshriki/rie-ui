import Page from '../Page'
import { useState } from 'react'
import { ErrorDialog } from '../ErrorDialog'
import { useMutation } from 'react-query'
import * as api from '../api'
import { useNavigate } from 'react-router-dom'

const formErrorClasses = 'border-red-500'
const formOkClasses = 'focus:border-blue-300'

export default function CreateRecipePage () {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [recipe, setRecipe] = useState('')
  const [description, setDescription] = useState('')
  const [missing, setMissing] = useState({
    name: false,
    recipe: false,
    description: false
  })

  const { isLoading, error, mutate } = useMutation(api.createRecipe, {
    onSuccess: (slug) => {
      navigate(`/recipe/${slug}`)
    }
  })

  function onSubmit () {
    const anyMissing = [name, recipe, description].some(s => !s)
    if (anyMissing) {
      setMissing({
        name: !name,
        recipe: !recipe,
        description: !description
      })
    } else {
      mutate({
        name,
        recipe,
        description
      })
    }
  }

  const errorElement = (
    <div className='px-3 py-1.5'>
      <ErrorDialog message=' There is something wrong with the server :/ try again later' />
    </div>
  )
  return (
    <Page selected='create' isLoading={isLoading} header='New Recipe'>
      {error ? errorElement : <></>}
      <div className='flex-row h-full space-y-4 overflow-auto'>
        <div className='text-center'>
          <input
            type='text' className={`
          px-3
          py-1.5
          border
          transition
          ${missing.name ? formErrorClasses : formOkClasses}
          ease-in-out
          h-full
          w-1/2
          focus:outline-none`}
            placeholder='Name'
            value={name}
            onChange={(ev) => {
              setName(ev.target.value)
              setMissing({
                ...missing,
                name: !ev.target.value
              })
            }}
          />
        </div>
        <div className='text-center'>
          <textarea
            placeholder='Short recipe description (optional)'
            className={`px-3
              py-1.5
              border
              transition
              ${missing.description ? formErrorClasses : formOkClasses}
              ease-in-out
              w-1/2
              focus:outline-none`}
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value)
              setMissing({
                ...missing,
                description: !ev.target.value
              })
            }}
          />
        </div>
        <div className='text-center h-3/4'>
          <textarea
            placeholder='Recipe...'
            className={`px-3
              py-1.5
              border
              transition
              ${missing.recipe ? formErrorClasses : formOkClasses}
              ease-in-out
              h-full
              w-1/2
              focus:outline-none`}
            value={recipe}
            onChange={(ev) => {
              setMissing({
                ...missing,
                recipe: !ev.target.value
              })
              setRecipe(ev.target.value)
            }}
          />
        </div>
        <div className='text-center'>
          <button
            onClick={onSubmit} className='px-3
          py-1.5 border transition h-full align-bottom  active:bg-gray-100'
          >Create
          </button>
        </div>
      </div>
    </Page>
  )
}
