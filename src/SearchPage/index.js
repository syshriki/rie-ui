import WithSideBar from '../WithSideBar'
import { MdSearch, MdDinnerDining } from 'react-icons/md'
import { RecipeItem } from './RecipeItem'
import { ErrorDialog } from '../ErrorDialog'
import { useSearchParams } from 'react-router-dom'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import * as api from '../api'
import { useInfiniteQuery } from 'react-query'
import { Loading } from '../Loading'

// TODO loading animatin for infite scroll

function NoData () {
  return (
    <div className='flex-col grow'>
      <div className='flex items-center justify-center h-full'>
        <MdDinnerDining size='15em' />
      </div>
    </div>
  )
}

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
  const [inputSearchText, setSearchText] = useState('')
  const nextPageMarker = useRef(null)
  const observer = useRef(null)
  const scrollRestorePoint = useRef(null)

  const {
    fetchNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    hasNextPage,
    error
  } = useInfiniteQuery(['fetchRecipes', searchParams.get('q'), searchParams.get('cursor')],
    ({ pageParam }) => api.findRecipes(searchParams.get('q'), pageParam || searchParams.get('cursor')),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      enabled: false
    })

  const scrollNext = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [hasNextPage])

  // init scroll restoration point
  useEffect(() => {
    if (scrollRestorePoint.current) {
      scrollRestorePoint.current.scrollIntoView()
      window.sessionStorage.removeItem('searchPageScrollRestore')
      scrollRestorePoint.current = null
    }
  }, [])

  // init search parameters and set search text
  useEffect(() => {
    const cursor = searchParams.get('cursor') ?? Math.floor(Date.now() / 1000).toString()
    searchParams.set('cursor', cursor)
    setSearchParams(searchParams)
    if (searchParams.get('q')) {
      setSearchText(searchParams.get('q'))
      fetchNextPage()
    }
  }, [searchParams.get('q')])

  // init infinite scroll
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new window.IntersectionObserver((e) => {
      scrollNext(e)
    }, {
      root: null,
      rootMargin: '20px',
      threshold: 0
    })
    if (nextPageMarker.current) {
      observer.current.observe(nextPageMarker.current)
    }
  }, [scrollNext])

  const onSubmit = (ev) => {
    searchParams.set('q', inputSearchText)
    setSearchParams(searchParams)
  }

  return (
    <WithSideBar selected='search'>
      <Loading show={isLoading}>
        <div className='overflow-auto'>
          <div className='py-4 text-center h-18'>
            <div className='w-full h-12'>
              <input
                type='text'
                value={inputSearchText}
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
          {
            data
              ? <div className='flex flex-col pb-9 space-y-12 divide-y divide-slate-200'>
                {data.pages.map(page =>
                  <React.Fragment
                    key={page.nextCursor}
                  >
                    {page.recipes.map(r =>
                      <RecipeItem
                        {...r}
                        key={r.id}
                        ref={r.id === window.sessionStorage.getItem('searchPageScrollRestore') ? scrollRestorePoint : null}
                        onRecipeClick={(ev) => {
                          window.sessionStorage.setItem('searchPageScrollRestore', r.id)
                        }}
                      />)}
                  </React.Fragment>)}
                <div ref={nextPageMarker} />

                </div>
              : <></>
          }
        </div>
        {hasNextPage && isFetchingNextPage
          ? <p>Loading...</p>
          : <></>}

        {!data
          ? <NoData />
          : <></>}

        {data && !data.pages.at(0).recipes.length
          ? <NoResults query={searchParams.get('q')} />
          : <></>}
      </Loading>
    </WithSideBar>
  )
}
