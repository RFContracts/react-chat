import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import './Header.css';

export const Header = ({history}) => {
  const user = useSelector(state => state.chat.user);

  if (!user) {
    history.push('/');
    return null
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div className="header-user">
            {user.name}
          </div>
          <Link to="/" className="header-btn">
            Logout
          </Link>
        </div>
      </div>
    </header>
  )
};
