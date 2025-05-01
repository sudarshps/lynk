import React, { useState } from 'react';
import ResponsiveAppBar from '../components/Navbar';
import axiosApi from '../api/axiosApi';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Technology',
  'Health',
  'Finance',
  'Travel',
  'Education',
  'Food',
  'Lifestyle',
  'Entertainment',
];

const Preference = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const navigate = useNavigate()

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };
  

  const handleSubmit = async() => {
        if(!selectedCategories.length){
          alert('Select atleast one category!')
          return 
        }
        await axiosApi.put(`/api/users/update`,{selectedCategories})
        .then((res)=>{
          if(res.data.isUpdated){
            navigate('/')
          }
        })
  };

  return (
    <>
      <ResponsiveAppBar />
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif bg-green-300 rounded-xl w-full md:w-2/3 lg:w-1/2 p-4 text-center mb-4 text-gray-800 mx-auto">
        One more step to go!
      </h1>


      <div className="max-w-xl mx-auto p-6 mt-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Your Interests</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`p-3 rounded-xl text-center border 
              ${selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-800 border-gray-300'}
              transition duration-200`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </>

  );
};

export default Preference;
