import { useState, useRef } from 'react';
import {
    X,
    Tag,
} from 'lucide-react';
import ResponsiveAppBar from '../components/Navbar';
import axiosApi from '../api/axiosApi';
import Swal from 'sweetalert2'


export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const fileInputRef = useRef(null);

    const availableCategories = [
        { id: 1, name: 'Technology' },
        { id: 2, name: 'Health' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Travel' },
        { id: 5, name: 'Education' },
        { id: 6, name: 'Food' },
        { id: 7, name: 'Lifestyle' },
        { id: 8, name: 'Entertainment' }
    ];

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && currentTag.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(currentTag.trim())) {
                setTags([...tags, currentTag.trim()]);
            }
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        if (!validImageTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Only image files (JPEG, PNG, GIF, WebP) are allowed.',
            });
            return;
        }

        setImage({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        });
    };


    const removeImage = () => {
        setImage(null);
    };

    const toggleCategory = (categoryId) => {
        const categoryName = availableCategories.find(cat => cat.id === categoryId)?.name;

        if (!categoryName) return;
        if (selectedCategories.includes(categoryName)) {
            setSelectedCategories(selectedCategories.filter(category => category !== categoryName));
        } else {
            setSelectedCategories([...selectedCategories, categoryName]);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Please enter an article title.',
            });
            return;
        }

        if (!description.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Please enter the article content.',
            });
            return;
        }

        if (selectedCategories.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Please select at least one category.',
            });
            return;
        }

        if (tags.length === 0) {
            const confirm = window.confirm('No tags added. Do you want to proceed without tags?');
            if (!confirm) return;
        }

        if (!image) {
            const confirm = window.confirm('No image uploaded. Do you want to proceed without an image?');
            if (!confirm) return;
        }

        let articleDetails = {
            title,
            description,
            image: null,
            tags,
            selectedCategories
        }

        const formData = new FormData();

        if (image) {
            formData.append('file', image.file);
            formData.append('upload_preset', 'lynk_blog')
            const res = await fetch('https://api.cloudinary.com/v1_1/dqoenwy9q/image/upload', {
                method: 'POST',
                body: formData
            })

            const data = await res.json()
            const imageUrl = data.secure_url
            articleDetails.image = imageUrl

        }

        try {
            await axiosApi.post('/api/article/create', articleDetails)
                .then((res) => {
                    Swal.fire({
                        title: "Success!",
                        text: 'Article saved successfully!',
                        icon: "success"
                    });
                })

        } catch (error) {
            console.error(error);

        }


    };

    return (
        <>
            <ResponsiveAppBar />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Create New Article</h1>
                        <p className="text-gray-600 mt-2">Share your thoughts with the world</p>
                    </div>

                    <div>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Article Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter a compelling title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>


                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Article Content <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your article content here..."
                                rows="10"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images
                            </label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Upload Images
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            {image && <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                <div className="relative group">
                                    <div className="w-full overflow-hidden rounded-md bg-gray-200">
                                        <img
                                            src={image.preview}
                                            alt='Preview'
                                            className="object-cover h-32 w-full"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                                        onClick={() => removeImage()}
                                    >
                                        <X size={16} />
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1 truncate">{image ? image.name : ''}</p>
                                </div>
                            </div>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex items-center">
                                <div className="relative flex-grow">
                                    <Tag size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Add tags and press Enter"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                    />
                                </div>
                            </div>

                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                className="ml-1 text-blue-600 hover:text-blue-800"
                                                onClick={() => removeTag(tag)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categories <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {availableCategories.map(category => (
                                    <div
                                        key={category.id}
                                        className={`
                    cursor-pointer rounded-md px-3 py-2 text-sm font-medium
                    ${selectedCategories.includes(category.name)
                                                ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                                                : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'}
                  `}
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                            {selectedCategories.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">Please select at least one category</p>
                            )}
                        </div>

                        <div className="mt-8">
                            <button
                                type="button"
                                className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                onClick={handleSubmit}
                            >
                                Publish Article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}