import React, { useEffect } from 'react'
import Feed from './feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPosts from '../hooks/useGetAllPosts'

const Home = () => {
useGetAllPosts()
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  )
}

export default Home