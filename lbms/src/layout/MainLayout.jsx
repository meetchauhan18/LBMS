import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar';

const MainLayout = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <NavBar />
      <div style={{ margin: 0, padding: 0 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout;
