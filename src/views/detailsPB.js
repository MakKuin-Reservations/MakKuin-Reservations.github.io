import { deleteReservationPB, getReservationPBById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservationPB, isOwner, onDelete) => html `
<article>
    <h2>Резервация на ${reservationPB.Name} ${reservationPB.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservationPB.time} часа</h3>
               <h3>От: ${reservationPB.time} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Име: ${reservationPB.Name}</li>
               <li>Години: ${reservationPB.Age}</li>
               <li>Телефон: ${reservationPB.phone}</li>
               <li>Капаро: ${reservationPB.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservationPB.cacke}</li>
               <li>Код на тортата: ${reservationPB.cackeCode}</li>
               <li>Пълнеж:${reservationPB.pices}</li>
               <li>Вид на тортата:${reservationPB.cackeType}</li>
               <li>Надпис: ${reservationPB.cackeInscr}</li>
               <li>Вид на тортата${reservationPB.cackeDescript}</li>
               <li>Цена: ${reservationPB.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservationPB.kidsNumber}</li>
               <li>Детско меню:${reservationPB.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservationPB.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservationPB.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservationPB.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/editPB/${reservationPB.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
    </div>` : null}
</article>`;

export function detailsPBPage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservationPB = await getReservationPBById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservationPB.owner.objectId;

    return reservationCard(reservationPB, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservationPB(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/calendarPB');
        }
    }
}