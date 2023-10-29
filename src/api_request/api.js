import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Если вам нужно использовать куки или авторизацию с сервером
});

export const getSity = async () => {
  const response = await instance.get(`/api/city`);
  return response;
};

export const newSetDataTours = async (newTours) => {
  try {
    const formData = new FormData();
    for (const key in newTours) {
      formData.append(key, newTours[key]);
    }
    const response = await instance.post('/tours/newsetdatatours', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 

export const newSetDataUser = async (newUserData) => {
  debugger;
  try {
    const response = await instance.post('/user/updateuserdata', newUserData); // Исправлен путь для добавления данных пользователя
    return response.data;
  } catch (error) {
    throw error;
  }
};

  export const getTours = async () => {
    const response = await instance.get('/tours/gettours');
    const tours = response.data;
    return tours;
  };

  export const registerUser = async (userData) => {
    try {
      const response = await instance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Axios Error:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Status Code:', error.response.status);
      }
      throw error;
    }
  };

  const createAuthInstance = (token) => {
    return axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true,
      headers: {
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  export const getDataUserFromServer = async (token) => {
    console.log('Это токен в getDataUserFromServer: ', token)
    try {
      const authInstance = createAuthInstance(token);
      const response = await authInstance.get('user/userdata');
      console.log('Ответ из getDataUserFromServer', response);
      if (response.status === 200) {
        console.log('status === 200', response);
        return response.data;
      } else {
        throw new Error('Ошибка при получении данных пользователя');
      }
    } catch (error) {
      throw error;
    }
  };

export const signUpUser = async (userData) => {
  try {
    const response = await instance.post('user/signup', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await instance.post('user/auth', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  // export const getDataUserFromServer = async (token) => {
  //   console.log('Это токен в getDataUserFromServer: ', token)
  //   try {
  //     const response = await instance.get('user/userdata', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
      
  //     if (response.status === 200) {
  //       console.log('status === 200', response)
  //       return response.data; // Вернуть данные пользователя
  //     } else {
  //       throw new Error('Ошибка при получении данных пользователя');
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // export const loginUser = async (userData) => {
  //   try {
  //     const response = await instance.post('/auth/login', userData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Axios Error:', error);
  //     if (error.response) {
  //       console.error('Response Data:', error.response.data);
  //       console.error('Status Code:', error.response.status);
  //     }
  //     throw error;
  //   }
  // };

  // export const loginUser = async (userData) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     debugger;
  //     const response = await instance.post('/auth/login', userData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
      
  //     console.log('Response Status Code:', response ? response.status : 'Undefined'); // Добавьте эту строку
  
  //     return response.data;
  //   } catch (error) {
  //     console.error('Axios Error:', error);
  //     if (error.response) {
  //       console.error('Response Data:', error.response.data);
  //       console.error('Status Code:', error.response.status);
  //     }
  //     throw error;
  //   }
  // };
  
  // export const loginUser = async (userData) => {
  //   try {
  //     const response = await instance.post('/auth/login', userData); 
  //     console.log('Response Status Code:', response ? response.status : 'Undefined'); // Добавьте эту строку
  //     return response.data;
  //   } catch (error) {
  //     console.error('Axios Error:', error);
  //     if (error.response) {
  //       console.error('Response Data:', error.response.data);
  //       console.error('Status Code:', error.response.status);
  //     }
  //     throw error;
  //   }
  // };

// const options = {
//   headers: {
//     Accept: "*/*",
//     Authorization: `Bearer ${clerkPubKey}`
//   }
// };

// const instanceUser = axios.create({
//   headers: {
//     Accept: "*/*",
//     Authorization: `Bearer ${clerkPubKey}`,
//   },
// });

// export const getUser = async (userId) => {
//   const response = await instanceUser.get(`/users/${userId}`, options);
//   return response;
// };