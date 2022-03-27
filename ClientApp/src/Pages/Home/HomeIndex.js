import React, { useState } from 'react';
import EmptyList from '../../components/common/CategoryBox/EmptyList/EmptyListIndex';
import BlogList from '../../components/HomePage/BlogList/BlogListIndex';
import { Header } from '../../components/HomePage/Header/HeaderIndex';
import SearchBar from '../../components/HomePage/SearchBar/SearchBarIndex';
import { blogList } from '../../config/HardCodedData';
import { data } from '../../config/data.js';

const Home = () => {

    const [blogs, setBlogs] = useState(blogList);
    const [serchKey, setSearchKey] = useState('')

    const handleSearchSubmit = event => {
      event.preventDefault();
      handleSearchResults();
    }

    const handleSearchResults = () => {
      const allBlogs = blogList;
      const filteredBlogs = allBlogs.filter(blog => 
        blog.category.toLowerCase().includes(serchKey.toLowerCase().trim()))

      setBlogs(filteredBlogs);
    }

    const handleClearSearch = () => {
      setBlogs(blogList);
      setSearchKey('');
    }
    
    return (
      <div>
        
        {/* Page Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar 
          value={serchKey}
          handleSearchKey={e => setSearchKey(e.target.value)}
          clearSearch={handleClearSearch} 
          formSubmit={handleSearchSubmit} 
        />

        {/* Blog List & Empty List*/}
        {!blogs.length ? <EmptyList/> : <BlogList blogs= {blogs} />}

      </div>
    );
}

export default Home;
