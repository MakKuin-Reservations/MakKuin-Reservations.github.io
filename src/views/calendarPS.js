
import { html } from '../lib.js';



const catalogTemplate = html `

<link rel="shortcut icon" href="/assets/puzzle.png">

<title>Календар Пъзел Стая</title>
<section id="catalog">
    
<iframe src="https://reservations-makkuin.github.io/calendarPS.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarPSPage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}
