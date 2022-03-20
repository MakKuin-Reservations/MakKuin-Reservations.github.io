import { getReservationDiscoById, updateReservationDisco } from '../api/recipe.js';
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
            ${field({ label: 'Сладкарница - Доставчик', name: 'cacke', placeholder: 'Сладкарница', value: data.cacke })}
            ${field({ label: 'Код на тортата', name: 'cackeCode', placeholder: 'Номер на тортата', value: data.cackeCode })}
            ${field({ label: 'Брой Парчета', name: 'pices', placeholder: 'Брой Парчета', value: data.pices })}
            ${field({ label: 'Пълнеж', name: 'cackeType', placeholder: 'Пълнеж', value: data.cackeType })}
            ${field({ label: 'ЧРД Надпис', name: 'cackeInscr', placeholder: 'Надпис', value: data.cackeInscr })}
            ${field({ label: 'Вид на тортата', name: 'cackeDescript', placeholder: 'Описание на тортата', value: data.cackeDescript })}
            ${field({ label: 'Цена', name: 'prices', placeholder: 'Ценана тортата', value: data.prices })}
            ${field({ label: 'Брой Деца', name: 'kidsNumber', placeholder: 'Брой Деца', value: data.kidsNumber })}
            ${field({ label: 'Детско Меню', name: 'kidsMenu', placeholder: 'Детско Меню', value: data.kidsMenu })}
            ${field({ label: 'Кетъринг за децата', type: 'textarea', name: 'kidsCetaring', placeholder: 'Кетъринг за децата', value: data.kidsCetaring })}
            ${field({ label: 'Кетъринг за Родителите',type: 'textarea', name: 'parentMenu', placeholder: 'Кетъринг за Родителите', value: data.parentMenu })}
            ${field({ label: 'Друго', type: 'textarea', name: 'note2',  placeholder: 'Допълнително описание', value: data.note2 })}
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function editPageDisco(ctx) {
    const reservationId = ctx.params.id;
    const reservationDisco = await getReservationDiscoById(reservationId);
    reservationDisco.kidsCetaring = reservationDisco.kidsCetaring.join('\n');
    reservationDisco.parentMenu = reservationDisco.parentMenu.join('\n');
    reservationDisco.note2 = reservationDisco.note2.join('\n');

    update();

    function update(errors = {}, data = reservationDisco) {
        ctx.render(editTemplate(createSubmitHandler(onSubmit, 'Name', 'Age', 'time', 'phone', 'kaparo', 'cacke', 'cackeCode', 'pices', 'cackeType', 'cackeInscr', 'cackeDescript', 'prices', 'kidsNumber', 'kidsMenu', 'kidsCetaring', 'parentMenu', 'note2'), errors, data));
    }

    async function onSubmit(data, event) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '');

            if (data.Name == '' || data.Age == '' || data.time == '' || data.phone == '' || data.kaparo == '') {
                throw missing.reduce((a, [k]) => Object.assign(a, {
                    [k]: true
                }), { message: 'Моля попълнете всички полета!' });
            }

            const reservationDisco = {
                Name: data.Name,
                Age: Number(data.Age),
                time: data.time,
                phone: Number(data.phone),
                kaparo: data.kaparo,
                cacke: data.cacke,
                cackeCode: data.cackeCode,
                pices: Number(data.pices),
                cackeType: data.cackeType,
                cackeInscr: data.cackeInscr,
                cackeDescript: data.cackeDescript,
                prices: Number(data.prices),
                kidsNumber: Number(data.kidsNumber),
                kidsMenu: data.kidsMenu,
                kidsCetaring: data.kidsCetaring.split('\n').filter(r => r != ''),
                parentMenu: data.parentMenu.split('\n').filter(r => r != ''),
                note2: data.note2.split('\n').filter(r => r != ''),
            };

            const result = await updateReservationDisco(reservationId, reservationDisco);
            event.target.reset();
            ctx.notify('Резервацията е редактирана');
            ctx.page.redirect('/detailsDisco/' + reservationId);
        } catch (err) {
            update(err, data);
        }
    }
}