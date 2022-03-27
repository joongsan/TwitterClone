import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CategoryBox from '../../components/common/CategoryBox/CategoryBox';
import EmptyList from '../../components/common/CategoryBox/EmptyList/EmptyListIndex';
import { blogList } from '../../config/HardCodedData';
import './BlogStyle.css'

export default class Blog extends Component {
    constructor(props) {
      super(props);

      this.state = {
        blog : []
      }
    }
    redner () {
      const {
        blog
      }= this.state;

      return (
        <div>
          <Link className='blog-goBack' to='/'>
            <span>&#8592; </span> Go Back
          </Link>
          {blog.map(blog => 

            <div className='blog-wrap'>
                <header>
                  <p className='blog-date'>Published {blog.DateCreated} </p>
                  <h1>{blog.PostTitle}</h1>
                  <div className='blog-subCategory'>
                    <div>
                      {blog.Category}
                    </div>
                  </div>
                </header>
                <img src={blog.cover} alt='cover'/>
                <p className='blog-desc'>{blog.PostBody}</p>
            </div>
          )}
        </div>
      );
    }
}

