// src/services/userService.js
export const fetchUserProfile = async (userId) => {
  // Example API call to fetch user profile
  const response = await fetch(`/api/profile/${userId}`);
  if (!response.ok) throw new Error('Profile fetch failed');
  return response.json();
};
