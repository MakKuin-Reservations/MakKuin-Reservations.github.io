
import { html } from '../lib.js';



const catalogTemplate = html `

<section id="catalog">
    
<link rel="shortcut icon" href="/assets/partyOut.png">
    
       <title>Календар Външни Партита</title>
   
<iframe src="https://reservations-makkuin.github.io/calendarOut.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarOutPage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}

