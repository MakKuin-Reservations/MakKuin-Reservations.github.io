import { getUserData } from '../util.js';

const pageSize = 10;

export const endpoints = {
    recent: '/classes/Reservations?limit=3',
    reservations: (page) => `/classes/Reservations?skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
    reservationDC: `/classes/ReservationDC`,
    reservationSearch: (page, query) => `/classes/Reservation?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
    reservationDetails: (id) => `/classes/Reservations/${id}?include=owner`,
    creatReservtion: '/classes/Reservations/',
    creatReservtionDC: '/classes/ReservationDC/',
    reservationById: '/classes/Reservations/',
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