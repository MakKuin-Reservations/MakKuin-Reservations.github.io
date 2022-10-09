
import { html } from '../lib.js';



const catalogTemplate = html `
 <link rel="shortcut icon" href="/assets/paintball.png">
<title>Календар Пейнтбол</title>
<section id="catalog">
    
<iframe src="https://reservations-makkuin.github.io/calendarPB.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarPBPage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}
