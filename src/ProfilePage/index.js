import WithSideBar from '../WithSideBar'
import React, { useState, useEffect } from 'react'
import { Loading } from '../Loading'
import { MdSearch } from 'react-icons/md'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useSearchParams, useParams } from 'react-router-dom'
import * as api from '../api'
import { RecipeList } from '../RecipeList'

function NoResults ({ query }) {
  const message = !query ? 'Nothing found.' : `Nothing found matching "${query}".`
  return (
    <div className='flex-col grow py-4'>
      <div className='flex items-center justify-center h-full'>
        {message}
      </div>
    </div>
  )
}

function renderDataSetSelecter (name, selected, setSelectedQuery, count) {
  const rightText = count ?? '...'
  if (name === selected) {
    return (
      <div>
        <p className='w-fit underline font-bold cursor-pointer decoration-dashed'>{name} ({rightText})</p>
      </div>
    )
  } else {
    return (
      <div>
        <p onClick={() => setSelectedQuery(name)} className='w-fit hover:underline font-bold cursor-pointer decoration-dashed'>{name} ({rightText})</p>
      </div>
    )
  }
}

export default function SingleRecipePage () {
  const { username } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const [cursor, setCursor] = useState(Date.now())

  const query = searchParams.get('q') ?? ''
  const selectedDataSet = searchParams.get('s') ?? 'Recipes'
  const apiFnName = selectedDataSet === 'Favorites' ? 'findUsersFavorites' : 'findUsersRecipes'

  const setSelectedQueryParam = (value) => {
    searchParams.set('q', query)
    searchParams.set('s', value)
    setSearchParams(searchParams, { replace: true })
  }

  const fetchSelected = useInfiniteQuery([selectedDataSet, username, searchParams.get('q')],
    ({ pageParam }) => api[apiFnName](username, searchParams.get('q') || '', pageParam || cursor),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      enabled: false,
      refetchOnMount: false
    })

  const fetchProfile = useQuery(['profile', username, searchParams.get('q')],
    ({ pageParam }) => api.getProfile(username, searchParams.get('q') || '', pageParam || cursor),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnMount: false
    })

  // init search parameters and set search text
  useEffect(() => {
    setCursor(cursor)
    searchParams.set('q', query)
    searchParams.set('s', selectedDataSet)
    setSearchParams(searchParams, { replace: true })
    setSearchText(query)
    if (fetchSelected.hasNextPage) {
      fetchSelected.fetchNextPage()
    } else {
      fetchSelected.refetch()
    }
  }, [searchParams.get('q'), searchParams.get('s')])

  const onSubmit = (ev) => {
    searchParams.set('q', searchText)
    setSearchParams(searchParams)
  }

  const selectedSidebarLink = window.localStorage.getItem('username') === username ? 'profile' : ''

  console.log(fetchProfile.data)
  return (
    <WithSideBar selected={selectedSidebarLink}>
      <Loading show={false}>
        <div className='overflow-auto'>
          <div className='flex flex-col px-8 py-4 h-18 divide-y divide-slate-200 '>
            <div className='flex place-self-center'>
              <div className='flex self-center'>
                <div className='pr-1 text-2xl font-bold'>
                  <p>{username}</p>
                </div>
              </div>
            </div>
            <div className='pt-8'>
              <div className='py-4'>
                {fetchProfile.isLoading ? <p /> : <p>Joined: {new Date(fetchProfile.data.user.createdAt).toDateString()}</p>}
              </div>
              <div className='grid grid-cols-5 h-18 items-baseline'>
                {renderDataSetSelecter('Recipes', selectedDataSet, setSelectedQueryParam, fetchSelected?.data?.pages.at(0).recipeCount)}
                {renderDataSetSelecter('Favorites', selectedDataSet, setSelectedQueryParam, fetchSelected?.data?.pages.at(0).favoriteCount)}
                <div />
                <div className='grid grid-cols-12 col-span-2 h-12'>
                  <div className='w-full col-span-11'>
                    <input
                      type='text'
                      value={searchText}
                      className='
                        px-3
                        py-1.5
                        border
                        transition
                        ease-in-out
                        h-full
                        w-full
                        border-b-0
                        focus:outline-none'
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          searchParams.set('q', ev.target.value)
                          setSearchParams(searchParams)
                        }
                      }}
                      onChange={(ev) => {
                        setSearchText(ev.target.value)
                      }}
                      placeholder='Search'
                    />
                  </div>
                  <div className='w-full col-span-1'>
                    <button
                      className='px-3
          py-1.5 border border-b-0 border-l-0 transition h-full w-full align-bottom  text-center active:bg-gray-100'
                      onClick={onSubmit}
                    >
                      <div className='grid w-full h-full place-items-center'>
                        <MdSearch />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col py-1 h-18'>
              <RecipeList
                noSeperator
                data={fetchSelected.data}
                hasNextPage={fetchSelected.hasNextPage}
                isLoading={fetchSelected.isLoading}
                fetchNextPage={fetchSelected.fetchNextPage}
              />
              {fetchSelected.hasNextPage && fetchSelected.isFetchingNextPage
                ? <p>Loading...</p>
                : <></>}

              {fetchSelected.data && !fetchSelected.data.pages.at(0).recipes.length
                ? <NoResults query={searchParams.get('q')} />
                : <></>}
            </div>

          </div>
        </div>
      </Loading>
    </WithSideBar>
  )
}
