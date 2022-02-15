import { deleteReservation, getReservationDCById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservationDC, isOwner, onDelete) => html `
<article>
    <h2>Резервация на ${reservationDC.Name} ${reservationDC.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservationDC.time} часа</h3>
               <h3>От: ${reservationDC.time} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Име: ${reservationDC.Name}</li>
               <li>Години: ${reservationDC.Age}</li>
               <li>Телефон: ${reservationDC.phone}</li>
               <li>Капаро: ${reservationDC.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservationDC.cacke}</li>
               <li>Код на тортата: ${reservationDC.cackeCode}</li>
               <li>Пълнеж:${reservationDC.pices}</li>
               <li>Вид на тортата:${reservationDC.cackeType}</li>
               <li>Надпис: ${reservationDC.cackeInscr}</li>
               <li>Вид на тортата${reservationDC.cackeDescript}</li>
               <li>Цена: ${reservationDC.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservationDC.kidsNumber}</li>
               <li>Детско меню:${reservationDC.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservationDC.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservationDC.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservationDC.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/edit/${reservationDC.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
    </div>` : null}
</article>`;

export function detailsDCPage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservationDC = await getReservationDCById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservationDC.owner.objectId;

    return reservationCard(reservationDC, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservation(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/catalog');
        }
    }
}