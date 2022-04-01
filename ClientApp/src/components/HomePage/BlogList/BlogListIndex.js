import React from 'react'
import BlogItems from './BlogItems/BlogItemsIndex'
import './BlogListStyle.css'

/**
 * Populates list of blogs using BlogItem component
 * @param {*} param0 
 * @returns Blog List
 */

const BlogList = ({ blogs }) => {
    return (
        <div className='blogList-wrap'>
            {blogs.map((blog) => 
                (<BlogItems blog={blog} key={blog.id}/>)
                )
            }
        </div>
    )
}

export default BlogList