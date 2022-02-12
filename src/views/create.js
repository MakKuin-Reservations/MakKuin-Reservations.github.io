import { createReservation } from '../api/recipe.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { errorMsg, field } from './common.js';


const createTemplate = (onSubmit, errors, data) => html `
<section id="create">
    <article>
        <h2>Нова Резервация</h2>
        <form @submit=${onSubmit} id="createForm">
            ${errorMsg(errors)}

            ${field({ label: 'Име', name: 'Name', placeholder: 'Име на Детето', value: data.Name, error: errors.Name })}
            ${field({ label: 'Години', name: 'Age', placeholder: 'Години', value: data.Age, error: errors.Age })}
            ${field({ label: 'kaparo', name: 'kaparo', placeholder: 'Капаро', value: data.kaparo, error: errors.kaparo })}
            ${field({ label: 'Час', name: 'time', placeholder: 'Час', value: data.time, error: errors.time })}
            ${field({ label: 'Телефон', name: 'phone', placeholder: 'Телефон', value: data.phone, error: errors.phone })}
            ${field({ label: 'Сладкарница - Доставчик', name: 'cacke', placeholder: 'Сладкарница', value: data.cacke, error: errors.cacke })}
            ${field({ label: 'Брой Парчета', name: 'pices', placeholder: 'Брой Парчета', value: data.pices, error: errors.pices })}
            ${field({ label: 'Код на тортата', name: 'cackeCode', placeholder: 'Номер на тортата', value: data.cackeCode, error: errors.cackeCode })}
            ${field({ label: 'Вид на тортата', name: 'cackeDesc', placeholder: 'Описание на тортата', value: data.cackeDesc, error: errors.cackeDesc })}
            ${field({ label: 'Пълнеж', name: 'cackeType', placeholder: 'Пълнеж', value: data.cackeType, error: errors.cackeType })}
            ${field({ label: 'ЧРД Надпис', name: 'cackeInscr', placeholder: 'Надпис', value: data.cackeInscr, error: errors.cackeInscr })}
            ${field({ label: 'Детско Меню', name: 'kidsMenu', placeholder: 'Детско Меню', value: data.Menu, error: errors.kidsMenu })}
            ${field({ label: 'Кетъринг за децата', name: 'kidsCetaring', placeholder: 'Кетъринг за децата', value: data.kidsCetaring, error: errors.kidsCetaring })}
            ${field({ label: 'Кетъринг за Родителите', name: 'parentMenu', placeholder: 'Кетъринг за Родителите', value: data.parentMenu, error: errors.parentMenu })}
            ${field({ label: 'Брой Деца', name: 'kidsNumber', placeholder: 'Брой Деца', value: data.kidsNumber, error: errors.kidsNumber })}
            ${field({ label: 'Забележка', name: 'notes', placeholder: 'Въведете бележка', value: data.notes, error: errors.notes })}
           
            ${field({
            label: 'Друго', 
            type: 'textarea', 
            name: 'note2', 
            placeholder: 'Допълнително описание', 
            value: data.note2, 
            error: errors.note2 })}
        
          <input type="submit" value="Създай Рецепта">
        </form>
    </article>
</section>`;

export function createPage(ctx) {
    update();

    function update(errors = {}, data = {}) {
        //    ctx.render(createTemplate(createSubmitHandler(onSubmit, 'name', 'img', 'ingredients', 'steps'), errors, data));
        ctx.render(createTemplate(createSubmitHandler(onSubmit, 'Name', 'Age', 'kaparo', 'time', 'phone', 'cacke', 'pices', 'cackeCode', 'cackeDesc', 'cackeType', 'cackeInscr', 'kidsMenu', 'kidsCetaring', 'parentMenu', 'kidsNumber', 'notes', 'note2'), errors, data));

    }

    async function onSubmit(data, event) {
        try {
            const missing = Object.entries(data).filter(([k, v]) => v == '');

            if (missing.length > 0) {
                throw missing.reduce((a, [k]) => Object.assign(a, {
                    [k]: true
                }), { message: 'Please fill all fields!' });
            }

            const reservation = {
                Name: data.Name,
                Age: Number(data.Age),
                kaparo: data.kaparo,
                time: data.time,
                phone: Number(data.phone),
                cacke: data.cacke,
                prices: data.pices,
                cackeCode: data.cackeCode,
                cackeDesc: data.cackeDesc,
                cackeType: data.cackeType,
                cackeInscr: data.cackeInscr,
                kidsMenu: data.kidsMenu,
                kidasCetaring: data.kidsCetaring,
                parentMenu: data.parentMenu,
                kidsNumber: data.kidsNumber,
                notes: data.notes,
                note2: data.note2.split('\n').filter(r => r != '')
            };

            const result = await createReservation(reservation);
            event.target.reset();
            ctx.page.redirect('/details/' + result.objectId);
        } catch (err) {
            update(err, data);
        }
    }
}