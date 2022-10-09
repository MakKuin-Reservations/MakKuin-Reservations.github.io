import { deleteReservationMovie, getReservationMovieById } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { commentsView } from './comments.js';
import { spinner } from './common.js';


const detailsTemplate = (reservationPromise) => html `
<section id="details">

    ${until(reservationPromise, spinner())}

    <div id="comments-container"></div>
</section>`;

const reservationCard = (reservationMovie, isOwner, onDelete) => html `
<article>
    <h2>Резервация на ${reservationMovie.Name} ${reservationMovie.Age}г.</h2>
    <div class="band">
        <div class="thumb"><img src="/assets/reservations.jpg"></div>
        <div class="ingredients">
            <h3>Детайли:</h3>
            <ul>
               <p> ___________________________________</p>
               <h3>Резервация за: ${reservationMovie.time} часа</h3>
               <h3>От: ${reservationMovie.time} часа</h3>

               <p> ___________________________________</p>
               </div>
             


    <div class="description">
               <li>Име: ${reservationMovie.Name}</li>
               <li>Години: ${reservationMovie.Age}</li>
               <li>Телефон: ${reservationMovie.phone}</li>
               <li>Капаро: ${reservationMovie.kaparo}лв.</li>
    </div>
    <div class="description">
               <li>Сладкарница: ${reservationMovie.cacke}</li>
               <li>Код на тортата: ${reservationMovie.cackeCode}</li>
               <li>Пълнеж:${reservationMovie.pices}</li>
               <li>Вид на тортата:${reservationMovie.cackeType}</li>
               <li>Надпис: ${reservationMovie.cackeInscr}</li>
               <li>Вид на тортата${reservationMovie.cackeDescript}</li>
               <li>Цена: ${reservationMovie.prices}лв.</li>
    </div>
    <div class="description">
               <li>Брой деца:${reservationMovie.kidsNumber}</li>
               <li>Детско меню:${reservationMovie.kidsMenu}</li>
    </div>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Кетъринг за Децата:</h3>
        ${reservationMovie.kidsCetaring.map(i => html`<p>${i}</p>`)}
    </div>
    <div class="description">
        <h3>Кетъринг за Родителите:</h3>
        ${reservationMovie.parentMenu.map(i => html`<p>${i}</p>`)}
    </div>
    
    <div class="description">
        <h3>Друго:</h3>
        ${reservationMovie.note2.map(i => html`<p>${i}</p>`)}
    </div>
    ${isOwner ? 
    html`<div class="controls">
        <a class="actionLink" href="/editMovie/${reservationMovie.objectId}">&#x270e; Редактирай</a>
        <a @click=${onDelete} class="actionLink" href="javascript:void(0)">&#x2716; Изтрий</a>
    </div>` : null}
</article>`;

export function detailsMoviePage(ctx) {
    ctx.render(detailsTemplate(loadReservation(ctx)));
    commentsView(ctx, ctx.params.id);
}

async function loadReservation(ctx) {
    const reservationMovie = await getReservationMovieById(ctx.params.id);
    const isOwner = ctx.user && ctx.user.id == reservationMovie.owner.objectId;

    return reservationCard(reservationMovie, isOwner, onDelete);

    async function onDelete() {
        const choice = confirm('Сигурни ли сте че изкате да изтриете резервацията?');

        if (choice) {
            await deleteReservationMovie(ctx.params.id);
            ctx.notify('Reservation deleted');
            ctx.page.redirect('/calendarMovie');
        }
    }
}