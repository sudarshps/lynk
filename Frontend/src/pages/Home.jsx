import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import SwipeableTemporaryDrawer from '../components/Drawer'
import BlogCard from '../components/Card'
import axiosApi from '../api/axiosApi'

const Home = () => {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [articles, setArticles] = React.useState([])
    const openDrawer = () => {
        setIsDrawerOpen(prev => !prev)
    }
    const handleClose = () => {
        setIsDrawerOpen(false)
    }

    React.useEffect(() => {
        const fetchArticles = async () => {
            await axiosApi.get(`/api/article/fetcharticles`)
            .then((res)=>setArticles(res.data.articles))
            .catch((err)=>console.error(err))
        }
        fetchArticles()
    }, [])


    return (
        <div>
            <ResponsiveAppBar isDrawerOpen={openDrawer} />
            <SwipeableTemporaryDrawer open={isDrawerOpen} onClose={handleClose} />
            <BlogCard articles={articles} />
        </div>
    )
}

export default Home