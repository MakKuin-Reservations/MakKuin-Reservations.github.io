//import { getRecentRecipes } from '../api/recipe.js';
import { getReservation } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';


const homeTemplate = (reservationPromise) => html `
<section id="home">
    <div class="hero">
        <h2>Мойте Резервации</h2>
    </div>
    <header class="section-title">Последно добавени резервации</header>
    <div class="recent-recipes">

        ${until(reservationPromise, spinner())}

    </div>
    <footer class="section-title">
        <p>Потърси всички резервации <a href="/catalog">Резервации</a></p>
    </footer>
</section>`;


const reservationPreview = (reservation) => html `
<a class="card" href="/details/${reservation.objectId}">
    <article class="recent">
        <div class="recent-preview"><img src="/assets/reservations.jpg"></div>
        <div class="recent-title">${reservation.Name} - ${reservation.Age }г.</div>
            </article>
</a>`;

export function homePage(ctx) {
    ctx.render(homeTemplate(loadReservations()));
}

async function loadReservations() {
    const { results: reservation } = await getReservation();

    if (reservation.length == 0) {
        return html `<p>Няма открити резервации!</p>`;
    } else {
        return reservation.reduce((a, c) => {
            if (a.length > 0) {
                a.push(html `<div class="recent-space"></div>`);
            }
            a.push(reservationPreview(c));
            return a;
        }, []);
    }
}