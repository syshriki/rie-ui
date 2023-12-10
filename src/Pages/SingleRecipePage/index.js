import WithSideBar from '../../Components/WithSideBar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { Loading } from '../../Components/Loading'
import { ConfirmPopup } from '../../Components/ConfirmPopup'
import * as api from '../../api'
import { ErrorDialog } from '../../Components/ErrorDialog'
import { RecipeTitle } from '../../Components/RecipeTitle'
import { UserLink } from '../../Components/UserLink'

export default function SingleRecipePage () {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  const fetchRecipe = useQuery(['fetchRecipe', slug],
    () => api.fetchRecipe(slug), {
      onSuccess: ({ recipe }) => {
        setIsFavorite(recipe.isFavorite)
        setIsTogglingFavorite(false)
      }
    }, {
      refetchOnWindowFocus: false
    })

  const deleteRecipe = useMutation(
    () => api.deleteRecipe(slug), {
      onSuccess: () => {
        navigate('/')
      }
    })

  const toggleFavorite = useMutation(
    () => api.toggleFavorite(slug), {
      onSuccess: (isFavorite) => {
        setIsTogglingFavorite(false)
        setIsFavorite(isFavorite === 'true')
      }
    })

  const isAuthor = fetchRecipe.data && window.localStorage.getItem('username') === fetchRecipe.data.recipe.author
  const error = fetchRecipe.error || toggleFavorite.error ? <ErrorDialog message='Something went wrong :/' /> : <> </>
  const isLoading = fetchRecipe.isLoading || deleteRecipe.isLoading
  return (
    <WithSideBar>
      <ConfirmPopup
        onNo={() => setShowConfirm(false)}
        onYes={() => {
          deleteRecipe.mutate(slug)
          setShowConfirm(false)
        }}
        show={showConfirm}
      />
      <Loading show={isLoading}>
        {
      fetchRecipe.data
        ? <div className='overflow-auto'>
          <div className='grid grid-cols-6 divide-y divide-slate-200 px-8 py-4 h-18'>
            <div className='col-start-2 col-span-5 pb-4 text-2xl font-bold'>
              <RecipeTitle
                name={fetchRecipe.data.recipe.name}
                isLoading={isTogglingFavorite}
                isFavorite={isFavorite}
                onFavoriteClick={() => {
                  toggleFavorite.mutate(slug)
                  setIsTogglingFavorite(true)
                }}
                onlyFavorite
              />
            </div>
            <div className='col-span-6 py-8 whitespace-pre-wrap'>
              {fetchRecipe.data.recipe.recipe}
            </div>
          </div>
          <div className='flex flex-col divide-y divide-slate-200 py-4 h-18'>
            <div className='flex flex-row w-full pb-4'>
              <div className='flex grow justify-center italic'>
                Last edited by&nbsp;<UserLink username={fetchRecipe.data.recipe.author} />&nbsp;on {new Date(fetchRecipe.data.recipe.createdAt * 1000).toLocaleString()}
              </div>
            </div>
            {isAuthor
              ? <div className='flex p-4 justify-center'>
                <span className='px-2 cursor-pointer hover:underline decoration-dashed'>
                  <Link to={`/edit/${slug}`}> Edit </Link>
                </span>
                /
                <span
                  className='px-2 cursor-pointer hover:underline decoration-dashed' onClick={() => {
                    setShowConfirm(true)
                  }}
                >
                  Delete
                </span>
              </div>
              : <></>}
          </div>
        </div>
        : error
      }
      </Loading>
    </WithSideBar>
  )
}
