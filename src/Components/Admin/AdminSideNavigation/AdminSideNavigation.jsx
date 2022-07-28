import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AdminNavList from '../../../JSON DB/AdminNavList'
import logo from "../../../Images/Navbar/Logo.png"

import './AdminSideNavigation.css'

export default function AdminSideNavigation({closeNav}) {
  return (
    <nav className="admin-side-navigation">
        <Link to='/admin-panel'>
            <img src={logo} className='admin-panel-logo' alt="" />
        </Link>
        <ul className="nav-list">
            {
                AdminNavList.map((item,index) => (
                    <li key={index} className='nav-btn'>
                        <NavLink to={item.link} className={({isActive}) => isActive? "nav-link nav-link--active": 'nav-link'} onClick={() => closeNav()}>{item.title}</NavLink>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}
