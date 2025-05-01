import React from 'react'
import ResponsiveAppBar from '../components/Navbar'
import SwipeableTemporaryDrawer from '../components/Drawer'
import BlogCard from '../components/Card'

const Home = () => {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [products, setProducts] = React.useState([])
    const openDrawer = () => {
        setIsDrawerOpen(prev => !prev)
    }
    const handleClose = () => {
        setIsDrawerOpen(false)
    }

    React.useEffect(() => {
        const fetchProducts = async () => {
            fetch('https://fakestoreapi.com/products')
                .then(response => response.json())
                .then(data => {
                    setProducts(data)
                });
        }
        fetchProducts()
    }, [])


    return (
        <div>
            <ResponsiveAppBar isDrawerOpen={openDrawer} />
            <SwipeableTemporaryDrawer open={isDrawerOpen} onClose={handleClose} />
            <BlogCard products={products} />
        </div>
    )
}

export default Home