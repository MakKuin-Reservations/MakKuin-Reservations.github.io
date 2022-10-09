import { html } from '../lib.js';

const homeTemplate =  html `
<link rel="shortcut icon" href="/assets/makkuin.png">

<section id="home">
<title>Календари Зали</title>
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
    <a class="card" href="/calendarOut">
    <article class="recent3">
        <div class="recent-preview"><img src="/assets/Calendar.png"></div>
        <div class="recent-title6">Външни Партита</div>
            </article>
    </a>
    </div>
   
    <footer class="section-title2">
        <p>&copy Powered by: S. Ruskov & P. Peev TEAM &reg</p>
    </footer>
</section>`;

export function homePage(ctx) {
    ctx.render(homeTemplate);
}
