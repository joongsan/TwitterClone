import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryBox from '../../components/common/CategoryBox/CategoryBox';
import EmptyList from '../../components/common/CategoryBox/EmptyList/EmptyListIndex';
import { blogList } from '../../config/HardCodedData';
import './BlogStyle.css'

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlogs] = useState(null)

    useEffect( () => {
      let blog = blogList.find(blog => blog.id === parseInt(id));

      if(blog) {
        setBlogs(blog);
      }
    }, []);

    return (
      <div>
        <Link className='blog-goBack' to='/'>
          <span>&#8592; </span> Go Back
        </Link>

        {
          blog ? 
          <div className='blog-wrap'>
              <header>
                <p className='blog-date'>Published {blog.createdAt} </p>
                <h1>{blog.title}</h1>
                <div className='blog-subCategory'>
                  {blog.subCategory.map((category, index) => <div>
                    <CategoryBox key= {index} lable = {category}/>
                  </div>
                  )}
                </div>
              </header>
              <img src={blog.cover} alt='cover'/>
              <p className='blog-desc'>{blog.description}</p>
          </div> : (<EmptyList/>)
        }
      </div>
    );
}

export default Blog


