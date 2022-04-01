import React, {Component} from 'react';
import './HeaderStyle.css';

/**
 * Title to explain what Home page is desiged for
 * @returns Header title for Homepage
 */
export class Header extends Component {

  render () {
    return (
      <header className='home-header'>
        <h2>Today's Update</h2>
            <h1>
                <span>"</span> Blog <span>"</span>
            </h1>
            <p>This is the news update</p>
      </header>
    );
  }
}