import React from 'react'
import ErrorPage from './ErrorPage'
export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError () {
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    console.log({ error, errorInfo })
  }

  render () {
    if (this.state.hasError) {
      this.state.hasError = false
      // You can render any custom fallback UI
      return <ErrorPage />
    }

    return this.props.children
  }
}
