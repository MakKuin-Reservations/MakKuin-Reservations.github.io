import * as api from './api.js';
import { addOwner, createPointer, endpoints } from './data.js';


export function getCommentsByRecipeId(reservationId) {
    return api.get(endpoints.commentsByRecipe(reservationId));
}

export function createComment(reservationId, comment) {
    comment.reservation = createPointer('Reservation', reservationId);
    addOwner(comment);
    return api.post(endpoints.comments, comment);
}