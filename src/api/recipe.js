import * as api from './api.js';
import { addOwner, endpoints } from './data.js';




export async function getRecentReservation() {
    return api.get(endpoints.recent);
}

export async function getReservation(page, query) {
    //const data = await (() => {
    if (query) {
        query = {
            Name: {
                $text: {
                    $search: {
                        $term: query,
                        $caseSensitive: false
                    }
                }
            }
        };
        return api.get(endpoints.reservationSearch(page, query));
    } else {
        return api.get(endpoints.reservations(page));
    }
    //})();
    //data.pages = Math.ceil(data.count / pageSize);

    //return data;
}



export async function getReservationById(id) {
    return api.get(endpoints.reservationDetails(id));
}

export async function createReservation(reservation) {
    addOwner(reservation)

    return api.post(endpoints.creatReservtion, reservation)
};

export async function updateReservation(id, reservation) {
    return api.put(endpoints.reservationById + id, reservation)
};

export async function deleteReservation(id) {

    return api.del(endpoints.reservationById + id)
};