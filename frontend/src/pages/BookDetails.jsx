import React from 'react'
import SelectedBook from '../components/SelectedBook'
import Reviews from '../components/Reviews'
import bookStore from '../store/bookStore.js'
import reviewStore from '../store/reviewStore.js'

const BookDetails = () => {
  const {isGettingBooks}=bookStore()
  const {gettingReviews}=reviewStore()
    console.log(isGettingBooks)
    console.log(gettingReviews)

  return (
    <div className=' '>
      <SelectedBook/>
      <Reviews/>
    </div>
  )
}

export default BookDetails