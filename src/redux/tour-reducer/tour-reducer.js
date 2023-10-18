import { getTours } from "../../api_request/api";

const ACTION_SET_FAVOURITES = "ACTION_SET_FAVOURITES";
const ACTION_SET_TOURS = "ACTION_SET_TOURS ";


export const toggleFavouriteTour = (tourId, num) => ({
    type: ACTION_SET_FAVOURITES,
    tourId,
    num,
  });

export const setToursState = (tours) => ({ type: ACTION_SET_TOURS, tours })

// let initialState = {
//     toursItem: [
//         {
//             id: 0,
//             name: 'Валентина',
//             surname: 'Кошкина',
//             age: 33,
//             avatar: 'https://sport-marafon.ru/upload/blog/img/20/2030-005.jpg',
//             level: 'Средний',
//             city: 'Санкт-Петербург',
//             isTours: {
//                 isMale: false,
//                 isSeekingCouple: true,
//                 isSeekingFemale: false,
//                 isGroup: false,
//             },
//             description: {
//                 text: 'Люблю прогулки, походы, общение. Предлагаю провести время совместно с компанией/человеком/парой. Выезжаю из Челябинска в Крым на своей машине 29.06.2023, можно ехать вместе.',
//                 images: 'https://sportishka.com/uploads/posts/2022-03/1646183350_1-sportishka-com-p-pokhodi-devushki-turizm-krasivo-foto-1.jpg',
//             },
//             goal: 'Найти друзей',
//             when: {
//                 day: 2,
//                 month: 7,
//                 year: 2023,
//             },
//             transport: {
//                 train: true,
//                 air: true,
//                 car: true,
//                 bicycle: false,
//             },
//             places: [
//                 'Россия',
//                 'Омск',
//                 'Горно-Алтайск',
//                 'Республика Алтай'
//             ],
//             favourites: {
//                 Ihave: true,
//                 total: 30,
//             },
//         },
//         {
//             id: 1,
//             name: 'Татьяна',
//             surname: 'Томсон',
//             age: 33,
//             avatar: 'https://sport-marafon.ru/upload/blog/img/20/2030-005.jpg',
//             level: 'Средний',
//             city: 'Санкт-Петербург',
//             isTours: {
//                 isMale: false,
//                 isSeekingCouple: true,
//                 isSeekingFemale: false,
//                 isGroup: false,
//             },
//             description: {
//                 text: 'Люблю прогулки, походы, общение. Предлагаю провести время совместно с компанией/человеком/парой. Выезжаю из Челябинска в Крым на своей машине 29.06.2023, можно ехать вместе.',
//                 images: 'https://sportishka.com/uploads/posts/2022-03/1646183350_1-sportishka-com-p-pokhodi-devushki-turizm-krasivo-foto-1.jpg',
//             },
//             goal: 'Найти друзей',
//             when: {
//                 day: 2,
//                 month: 7,
//                 year: 2023,
//             },
//             transport: {
//                 train: true,
//                 air: false,
//                 car: true,
//                 bicycle: false,
//             },
//             places: [
//                 'Россия',
//                 'Омск',
//                 'Горно-Алтайск',
//                 'Республика Алтай'
//             ],
//             favourites: {
//                 Ihave: true,
//                 total: 30,
//             },
//         }
//     ],
// };

let initialState = {
    toursItem: [

    ],
};

export const getToursCatalog = () => {
    return (dispatch) => {
        getTours().then(response => {  
           dispatch(setToursState(response));
        });
    }
}


const tourReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_SET_TOURS: {
            return { ...state, toursItem: action.tours} 
        }
        case ACTION_SET_FAVOURITES: {
        const { tourId, num } = action; // Извлекаем tourId и num из action
        
        const updatedToursItem = state.toursItem.map((tour) => {
          if (tour.id === tourId) {
            return {
              ...tour,
              favourites: num, // Обновляем favourites с num, как передано в action
            };
          }
          return tour;
        });
  
        return {
          ...state,
          toursItem: updatedToursItem,
        };
      }
      default:
        return state;
    }
  };
  
  export default tourReducer;