import { deleteReservation, getReservationById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservation, isOwner, onDelete) => html `
<article>
    <h2>${reservation.Name}</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
                <li>${reservation.notes}</li>
               <li> ${reservation.Name}</li>
               <li>${reservation.Age}</li>
               <li>${reservation.kaparo}</li>
               <li>${reservation.time}</li>
               <li>${reservation.phone}</li>
               <li>${reservation.cacke}</li>
               <li>${reservation.pices}</li>
               <li>${reservation.cackeCode}</li>
               <li>${reservation.cackeDesc}</li>
               <li>${reservation.cackeType}</li>
               <li>${reservation.cackeInscr}</li>
               <li>${reservation.kidsMenu}</li>
               <li>${reservation.kidsKetaring}</li>
               <li>${reservation.parentMenu}</li>
               <li>${reservation.kidsNumber}</li>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Подготовка:</h3>
        ${reservation.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/edit/${reservation.objectId}">&#x270e; Edit</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Delete</a>
    </div>` : null}
</article>`;

export function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservation = await getReservationById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservation.owner.objectId;

    return reservationCard(reservation, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this recipe?');

        if (choice) {
            await deleteReservation(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/catalog');
        }
    }
}