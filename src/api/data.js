import { getUserData } from '../util.js';


export const endpoints = {
    reservations: '/classes/Reservations',
    //reservations: (page, pageSize) => `/classes/Reservations?skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
    reservationDetails: (id) => `/classes/Reservations/${id}?include=owner`,
    reservationById: '/classes/Reservations/',
    comments: '/classes/Comment',
    commentsByRecipe: (reservationId) => `/classes/Comment?where=${createPointerQuery('reservation', 'Reservation', reservationId)}&include=owner&order=-createdAt`,

    //     recent: '/classes/Recipe?limit=3',
    //     recipeSearch: (page, query, pageSize) => `/classes/Recipe?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}&count=1`,
    //     createRecipe: '/classes/Recipe',
};

export function createPointerQuery(propName, className, objectId) {
    return createQuery({
        [propName]: createPointer(className, objectId) });
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