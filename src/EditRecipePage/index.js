import WithSideBar from '../WithSideBar'
import { useState, useCallback } from 'react'
import { Loading } from '../Loading'
import { ErrorDialog } from '../ErrorDialog'
import * as api from '../api'
import { useMutation, useQuery } from 'react-query'
import { Navigate, useParams, useNavigate } from 'react-router-dom'

const formErrorClasses = 'border-red-500'
const formOkClasses = 'focus:border-blue-300'

// TODO success message on complete
export default function EditRecipePage () {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [recipe, setRecipe] = useState('')
  const [description, setDescription] = useState('')

  const [missing, setMissing] = useState({
    name: false,
    recipe: false,
    description: false
  })

  const postRecipe = useMutation(api.updateRecipe, {
    onSuccess: (slug) => {
      navigate(`/recipe/${slug}`)
    }
  })

  const fetchRecipe = useQuery(['fetchRecipe', slug], () =>
    api.fetchRecipe(slug).then(({ recipe: r }) => {
      setName(r.name)
      setRecipe(r.recipe)
      setDescription(r.description)
      return r
    }), {
    refetchOnWindowFocus: false
  }
  )

  const isLoading = fetchRecipe.isLoading || postRecipe.isLoading

  const onSubmit = useCallback(() => {
    const anyMissing = [name, recipe, description].some(s => !s)
    if (anyMissing) {
      setMissing({
        name: !name,
        recipe: !recipe,
        description: !description
      })
    } else {
      postRecipe.mutate({
        id: fetchRecipe.data.id,
        name,
        recipe,
        description
      })
    }
  }, [name, recipe, description])

  if (fetchRecipe.error) {
    navigate('/huh')
  }

  const error = postRecipe.error
    ? (
      <div className='px-3 py-1.5'>
        <ErrorDialog message=' There is something wrong with the server :/ try again later' />
      </div>
      )
    : <></>

  const enabledButton = 'px-3 py-1.5 border h-full align-bottom transition active:bg-gray-100'
  const disabledButton = 'px-3 py-1.5 h-full align-bottom text-white bg-gray-100'

  return (
    <WithSideBar>
      <Loading show={isLoading}>
        {error}
        <div className='flex-row h-full space-y-4 overflow-auto'>
          <div className='pt-4 pb-6 text-center h-18'>
            <p className='text-2xl font-bold'>Edit Recipe</p>
          </div>
          <div className='text-center'>
            <input
              type='text'
              disabled={!!error}
              className={`
          px-3
          py-1.5
          border
          transition
          ${missing.name ? formErrorClasses : formOkClasses}
          ease-in-out
          h-full
          w-1/2
          focus:outline-none`}
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
              disabled={!!error}
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
              disabled={!!error}
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
              disabled={!!error}
              onClick={onSubmit} className={error ? disabledButton : enabledButton}
            >Save
            </button>
          </div>
        </div>
      </Loading>
    </WithSideBar>
  )
}
