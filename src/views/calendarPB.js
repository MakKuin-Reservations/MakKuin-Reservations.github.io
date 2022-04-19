import { getReservationPB } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { createSubmitHandler, parseQuery } from '../util.js';
import { spinner } from './common.js';


const catalogTemplate = (reservationPromise, onSearch, pager, search = '') => html `

<div class="test">
<a  href="/createPB">Направи Резервация</a>
</div>

<section id="catalog">

    <div class="section-title">
        <form @submit=${onSearch} id="searchForm">
            <input type="text" Name="search" .value=${search}>
            <input type="submit" value="Search">
        </form>
    </div>

    <header class="section-title">
        ${until(pager(), spinner())}
    </header>

    ${until(reservationPromise, spinner())}

    <footer class="section-title">
        ${until(pager(), spinner())}
    </footer>

</section>`;



const reservationPreview = (reservationPB) => html `
<a class="card" href="/detailsPB/${reservationPB.objectId}">
    <article class="preview">
        <div class="small"><img src="/assets/reservations.jpg"></div>
        <div class="title">
            <h2>${reservationPB.time}ч. ${reservationPB.Name} - ${reservationPB.Age }г.</h2>
        </div>
    </article>
</a>`;

function pagerSetup(page, reservationPromise, search) {
    return async() => {
            const { pages } = await reservationPromise;

            return html `
            Page ${page} of ${pages}
            ${page > 1 ? html`<a class="pager" href=${'/calendarPB/' + createQuery(page - 1, search)}>&lt;
                Prev</a>` : ''}
            ${page < pages ? html`<a class="pager" href=${'/calendarPB/' + createQuery(page + 1, search)}>Next
                &gt;</a>` : ''}`;
    };
}

function createQuery(page, search) {
    return `?page=${page}${(search ? `&search=${search}` : '')}`;
}

export function calendarPBPage(ctx) {
    const { page, search } = parseQuery(ctx.querystring);
    const reservationPromise = getReservationPB(page || 1, search || '');

    ctx.render(catalogTemplate(loadReservations(reservationPromise), createSubmitHandler(onSearch, 'search'), pagerSetup(page || 1, reservationPromise, search), search));

    function onSearch({ search }) {
        if (search) {
            ctx.page.redirect(`/calendarPB?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/calendarPB');
        }
    }
} 

async function loadReservations(reservationPromise) {
    const { results: reservation } = await reservationPromise;

    if (reservation.length == 0) {
        return html`<p>Няма намерени резервации!</p>`;
    } else {
        return reservation.map(reservationPreview);
    }
}