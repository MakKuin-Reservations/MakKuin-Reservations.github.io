import { getUserData } from '../util.js';

const pageSize = 2;

export const endpoints = {
    recent: '/classes/ReservationPB?limit=3&order=-createdAt',
    recent: '/classes/ReservationPS?limit=3&order=-createdAt',
    recent: '/classes/ReservationDisco?limit=3&order=-createdAt',
    recent: '/classes/ReservationDC?limit=3&order=-createdAt',
    recent: '/classes/ReservationMovie?limit=3&order=-createdAt',


    reservationDC: `/classes/ReservationDC`,
    reservationDisco: `/classes/ReservationDisco`,
    reservationPB: `/classes/ReservationPB`,
    reservationPS: `/classes/ReservationPS`,
    reservationMovie: `/classes/ReservationMovie`,

    //reservationMovie: (page) => `/classes/ReservationMovie?skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
    //reservationSearch: (page, query) => `/classes/ReservationMovie?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,


    reservationPBDetails: (id) => `/classes/ReservationPB/${id}?include=owner`,
    reservationPSDetails: (id) => `/classes/ReservationPS/${id}?include=owner`,
    reservationDCDetails: (id) => `/classes/ReservationDC/${id}?include=owner`,
    reservationMovieDetails: (id) => `/classes/ReservationMovie/${id}?include=owner`,
    reservationDiscoDetails: (id) => `/classes/ReservationDisco/${id}?include=owner`,

    creatReservtionDC: '/classes/ReservationDC/',
    creatReservtionDisco: '/classes/ReservationDisco/',
    creatReservtionPB: '/classes/ReservationPB/',
    creatReservtionPS: '/classes/ReservationPS/',
    creatReservtionMovie: '/classes/ReservationMovie/',

    reservationPBById: '/classes/ReservationPB/',
    reservationPSById: '/classes/ReservationPS/',
    reservationDCById: '/classes/ReservationDC/',
    reservationDiscoById: '/classes/ReservationDisco/',
    reservationMovieById: '/classes/ReservationMovie/',



    comments: '/classes/Comment',
    commentsByRecipe: (reservationId) => `/classes/Comment?where=${createPointerQuery('reservation', 'Reservation', reservationId)}&include=owner&order=-createdAt`,
};

export function createPointerQuery(propName, className, objectId) {
    return createQuery({
        [propName]: createPointer(className, objectId)
    });
}

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query));
}

export function createPointer(className, objectId) {
    return {
        __type: 'Pointer',
        className,
        objectId
    };
}

export function addOwner(record) {
    const { id } = getUserData();
    record.owner = createPointer('_User', id);

    return record;
}