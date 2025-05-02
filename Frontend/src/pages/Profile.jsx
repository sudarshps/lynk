import { useState, useEffect } from 'react';
import axiosApi from '../api/axiosApi';
import ResponsiveAppBar from '../components/Navbar';
import Swal from 'sweetalert2'

const availableCategories = [
  'Technology', 'Health', 'Finance', 'Travel',
  'Education', 'Food', 'Lifestyle', 'Entertainment',
];

export default function ProfileSettings() {
  const [user, setUser] = useState({ firstName: '', email: '', phone: '', preference: [] });
//   const [isEditingContact, setIsEditingContact] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosApi.get('/api/users/profile');
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchUser();
  }, []);

  const handleCategoryToggle = (cat) => {
    setUser((prev) => ({
      ...prev,
      preference: prev.preference.includes(cat)
        ? prev.preference.filter(c => c !== cat)
        : [...prev.preference, cat]
    }));
  };

  const handleSave = async () => {
    try {
      await axiosApi.put('/api/users/update', {
        firstName: user.firstName,
        selectedCategories: user.preference
      });
      Swal.fire({
            title: "Success!",
            text: 'Profile updated!',
            icon: "success"
          });
    } catch (err) {
      console.error(err);
       Swal.fire({
              icon: "error",
              title: "Oops...",
              text: 'Error updating profile.',
            });
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.newPass) return alert('Fill both fields');
    try {
      await axiosApi.put('/api/users/update', passwords);
      Swal.fire({
            title: "Success!",
            text: 'password updated!',
            icon: "success"
          });
      setPasswords({ current: '', newPass: '' });
      setShowPasswordFields(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Settings</h2>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              disabled={true}
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Phone</label>
            <input
              type="text"
              disabled={true}
              className="w-full border px-4 py-2 rounded-md bg-gray-100 text-gray-700"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>

        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2 text-gray-700">Article Preferences</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryToggle(cat)}
                className={`px-3 py-2 rounded-md text-sm font-medium border
                  ${user.preference.includes(cat)
                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                    : 'bg-gray-100 text-gray-800 border-gray-300'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

        <div className="mt-12 border-t pt-6">
          <h3 className="font-semibold text-gray-700 mb-4">Security</h3>

          {!showPasswordFields && (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setShowPasswordFields(true)}
            >
              Change Password
            </button>
          )}

          {showPasswordFields && (
            <>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border px-4 py-2 rounded-md"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border px-4 py-2 rounded-md"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handlePasswordChange}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordFields(false);
                    setPasswords({ current: '', newPass: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
