import React, { useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { RecipeItem } from './RecipeItem'

export const RecipeList = (props) => {
  const nextPageMarker = useRef(null)
  const observer = useRef(null)
  const scrollRestorePoint = useRef(null)

  const scrollNext = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && props.hasNextPage && !props.isLoading) {
      props.fetchNextPage()
    }
  }, [props.hasNextPage])

  // init scroll restoration point
  useEffect(() => {
    if (props.sessionStorageName && scrollRestorePoint.current) {
      scrollRestorePoint.current.scrollIntoView()
      window.sessionStorage.removeItem(props.sessionStorageName)
      scrollRestorePoint.current = null
    }
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

  const withSeperator = 'flex flex-col divide-y divide-slate-200 md:px-8 px-12'
  const withoutSeperator = 'flex flex-col md:px-8 px-12'
  return props.data
    ? <div className={props.noSeperator ? withoutSeperator : withSeperator}>
      {
            props.data.pages.map(page =>
              <React.Fragment
                key={page.nextCursor}
              >
                {page.recipes.map(r =>
                  <RecipeItem
                    {...r}
                    key={r.id}
                    ref={r.id === window.sessionStorage.getItem(props.sessionStorageName) ? scrollRestorePoint : null}
                    onRecipeClick={(ev) => {
                      if (props.sessionStorageName) {
                        window.sessionStorage.setItem(props.sessionStorageName, r.id)
                      }
                    }}
                  />)}
              </React.Fragment>)
        }
      <div ref={nextPageMarker} />

    </div>
    : <></>
}

RecipeList.propTypes = {
  data: PropTypes.object,
  hasNextPage: PropTypes.bool,
  noSeperator: PropTypes.bool,
  isLoading: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  sessionStorageName: PropTypes.string
}
