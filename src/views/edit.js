import { getReservationById, updateReservation } from '../api/recipe.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { errorMsg, field } from './common.js';


const editTemplate = (onSubmit, errors, data) => html `
<section id="edit">
    <article>
        <h2>Редакция на Резервация</h2>
        <form @submit=${onSubmit} id="createForm">
            ${errorMsg(errors)}

            ${field({ label: 'Име', name: 'Name', placeholder: 'Име на Детето', value: data.Name, error: errors.Name })}
            ${field({ label: 'Години', name: 'Age', placeholder: 'Години', value: data.Age, error: errors.Age })}
            ${field({ label: 'Час', name: 'time', placeholder: 'Час', value: data.time, error: errors.time })}
            ${field({ label: 'Телефон', name: 'phone', placeholder: 'Телефон', value: data.phone, error: errors.phone })}
            ${field({ label: 'kaparo', name: 'kaparo', placeholder: 'Капаро', value: data.kaparo, error: errors.kaparo })}
            ${field({ label: 'Сладкарница - Доставчик', name: 'cacke', placeholder: 'Сладкарница', value: data.cacke, error: errors.cacke })}
            ${field({ label: 'Код на тортата', name: 'cackeCode', placeholder: 'Номер на тортата', value: data.cackeCode, error: errors.cackeCode })}
            ${field({ label: 'Брой Парчета', name: 'pices', placeholder: 'Брой Парчета', value: data.pices, error: errors.pices })}
            ${field({ label: 'Пълнеж', name: 'cackeType', placeholder: 'Пълнеж', value: data.cackeType, error: errors.cackeType })}
            ${field({ label: 'ЧРД Надпис', name: 'cackeInscr', placeholder: 'Надпис', value: data.cackeInscr, error: errors.cackeInscr })}
            ${field({ label: 'Вид на тортата', name: 'cackeDescript', placeholder: 'Описание на тортата', value: data.cackeDescript, error: errors.cackeDescript })}
            ${field({ label: 'Цена', name: 'prices', placeholder: 'Ценана тортата', value: data.prices, error: errors.prices })}
            ${field({ label: 'Брой Деца', name: 'kidsNumber', placeholder: 'Брой Деца', value: data.kidsNumber, error: errors.kidsNumber })}
            ${field({ label: 'Детско Меню', name: 'kidsMenu', placeholder: 'Детско Меню', value: data.kidsMenu, error: errors.kidsMenu })}
            ${field({ label: 'Кетъринг за децата', type: 'textarea', name: 'kidsCetaring', placeholder: 'Кетъринг за децата', value: data.kidsCetaring, error: errors.kidsCetaring })}
            ${field({ label: 'Кетъринг за Родителите',type: 'textarea', name: 'parentMenu', placeholder: 'Кетъринг за Родителите', value: data.parentMenu, error: errors.parentMenu })}
            ${field({ label: 'Друго', type: 'textarea', name: 'note2',  placeholder: 'Допълнително описание', value: data.note2, error: errors.note2 })}
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPage(ctx) {
    const reservationId = ctx.params.id;
    const reservation = await getReservationById(reservationId);
    reservation.kidsCetaring = reservation.kidsCetaring.join('\n');
    reservation.parentMenu = reservation.parentMenu.join('\n');
    reservation.note2 = reservation.note2.join('\n');

    update();

    function update(errors = {}, data = reservation) {
        ctx.render(editTemplate(createSubmitHandler(onSubmit, 'Name', 'Age', 'time', 'phone', 'kaparo', 'cacke', 'cackeCode', 'pices', 'cackeType', 'cackeInscr', 'cackeDescript', 'prices', 'kidsNumber', 'kidsMenu', 'kidsCetaring', 'parentMenu', 'note2'), errors, data));
    }

    async function onSubmit(data, event) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '');

            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, {
                    [k]: true
                }), { message: 'Моля попълнете всички полета!' });
            }

            const reservation = {
                Name: data.Name,
                Age: Number(data.Age),
                time: data.time,
                phone: Number(data.phone),
                kaparo: data.kaparo,
                cacke: data.cacke,
                cackeCode: data.cackeCode,
                pices: data.pices,
                cackeType: data.cackeType,
                cackeInscr: data.cackeInscr,
                cackeDescript: data.cackeDescript,
                prices: data.prices,
                kidsNumber: data.kidsNumber,
                kidsMenu: data.kidsMenu,
                kidsCetaring: data.kidsCetaring.split('\n').filter(r => r != ''),
                parentMenu: data.parentMenu.split('\n').filter(r => r != ''),
                note2: data.note2.split('\n').filter(r => r != ''),
            };

            const result = await updateReservation(reservationId, reservation);
            event.target.reset();
            ctx.notify('Резервацията е редактирана');
            ctx.page.redirect('/details/' + reservationId);
        } catch (err) {
            update(err, data);
        }
    }
}