import WithSideBar from '../WithSideBar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { Loading } from '../Loading'
import { ConfirmPopup } from '../ConfirmPopup'
import * as api from '../api'
import { ErrorDialog } from '../ErrorDialog'

// TODO sure you want to delete?
export default function SingleRecipePage () {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const fetchRecipe = useQuery(['fetchRecipe', slug],
    () => api.fetchRecipe(slug))

  const deleteRecipe = useMutation(
    () => api.deleteRecipe(slug), {
      onSuccess: () => {
        navigate('/')
      }
    })

  const error = fetchRecipe.error ? <ErrorDialog message='Something went wrong :/' /> : <> </>
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
          <div className='flex flex-col divide-y divide-slate-200 px-8 py-4 h-18'>
            <div className='grid grid-cols-1 pb-4 text-2xl font-bold'>
              <div className='grid-cols-1 place-self-center self-center'>
                <p>{fetchRecipe.data.recipe.name}</p>
              </div>
            </div>
            <div className='flex py-8 whitespace-pre-wrap'>
              {fetchRecipe.data.recipe.recipe}
            </div>
          </div>
          <div className='flex flex-col divide-y divide-slate-200 py-4 h-18'>
            <div className='flex flex-row w-full pb-4'>
              <div className='flex grow justify-center italic'>
                Last edited by {fetchRecipe.data.recipe.author} on {new Date(fetchRecipe.data.recipe.createdAt * 1000).toLocaleString()}
              </div>
            </div>
            <div className='flex p-4 justify-center'>
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
          </div>
          </div>
        : error
      }
      </Loading>
    </WithSideBar>
  )
}
