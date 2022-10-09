
import { html } from '../lib.js';



const catalogTemplate = html `
 <link rel="shortcut icon" href="/assets/party.png">
<title>Календар Дискотека</title>
<section id="catalog">
    
<iframe src="https://reservations-makkuin.github.io/calendarDisco.html"  width="1000" height="820" frameborder="0" scrolling="no"></iframe>
</section>`;


export function calendarDiscoPage(ctx) {
    
   

    ctx.render(catalogTemplate);
   
}
