import WithSideBar from '../../Components/WithSideBar'
import { MdSearch } from 'react-icons/md'
import { ErrorDialog } from '../../Components/ErrorDialog'
import { useSearchParams } from 'react-router-dom'
import React, { useEffect, useState, useMemo } from 'react'
import * as api from '../../api'
import { useInfiniteQuery } from 'react-query'
import { Loading } from '../../Components/Loading'
import { RecipeList } from '../../Components/RecipeList'
import { debounce } from 'lodash'
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
  const [searchText, setSearchText] = useState(searchParams.get('q') ?? '')
  const [typeText, setTypeText] = useState(searchParams.get('q') ?? '')

  const {
    fetchNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    hasNextPage,
    error,
    refetch
  } = useInfiniteQuery(['fetchRecipes', searchText],
    ({ pageParam }) => api.findRecipes(searchText, pageParam || Math.floor(Date.now() / 1000)),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      enabled: false,
      refetchOnMount: false
    })

  // auto search when there are more than 3 characters
  useEffect(() => {
    searchDebounced()
  }, [Math.max(2, typeText.length)])

  function search () {
    if (hasNextPage) {
      fetchNextPage()
    } else {
      refetch()
    }
  }
  const searchDebounced = useMemo(() => debounce(search, 500), [])

  function onSubmit (ev) {
    searchParams.set('q', searchText)
    setSearchParams(searchParams)
    setSearchText(ev.target.value)
    searchDebounced()
  }

  function keyPressHandle (ev) {
    if (ev.key === 'Enter') {
      searchParams.set('q', ev.target.value)
      setSearchParams(searchParams)
      setSearchText(ev.target.value)
    }
  }

  function onChangeHandle (ev) {
    const shouldAutoSearch = ev.target.value.length > 2
    setTypeText(ev.target.value)
    if (shouldAutoSearch) {
      setSearchText(ev.target.value)
    }
  }

  return (
    <WithSideBar selected='search'>
      <Loading show={false}>
        <div className='overflow-auto h-full'>
          <div className='py-4 text-center h-18'>
            <div className='w-full h-12'>
              <input
                type='text'
                autoFocus
                value={typeText}
                onKeyPress={keyPressHandle}
                onChange={onChangeHandle}
                className='
          px-3
          py-1.5
          border
          transition
          ease-in-out
          h-full
          md:w-1/2
          w-48
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
            ? <NoResults query={searchText} />
            : <></>}
        </div>

      </Loading>
    </WithSideBar>
  )
}
