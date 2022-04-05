import { getReservationDC } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { createSubmitHandler, parseQuery } from '../util.js';
import { spinner } from './common.js';


const catalogTemplate = (reservationPromise, onSearch, pager, search = '') => html `

<div class="test">
<a  href="/createDC">Направи Резервация</a>
<a  href="https://form.jotform.com/220946904421353">Направи Резервация</a>


</div>

<section id="catalog">

<iframe src="https://calendar.google.com/calendar/embed?height=400&wkst=2&bgcolor=%23E4C441&ctz=Europe%2FSofia&showTitle=1&showPrint=0&src=Z2QzYmdqdWJoOHQ4dHA1aG1ka3NmZWEycDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23F6BF26" style="border:solid 1px #777" width="900" height="400" frameborder="0" scrolling="no"></iframe>
<footer class="section-title">
        ${until(pager(), spinner())}
    </footer>

</section>`;



const reservationPreview = (reservationDC) => html `
<a class="card" href="/detailsDC/${reservationDC.objectId}">
    <article class="preview">
        <div class="small"><img src="/assets/reservations.jpg"></div>
        <div class="title">
            <h2>${reservationDC.Name} - ${reservationDC.Age }г.</h2>
        </div>
    </article>
</a>`;

function pagerSetup(page, reservationPromise, search) {
    return async() => {
            const { pages } = await reservationPromise;

            return html `
            Page ${page} of ${pages}
            ${page > 1 ? html`<a class="pager" href=${'/calendarDC/' + createQuery(page - 1, search)}>&lt;
                Prev</a>` : ''}
            ${page < pages ? html`<a class="pager" href=${'/calendarDC/' + createQuery(page + 1, search)}>Next
                &gt;</a>` : ''}`;
    };
}

function createQuery(page, search) {
    return `?page=${page}${(search ? `&search=${search}` : '')}`;
}

export function calendarDCPage(ctx) {
    const { page, search } = parseQuery(ctx.querystring);
    const reservationPromise = getReservationDC(page || 1, search || '');

    ctx.render(catalogTemplate(loadReservations(reservationPromise), createSubmitHandler(onSearch, 'search'), pagerSetup(page || 1, reservationPromise, search), search));

    function onSearch({ search }) {
        if (search) {
            ctx.page.redirect(`/calendarDC?search=${encodeURIComponent(search)}`);
        } else {
            ctx.page.redirect('/calendarDC');
        }
    }
}

async function loadReservations(reservationPromise) {
    const { results: reservationDC } = await reservationPromise;

    if (reservationDC.length == 0) {
        return html`<p>Няма намерени резервации!</p>`;
    } else {
        return reservationDC.map(reservationPreview);
    }
}