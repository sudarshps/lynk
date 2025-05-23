import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../api/axiosApi';
import { ThumbsUp, ThumbsDown, Ban } from 'lucide-react';
import ResponsiveAppBar from '../components/Navbar';
import { useAuth } from '../api/AuthContext';

export default function ViewBlog() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwnPost, setIsOwnPost] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axiosApi.get(`/api/article/getarticle/${id}`);
                setArticle(res.data.article);
                if (res.data.article.userId._id === user._id) {
                    console.log('hello');
                    
                    setIsOwnPost(true)
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);    

    if (loading) {
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    }

    if (!article) {
        return <p className="text-center mt-10 text-red-500">Article not found.</p>;
    }

    return (
        <>
            <ResponsiveAppBar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
                <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <p>By <span className="font-medium text-gray-700">{article.userId?.firstName || 'Unknown Author'}</span></p>
                    <p>{new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>

                {article.image && (
                    <img
                        src={article.image}
                        alt="Article"
                        className="w-full max-h-[400px] object-cover rounded mb-4"
                    />
                )}

                <p className="text-lg text-gray-800 mb-6 whitespace-pre-line">
                    {article.description}
                </p>

                {article.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className='flex gap-6'>
                    <div className="mb-6 text-gray-600 text-sm">
                        <span className="font-medium">{article.likes.length} likes</span>
                    </div>
                    <div className="mb-6 text-gray-600 text-sm">
                        <span className="font-medium">{article.dislikes.length} dislikes</span>
                    </div>
                </div>


                {!isOwnPost && (
                    <div className="flex gap-4">
                        <button className="flex items-center gap-1 text-green-600 hover:text-green-800">
                            <ThumbsUp size={18} /> Like
                        </button>
                        <button className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800">
                            <ThumbsDown size={18} /> Dislike
                        </button>
                        <button className="flex items-center gap-1 text-red-600 hover:text-red-800">
                            <Ban size={18} /> Block
                        </button>
                    </div>
                )}
            </div>
        </>

    );
}
