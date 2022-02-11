import * as api from './api.js';
import { addOwner, endpoints } from './data.js';


const pageSize = 5;

// export async function getRecentRecipes() {
//     return api.get(endpoints.recent);
// }

// export async function getRecipes(page, query) {
//     const data = await (() => {
//         if (query) {
//             query = {
//                 name: {
//                     $text: {
//                         $search: {
//                             $term: query,
//                             $caseSensitive: false
//                         }
//                     }
//                 }
//             };
//             return api.get(endpoints.recipeSearch(page, query, pageSize));
//         } else {
//             return api.get(endpoints.recipes(page, pageSize));
//         }
//     })();
//     data.pages = Math.ceil(data.count / pageSize);

//     return data;
// }


export async function getReservation() {
    return api.get(endpoints.reservations);
}

export async function getReservationById(id) {
    return api.get(endpoints.reservationDetails(id));
}

export async function createReservation(reservation) {
    addOwner(reservation)

    return api.post(endpoints.reservations, reservation)
};

export async function updateReservation(id, reservation) {
    return api.put(endpoints.reservationById + id, reservation)
};

export async function deleteReservation(id) {

    return api.del(endpoints.reservationById + id)
};