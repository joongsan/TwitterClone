import React from 'react'
import './EmptyListStyle.css'

/**
 * TODO: Improve page to hold images from cloud and possibly add go back button?
 * @returns Empty page when there are no data to return.
 */

const EmptyList = () => {
  return (
    <div className='emptyList-wrap'>
        <img src='/assets/images/empty.png' alt='empty' />
    </div>
  )
}

export default EmptyList