// // frontend/src/context/authContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     // localStorage.setItem('userInfo', JSON.stringify(userData));
//     localStorage.setItem('token', userData.token);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('userInfo');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

// frontend/src/context/authContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    return axios.post('/api/users/logout');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };