import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import BlogCard from '../components/Card'
import { useAuth } from '../api/AuthContext'
import Lander from '../components/Lander'

const Home = () => {

    const {user} = useAuth()
    const openDrawer = () => {
        setIsDrawerOpen(prev => !prev)
    }

    return (
        <div>
            <ResponsiveAppBar isDrawerOpen={openDrawer} />
            {user?<BlogCard />:<Lander/>}
        </div>
    )
}

export default Home