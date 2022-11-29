import WithSideBar from '../WithSideBar'
import { MdSearch } from 'react-icons/md'
import { ErrorDialog } from '../ErrorDialog'
import { useSearchParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import * as api from '../api'
import { useInfiniteQuery } from 'react-query'
import { Loading } from '../Loading'
import { RecipeList } from '../RecipeList'

function NoResults ({ query }) {
  return (
    <div className='flex-col grow'>
      <div className='flex items-center justify-center h-full'>
        Nothing found matching "{query}".
      </div>
    </div>
  )
}

function GenericError () {
  return (
    <div className='py-4 mx-auto w-1/2'>
      <ErrorDialog message='Something went wrong.' />
    </div>
  )
}

export default function SearchPage () {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchText, setSearchText] = useState('')

  const {
    fetchNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    hasNextPage,
    error,
    refetch
  } = useInfiniteQuery(['fetchRecipes', searchParams.get('q') || '', searchParams.get('cursor')],
    ({ pageParam }) => api.findRecipes(searchParams.get('q') || '', pageParam || searchParams.get('cursor')),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      enabled: false,
      refetchOnMount: false
    })

  // init search parameters and set search text
  useEffect(() => {
    const cursor = searchParams.get('cursor') ?? Math.floor(Date.now() / 1000).toString()
    const query = searchParams.get('q') ?? ''
    searchParams.set('cursor', cursor)
    searchParams.set('q', query)
    setSearchParams(searchParams, { replace: true })
    setSearchText(query)
    if (hasNextPage) {
      fetchNextPage()
    } else {
      refetch()
    }
  }, [searchParams.get('q')])

  const onSubmit = (ev) => {
    searchParams.set('q', searchText)
    setSearchParams(searchParams)
  }

  return (
    <WithSideBar selected='search'>
      <Loading show={isLoading}>
        <div className='overflow-auto h-full'>
          <div className='py-4 text-center h-18'>
            <div className='w-full h-12'>
              <input
                type='text'
                value={searchText}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    searchParams.set('q', ev.target.value)
                    setSearchParams(searchParams)
                  }
                }}
                onChange={(ev) => {
                  setSearchText(ev.target.value)
                }}
                className='
          px-3
          py-1.5
          border
          transition
          ease-in-out
          h-full
          w-1/2
          focus:border-blue-300 focus:outline-none
        ' placeholder='Search'
              />
              <button
                onClick={onSubmit} className='px-3
          py-1.5 border border-l-0 transition h-full align-bottom  active:bg-gray-100'
              >
                <MdSearch />
              </button>
            </div>
            {
            error
              ? <GenericError />
              : <></>
            }
          </div>
          <RecipeList
            data={data}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            sessionStorageName='searchPage'
          />
          {hasNextPage && isFetchingNextPage
            ? <p>Loading...</p>
            : <></>}

          {data && !data.pages.at(0).recipes.length
            ? <NoResults query={searchParams.get('q')} />
            : <></>}
        </div>

      </Loading>
    </WithSideBar>
  )
}
