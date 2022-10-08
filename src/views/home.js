import { getRecentReservation } from '../api/recipe.js';
//import { getReservation } from '../api/recipe.js';
import { html, until } from '../lib.js';
import { spinner } from './common.js';


const homeTemplate = (reservationPromise) => html `

<section id="home">
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/assets/makkuin.png">

    <title>Календари Зали</title>

    <link rel="stylesheet" href="/static/recipe.css">
    <link rel="stylesheet" href="/static/site.css">
    <link rel="stylesheet" href="/static/form.css">
    <link rel="stylesheet" href="/static/modal.css">
    <link rel="stylesheet" href="/static/notification.css">
    <link rel="stylesheet" href="/static/comments.css">


</head>

<body>
    <section id="home">

        <header class="section-title">Изберете календар за дадена зала</header>

        <div class="recent-recipes">
            <a class="card" href="https://reservations-makkuin.github.io/calendarDC.html">
                <article class="recent2">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title1">ДЕТСКИ ЦЕНТЪР</div>
                </article>
            </a>
            <a class="card" href="https://reservations-makkuin.github.io/calendarPB.html">
                <article class="recent2">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title2">ПЕЙНТБОЛ</div>
                </article>
            </a>
            <a class="card" href="https://reservations-makkuin.github.io/calendarPS.html">
                <article class="recent2">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title3">ПЪЗЕЛ СТАЯ</div>
                </article>
            </a>
            <a class="card" href="https://reservations-makkuin.github.io/calendarDisco.html">
                <article class="recent3">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title4">ДИСКОТЕКА</div>
                </article>
            </a>
            <a class="card" href="https://reservations-makkuin.github.io/calendarMovie.html">
                <article class="recent3">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title5">Р.Д. С ФИЛМ</div>
                </article>
            </a>
            <a class="card" href="https://reservations-makkuin.github.io/calendarOut.html">
                <article class="recent3">
                    <div class="recent-preview"><img src="/assets/Calendar.png"></div>
                    <div class="recent-title6">Външни Партита</div>
                </article>
            </a>
        </div>

    </section>
    <footer class="section-title">
        <p>&copy Powered by: S. Ruskov & P. Peev TEAM &reg</p>
    </footer>

</body>
</section>`;


const reservationPreview = (reservation) => html `
<a class="card" >
    <article class="recent">
        <div class="recent-preview"><img src="/assets/reservations.jpg"></div>
        <div class="recent-title">${reservation.Name} - ${reservation.Age }г.</div>
            </article>
</a>`;

export function homePage(ctx) {
    ctx.render(homeTemplate(loadReservations()));
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


// import { getRecentReservation } from '../api/recipe.js';
// //import { getReservation } from '../api/recipe.js';
// import { html, until } from '../lib.js';
// import { spinner } from './common.js';


// const homeTemplate = (reservationPromise) => html `

// // <section id="home">
    
// //     <header class="section-title">Изберете календар за дадена зала</header>
  
// //     <div class="recent-recipes">
// //     <a class="card" href="/calendarDC">
// //     <article class="recent2">
// //         <div class="recent-preview"><img src="/assets/Calendar.png"></div>
// //         <div class="recent-title1">ДЕТСКИ ЦЕНТЪР</div>
// //             </article>
// //     </a>
// //     <a class="card" href="/calendarPB">
// //     <article class="recent2">
// //         <div class="recent-preview"><img src="/assets/Calendar.png"></div>
// //         <div class="recent-title2">ПЕЙНТБОЛ</div>
// //             </article>
// //     </a>
// //     <a class="card" href="/calendarPS">
// //     <article class="recent2">
// //         <div class="recent-preview"><img src="/assets/Calendar.png"></div>
// //         <div class="recent-title3">ПЪЗЕЛ СТАЯ</div>
// //             </article>
// //     </a>
// //     <a class="card" href="/calendarDisco">
// //     <article class="recent3">
// //         <div class="recent-preview"><img src="/assets/Calendar.png"></div>
// //         <div class="recent-title4">ДИСКОТЕКА</div>
// //             </article>
// //     </a>
// //     <a class="card" href="/calendarMovie">
// //     <article class="recent3">
// //         <div class="recent-preview"><img src="/assets/Calendar.png"></div>
// //         <div class="recent-title5">Р.Д. С ФИЛМ</div>
// //             </article>
// //     </a>
// //     </div>
   

// //    <header class="section-title">Последно добавени резервации</header>
// //         <div class="recent-recipes">

// //             ${until(reservationPromise, spinner())}

// //     </div>

// //     <footer class="section-title">
// //         <p>Потърси всички резервации <a href="/catalog">Резервации</a></p>
// //     </footer>
// // </section>`;


// // const reservationPreview = (reservation) => html `
// // <a class="card" >
// //     <article class="recent">
// //         <div class="recent-preview"><img src="/assets/reservations.jpg"></div>
// //         <div class="recent-title">${reservation.Name} - ${reservation.Age }г.</div>
// //             </article>
// // </a>`;

// // export function homePage(ctx) {
// //     ctx.render(homeTemplate(loadReservations()));
// // }




// // async function loadReservations() {
// //     const { results: reservation } = await getRecentReservation();

// //     if (reservation.length == 0) {
// //         return html `<p>Няма открити резервации!</p>`;
// //     } else {
// //         return reservation.reduce((a, c) => {
// //             if (a.length > 0) {
// //                 a.push(html `<div class="recent-space"></div>`);


// //             }
// //             a.push(reservationPreview(c));
// //             return a;
// //         }, []);
// //     }
// // }
