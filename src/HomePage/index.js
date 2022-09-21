import WithSideBar from '../WithSideBar'
import { useInfiniteQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import * as api from '../api'
import { Loading } from '../Loading'
import React, { useEffect, useRef, useCallback } from 'react'
import { NewsItem } from './NewsItem'

export default function () {
  const [searchParams, setSearchParams] = useSearchParams()
  const nextPageMarker = useRef(null)
  const observer = useRef(null)
  const scrollRestorePoint = useRef(null)

  const {
    fetchNextPage,
    data,
    isLoading,
    hasNextPage,
    error
  } = useInfiniteQuery(['fetchNews', searchParams.get('cursor')],
    ({ pageParam }) => api.fetchNews(pageParam || searchParams.get('cursor')),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnWindowFocus: false
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
      window.sessionStorage.removeItem('homePageScrollRestore')
      scrollRestorePoint.current = null
    }
  }, [])

  // init search parameters and set search text
  useEffect(() => {
    const cursor = searchParams.get('cursor') ?? Math.floor(Date.now() / 1000).toString()
    searchParams.set('cursor', cursor)
    setSearchParams(searchParams)
  }, [])

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

  if (error) {
    throw error
  }

  return (
    <WithSideBar selected='home'>
      <Loading show={isLoading}>
        <div className='overflow-auto h-full'>
          <div className='py-4 text-center h-18'>
            <p className='text-2xl font-bold'>News</p>
          </div>
          <div className='flex flex-col pb-9 space-y-12 divide-y divide-slate-200'>
            {data
              ? data.pages.map(page =>
                <React.Fragment
                  key={page.nextCursor}
                >
                  {page.news.map(n => <NewsItem
                    {...n}
                    key={n.id}
                    ref={n.id === window.sessionStorage.getItem('homePageScrollRestore') ? scrollRestorePoint : null}
                    onNewsClick={(ev) => {
                      window.sessionStorage.setItem('homePageScrollRestore', n.id)
                    }}
                                      />)}
                </React.Fragment>)
              : <>
                </>}
          </div>
          {data ? <div ref={nextPageMarker} /> : <></>}
        </div>
      </Loading>
    </WithSideBar>
  )
}
