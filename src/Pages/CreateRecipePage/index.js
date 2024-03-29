import WithSideBar from '../../Components/WithSideBar'
import { useState } from 'react'
import { Loading } from '../../Components/Loading'
import { ErrorDialog } from '../../Components/ErrorDialog'
import { useMutation } from 'react-query'
import * as api from '../../api'
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
    const anyMissing = [name, recipe].some(s => !s)
    if (anyMissing) {
      setMissing({
        name: !name,
        recipe: !recipe
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
    <WithSideBar selected='create'>
      <Loading show={isLoading}>
        {error ? errorElement : <></>}
        <div className='flex-row h-full space-y-4 overflow-auto'>
          <div className='pt-4 pb-6 text-center h-18'>
            <p className='text-2xl font-bold'>New Recipe</p>
          </div>
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
          md:w-1/2
          w-3/4
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
              formOkClasses
              ease-in-out
              md:w-1/2
              w-3/4
              focus:outline-none`}
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value)
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
              md:w-1/2
              w-3/4
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
      </Loading>
    </WithSideBar>
  )
}
