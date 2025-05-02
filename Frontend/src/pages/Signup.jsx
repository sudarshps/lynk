import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ResponsiveAppBar from "../components/Navbar";
import { Link } from "react-router-dom";
import DatePickerUI from "../components/DatePicker";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosApi";
import { useAuth } from "../api/AuthContext";

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const {setUser} = useAuth()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleDate = (val) => {
        setFormData({ ...formData, ['dob']: String(`${val.$y}-${val.$M}-${val.$D}`) })
    }
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (formData.dob.trim()) {
            let birthDate = new Date(formData.dob)
            let currentDate = new Date()
            const is13OrOlder = currentDate >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 13));
            if (!is13OrOlder) {
                newErrors.dob = 'User must be 13 years or older!'
            }
        }
        else if (!formData.dob.trim()) {
            newErrors.dob = "Date of birth is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must include at least one uppercase letter";
        } else if (!/[a-z]/.test(formData.password)) {
            newErrors.password = "Password must include at least one lowercase letter";
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must include at least one number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password = "Password must include at least one special character";
        }
        

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await axiosApi.post('/api/users/createuser', formData, { headers: { 'Content-Type': 'application/json' } })
                .then((res) => {
                    if (res.data.userCreated) {
                        Swal.fire({
                            title: "Success!",
                            text: res.data.message,
                            icon: "success"
                        });
                        setUser(res.data.userRegistered)
                        navigate('/preferencesection')
                    }

                    setFormData({
                        firstName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        dob: "",
                        password: "",
                        confirmPassword: ""
                    });

                })
                .catch((err) => {
                    if (!err.response.data.userCreated) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err.response.data.message,
                        });
                    }
                })

        }
    };

    return (
        <>
            <ResponsiveAppBar />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-1/2">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign Up to Lynk
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-2 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`appearance-none block w-full px-3 py-4 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                            placeholder="(123) 456-7890"
                                        />
                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                        Date of Birth <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <DatePickerUI date={handleDate} />
                                        {errors.dob && (
                                            <p className="mt-2 text-sm text-red-600">{errors.dob}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                    {errors.confirmPassword && (
                                        <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full hover:cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link to={'/login'}><button
                                    type="button"
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >Sign in

                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}