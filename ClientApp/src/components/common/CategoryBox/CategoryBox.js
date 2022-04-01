import React from 'react'
import './CategoryBox.css'

/**
 * 
 * @param {lable}  
 * @returns category box with categories assigned to it
 */

const CategoryBox = ({lable}) => {
  return (
    <p className='lable'>
        {lable}
    </p>
  )
}

export default CategoryBox