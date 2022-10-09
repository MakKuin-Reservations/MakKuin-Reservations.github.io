import { page } from './lib.js';
import decorateContext from './middlewares/render.js'
import addSession from './middlewares/session.js';
import notify from './middlewares/notify.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

import { calendarDCPage } from './views/calendarDC.js';
import { calendarPBPage } from './views/calendarPB.js';
import { calendarPSPage } from './views/calendarPS.js';
import { calendarDiscoPage } from './views/calendarDisco.js';
import { calendarMoviePage } from './views/calendarMovie.js';

import { createPageMovie } from './views/createMovie.js';
import { createDCPage } from './views/createDC.js';
import { createPBPage } from './views/createPB.js';
import { createPSPage } from './views/createPS.js';
import { createDiscoPage } from './views/createDisco.js';

import { detailsMoviePage } from './views/detailsMovie.js';
import { detailsDCPage } from './views/detailsDC.js';
import { detailsPBPage } from './views/detailsPB.js';
import { detailsPSPage } from './views/detailsPS.js';
import { detailsDiscoPage } from './views/detailsDisco.js';

import { editPageDC } from './views/editDC.js';
import { editPagePB } from './views/editPB.js';
import { editPagePS } from './views/editPS.js';
import { editPageDisco } from './views/editDisco.js';
import { editPageMovie } from './views/editMovie.js';


page(decorateContext());
page(addSession());
page(notify());

page('/', loginPage);
page('/register', registerPage);
page('/home', homePage);

page('/calendarDC', calendarDCPage);
page('/calendarPB', calendarPBPage);
page('/calendarPS', calendarPSPage);
page('/calendarDisco', calendarDiscoPage);
page('/calendarMovie', calendarMoviePage);

page('/detailsMovie/:id', detailsMoviePage);
page('/detailsDC/:id', detailsDCPage);
page('/detailsPB/:id', detailsPBPage);
page('/detailsPS/:id', detailsPSPage);
page('/detailsDisco/:id', detailsDiscoPage);

page('/createMovie', createPageMovie);
page('/createDC', createDCPage);
page('/createPB', createPBPage);
page('/createPS', createPSPage);
page('/createDisco', createDiscoPage);

page('/editDC/:id', editPageDC);
page('/editDisco/:id', editPageDisco);
page('/editPB/:id', editPagePB);
page('/editPS/:id', editPagePS);
page('/editMovie/:id', editPageMovie);

page.start();