import { deleteReservationPS, getReservationPSById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservationPS, isOwner, onDelete) => html `
<article>
    <h2>Резервация на ${reservationPS.Name} ${reservationPS.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservationPS.time} часа</h3>
               <h3>От: ${reservationPS.time} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Име: ${reservationPS.Name}</li>
               <li>Години: ${reservationPS.Age}</li>
               <li>Телефон: ${reservationPS.phone}</li>
               <li>Капаро: ${reservationPS.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservationPS.cacke}</li>
               <li>Код на тортата: ${reservationPS.cackeCode}</li>
               <li>Пълнеж:${reservationPS.pices}</li>
               <li>Вид на тортата:${reservationPS.cackeType}</li>
               <li>Надпис: ${reservationPS.cackeInscr}</li>
               <li>Вид на тортата${reservationPS.cackeDescript}</li>
               <li>Цена: ${reservationPS.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservationPS.kidsNumber}</li>
               <li>Детско меню:${reservationPS.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservationPS.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservationPS.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservationPS.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/editPS/${reservationPS.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
    </div>` : null}
</article>`;

export function detailsPSPage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservationPS = await getReservationPSById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservationPS.owner.objectId;

    return reservationCard(reservationPS, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservationPS(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/calendarPS');
        }
    }
}