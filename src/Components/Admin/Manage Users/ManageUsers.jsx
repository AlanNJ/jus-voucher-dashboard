import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './ManageUsers.css'

export default function ManageUsers() {
  return (
    <section className="manage-users">
        <div className="user-btns-wrapper">
            <NavLink to="/admin-panel/manage-users/add-user" className={({isActive}) => isActive? "btn-user btn-user--active": 'btn-user'}>Add User</NavLink>
            <NavLink to="/admin-panel/manage-users/view-users" className={({isActive}) => isActive? "btn-user btn-user--active": 'btn-user'}>View User</NavLink>
        </div>
        <div className="manage-content">
            <Outlet />
        </div>
    </section>
  )
}
