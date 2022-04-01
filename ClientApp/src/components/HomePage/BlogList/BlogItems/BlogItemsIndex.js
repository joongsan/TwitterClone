import React from 'react'
import { Link } from 'react-router-dom'
import CategoryBox from '../../../common/CategoryBox/CategoryBox'
import './BlogItemsStyle.css'

/**
 * This component is for populating singe blog
 * BlogList will populate multiple blogs using this component
 * 
 * @returns Singe blog post
 */

const BlogItems = ({
  blog : {
    id, 
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    category,
    cover
  },
}) => {
  return (
    <div className='blogItem-wrap'>
        <img src={cover} alt="cover" className='blogItem-cover'/>
        <CategoryBox lable={category} />
        <h3>{title}</h3>
        <p className='blogItem-desc'>{description}</p>

        <footer>
          <div className='blogItem-author'>
            <img src={authorAvatar} alt='avatar' />
              <div>
                <h6>{authorName}</h6>
                <p>{createdAt}</p>
              </div>
          </div>
          <Link className='blogItem-link' to={`/blog/${id}`}> See Post </Link>
        </footer>  
    </div>
  )
}

export default BlogItems