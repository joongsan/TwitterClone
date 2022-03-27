import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/HomeIndex';
import Blog from './Pages/Blog/BlogIndex';
import User from './Pages/User/UserIndex';

import './custom.css'

const App = () => {
  
    return (
      <div className='container'>

        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/home'>
                Home
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/blog'>
                My Blog
              </NavLink>
            </li>
            <li className='nav-item- m-1'>
              <NavLink className='btn btn-light btn-outline-primary' to='/user'>
                User
              </NavLink>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/blog/:id' component={Blog} />
          <Route path='/user' component={User} />
        </Switch>

      </div>
    );
}

export default App;
