
import { html } from '../lib.js';



const catalogTemplate = html `
    <link rel="shortcut icon" href="/assets/makkuin.png">
<section id="catalog">
    <header>
       <title>Календар Детски Център</title>
       
    </header>
<iframe src="https://reservations-makkuin.github.io/calendarDC.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarDCPage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}

