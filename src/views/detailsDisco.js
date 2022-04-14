import { deleteReservationDisco, getReservationDiscoById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservationDisco, isOwner, onDelete) => html `
<article>
    <h2>Резервация на ${reservationDisco.Name} ${reservationDisco.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservationDisco.time} часа</h3>
               <h3>От: ${JSON.stringify(reservationDisco.date)} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Дата: ${reservationDisco.date}</li>
               <li>Име: ${reservationDisco.Name}</li>
               <li>Години: ${reservationDisco.Age}</li>
               <li>Телефон: ${reservationDisco.phone}</li>
               <li>Капаро: ${reservationDisco.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservationDisco.cacke}</li>
               <li>Код на тортата: ${reservationDisco.cackeCode}</li>
               <li>Пълнеж:${reservationDisco.pices}</li>
               <li>Вид на тортата:${reservationDisco.cackeType}</li>
               <li>Надпис: ${reservationDisco.cackeInscr}</li>
               <li>Вид на тортата${reservationDisco.cackeDescript}</li>
               <li>Цена: ${reservationDisco.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservationDisco.kidsNumber}</li>
               <li>Детско меню:${reservationDisco.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservationDisco.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservationDisco.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservationDisco.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/editDisco/${reservationDisco.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
    </div>` : null}
</article>`;

export function detailsDiscoPage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservationDisco = await getReservationDiscoById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservationDisco.owner.objectId;

    return reservationCard(reservationDisco, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservationDisco(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/calendarDisco');
        }
    }
}