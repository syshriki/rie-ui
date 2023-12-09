import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function formatDate (epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString()
}

function singleNewsItem (news) {
  return (
    <div className='flex flex-row h-32' key={news.id}>
      <div className='flex w-40 justify-center p-4'> {formatDate(news.createdAt)} </div>
      <div className='flex flex-col justify-between p-4'>
        <div className='mb-6'>
          <Link
            to={`${news.type}/${news.recipeSlug}`}
            className='text-gray-900 font-bold text-xl cursor-pointer hover:underline decoration-dashed'
          >
            <div className='text-gray-900 font-bold text-xl'>{news.title}</div>
          </Link>
          <p className='text-gray-700 text-base'>{news.text} by {news.author}</p>
        </div>
      </div>
    </div>
  )
}
export default function NewsList (props) {
  return (
    <div className='flex flex-col pb-9 space-y-12 divide-y divide-slate-200'>
      {
        props.news.map(singleNewsItem)
      }
    </div>
  )
}

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      text: PropTypes.string,
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired
    })
  )
}
