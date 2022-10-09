import { html } from '../lib.js';

const homeTemplate =  html `
<link rel="shortcut icon" href="/assets/makkuin.png">

<section id="home">
    
    <header class="section-title">Изберете календар за дадена зала</header>
  
    <div class="recent-recipes">
    <a class="card" href="/calendarDC">
    <article class="recent2">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title1">ДЕТСКИ ЦЕНТЪР</div>
            </article>
    </a>
    <a class="card" href="/calendarPB">
    <article class="recent2">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title2">ПЕЙНТБОЛ</div>
            </article>
    </a>
    <a class="card" href="/calendarPS">
    <article class="recent2">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title3">ПЪЗЕЛ СТАЯ</div>
            </article>
    </a>
    <a class="card" href="/calendarDisco">
    <article class="recent3">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title4">ДИСКОТЕКА</div>
            </article>
    </a>
    <a class="card" href="/calendarMovie">
    <article class="recent3">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title5">Р.Д. С ФИЛМ</div>
            </article>
    </a>
    </div>
   

   <header class="section-title">Последно добавени резервации</header>
        <div class="recent-recipes">

            ${until(reservationPromise, spinner())}

    </div>

    <footer class="section-title">
        <p>Потърси всички резервации <a href="/catalog">Резервации</a></p>
    </footer>

</body>
</section>`;

export function homePage(ctx) {
    ctx.render(homeTemplate);
}




async function loadReservations() {
    const { results: reservation } = await getRecentReservation();

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