import * as api from './api.js';
import { addOwner, endpoints } from './data.js';

const pageSize = 10


export async function getRecentReservation() {
    return api.get(endpoints.recent);
}
// export async function getRecentReservationPB() {
//     return api.get(endpoints.recent);
// }
// export async function getRecentReservationPS() {
//     return api.get(endpoints.recent);
// }
// export async function getRecentReservationDisco() {
//     return api.get(endpoints.recent);
// }
// export async function getRecentReservationMovie() {
//     return api.get(endpoints.recent);
// }


export async function getReservationDC() {
    return api.get(endpoints.reservationDC);
}
export async function getReservationPB() {
    return api.get(endpoints.reservationPB);
}
export async function getReservationPS() {
    return api.get(endpoints.reservationPS);
}
export async function getReservationMovie() {
    return api.get(endpoints.reservationMovie);
}
export async function getReservationDisco() {
    return api.get(endpoints.reservationDisco);
}
export async function getReservation(page, query) {
    const data = await (() => {
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
    })();
    data.pages = Math.ceil(data.count / pageSize);

    return data;
}



export async function getReservationDCById(id) {
    return api.get(endpoints.reservationDCDetails(id));
}
export async function getReservationPBById(id) {
    return api.get(endpoints.reservationPBDetails(id));
}
export async function getReservationPSById(id) {
    return api.get(endpoints.reservationPSDetails(id));
}
export async function getReservationMovieById(id) {
    return api.get(endpoints.reservationMovieDetails(id));
}
export async function getReservationDiscoById(id) {
    return api.get(endpoints.reservationDiscoDetails(id));
}




export async function createReservationDC(reservationDC) {
    addOwner(reservationDC)
    return api.post(endpoints.creatReservtionDC, reservationDC)
};
export async function createReservationDisco(reservationDisco) {
    addOwner(reservationDisco)
    return api.post(endpoints.creatReservtionDisco, reservationDisco)
};
export async function createReservationPB(reservationPB) {
    addOwner(reservationPB)
    return api.post(endpoints.creatReservtionPB, reservationPB)
};
export async function createReservationPS(reservationPS) {
    addOwner(reservationPS)
    return api.post(endpoints.creatReservtionPS, reservationPS)
};
export async function createReservationMovie(reservationMovie) {
    addOwner(reservationMovie)
    return api.post(endpoints.creatReservtionMovie, reservationMovie)
};



export async function updateReservationDC(id, reservationDC) {
    return api.put(endpoints.reservationDCById + id, reservationDC)
};
export async function updateReservationPB(id, reservationPB) {
    return api.put(endpoints.reservationPBById + id, reservationPB)
};
export async function updateReservationPS(id, reservationPS) {
    return api.put(endpoints.reservationPSById + id, reservationPS)
};
export async function updateReservationDisco(id, reservationDisco) {
    return api.put(endpoints.reservationDiscoById + id, reservationDisco)
};
export async function updateReservationMovie(id, reservationMovie) {
    return api.put(endpoints.reservationMovieById + id, reservationMovie)
};



export async function deleteReservationDC(id) {
    return api.del(endpoints.reservationDCById + id)
};
export async function deleteReservationPB(id) {
    return api.del(endpoints.reservationPBById + id)
};
export async function deleteReservationPS(id) {
    return api.del(endpoints.reservationPSById + id)
};
export async function deleteReservationDisco(id) {
    return api.del(endpoints.reservationDiscoById + id)
};
export async function deleteReservationMovie(id) {
    return api.del(endpoints.reservationMovieById + id)
};