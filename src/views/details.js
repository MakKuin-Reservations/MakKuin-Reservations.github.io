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
    <h2>Резервация на ${reservation.Name} ${reservation.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservation.time} часа</h3>
               <h3>От: ${reservation.time} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Име: ${reservation.Name}</li>
               <li>Години: ${reservation.Age}</li>
               <li>Телефон: ${reservation.phone}</li>
               <li>Капаро: ${reservation.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservation.cacke}</li>
               <li>Код на тортата: ${reservation.cackeCode}</li>
               <li>Пълнеж:${reservation.pices}</li>
               <li>Вид на тортата:${reservation.cackeType}</li>
               <li>Надпис: ${reservation.cackeInscr}</li>
               <li>Вид на тортата${reservation.cackeDescript}</li>
               <li>Цена: ${reservation.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservation.kidsNumber}</li>
               <li>Детско меню:${reservation.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservation.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservation.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservation.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/edit/${reservation.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
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
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservation(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/catalog');
        }
    }
}