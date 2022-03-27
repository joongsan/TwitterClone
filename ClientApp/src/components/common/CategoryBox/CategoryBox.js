import React from 'react'
import './CategoryBox.css'

const CategoryBox = ({lable}) => {
  return (
    <p className='lable'>
        {lable}
    </p>
  )
}

export default CategoryBox