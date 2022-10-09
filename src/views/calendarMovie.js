
import { html } from '../lib.js';



const catalogTemplate = html `
<link rel="shortcut icon" href="/assets/cinema.png">

<title>Календар Филми</title>
<section id="catalog">
    
<iframe src="https://reservations-makkuin.github.io/calendarMovie.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarMoviePage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}
