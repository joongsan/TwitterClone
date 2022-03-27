import React from 'react'
import { Link } from 'react-router-dom'
import CategoryBox from '../../../common/CategoryBox/CategoryBox'
import './BlogItemsStyle.css'

const BlogItems = ({
  blog : {
    PostId, 
    PostBody,
    PostTitle,
    DateCreated,
    UserId,
    Category,
    cover
  },
}) => {
  return (
    <div className='blogItem-wrap'>
        <img src='/assets/images/image3.jpg' alt="cover" className='blogItem-cover'/>
        <CategoryBox lable={Category} />
        <h3>{PostTitle}</h3>
        <p className='blogItem-desc'>{PostBody}</p>

        <footer>
          <div className='blogItem-author'>
            <img src='/assets/images/author.png' alt='avatar' />
              <div>
                <h6>{UserId}</h6>
                <p>{DateCreated}</p>
              </div>
          </div>
          <Link className='blogItem-link' to={`/blog/${PostId}`}> See Post </Link>
        </footer>  
    </div>
  )
}

export default BlogItems