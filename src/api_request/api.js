import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // Если вам нужно использовать куки или авторизацию с сервером
});

// const instanceUser = axios.create({
//   baseURL: 'https://api.clerk.com/v1',
//   headers: {
//     Authorization: `Bearer 222`,
//   },
// });

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// const { getToken } = useAuth();

// const instanceUser = axios.create({
//   baseURL: 'https://api.clerk.com/v1',
//   headers: {
//     Authorization: `Bearer ${await getToken()}`,
//   },
// });

export const getSity = async () => {
  const response = await instance.get(`/api/city`);
  return response;
};

// export const newSetDataTours = async (newTours) => {
//   debugger;
//   try {
//     const response = await instance.post('/newsetdatatours', newTours);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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

// axios.get('http://localhost:5000/tours') // Замените URL на URL вашего сервера
//   .then(response => {
//     const tours = response.data;
//     // Обработайте полученные данные о турах
//     console.log('Tours:', tours);
//   })
//   .catch(error => {
//     console.error('Error fetching tours:', error);
//   });

  export const getTours = async () => {
    const response = await instance.get('/tours/gettours');
    const tours = response.data;
    return tours;
  };

const options = {
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${clerkPubKey}`
  }
};

// const instanceUser = axios.create({
//   baseURL: 'https://clean-penguin-8.clerk.accounts.dev/v1',
//   headers: {
//     Accept: "*/*",
//     Authorization: `Bearer ${clerkPubKey}`,
//   },
// });

const instanceUser = axios.create({
  headers: {
    Accept: "*/*",
    Authorization: `Bearer ${clerkPubKey}`,
  },
});

export const getUser = async (userId) => {
  const response = await instanceUser.get(`/users/${userId}`, options);
  return response;
};

// export const getUser = async (userId) => {
//   const response = await axios.get(`https://clean-penguin-8.clerk.accounts.dev/v1/users/${userId}`, options)
//   return response;
// };