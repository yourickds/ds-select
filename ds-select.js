function createDsSelect(items)
{
    let ds_select = document.createElement('div');
    ds_select.classList.add('ds-select');
    ds_select.onclick = function(event) {
        actionsDsSelect(event, ds_select);
    }
    let ds_select_container = document.createElement('div');
    ds_select_container.classList.add('ds-select-container');

    let ds_select_container_items = document.createElement('div');
    ds_select_container_items.classList.add('ds-select-container-items');

    ds_select_container.append(ds_select_container_items);
    ds_select.append(ds_select_container);

    let ds_select_dropdown = document.createElement('div');
    ds_select_dropdown.classList.add('ds-select-dropdown');
    
    let ds_select_dropdown_list = document.createElement('div');
    ds_select_dropdown_list.classList.add('ds-select-dropdown-list');

    let ul = document.createElement('ul');
    for (let i = 0; i < items.length; i++) {
        let li = document.createElement('li');
        li.classList.add('ds-select-dropdown-list__item');
        li.innerText = items[i].innerText;
        ul.append(li);
    };

    ds_select_dropdown_list.append(ul);
    ds_select_dropdown.append(ds_select_dropdown_list);
    ds_select.append(ds_select_dropdown);

    document.addEventListener( 'click', (e) => {
        const withinBoundaries = e.composedPath().includes(ds_select);
        if ( ! withinBoundaries ) {
            ds_select.classList.remove('open');
        }
    });

    return ds_select;
}

function actionsDsSelect(event, ds_select)
{
    event.preventDefault();
    if (event.target.classList.contains('ds-select-container-items'))
        ds_select.classList.toggle('open');
    if (event.target.classList.contains('ds-select-dropdown-list__item')) {
        let items = document.querySelector('.ds-select-container-items');
        let container_items = document.createElement('div');
        container_items.classList.add('ds-select-container-items__item');
        let span = document.createElement('span');
        span.innerText = event.target.innerText;
        container_items.append(span);
        let actions = document.createElement('div');
        actions.classList.add('ds-select-container-items__item_actions');
        actions.onclick = function(event) {
            event.preventDefault();
            container_items.remove();
        };
        let a = document.createElement('a');
        let img = document.createElement('img');
        img.width = "10";
        img.height = "10";
        img.src = "https://img.icons8.com/ios/50/delete-sign--v1.png";
        img.alt = "delete-sign--v1";
        a.append(img);
        actions.append(a);
        container_items.append(actions);
        items.appendChild(container_items);
    }
}

function dsSelect(el, params) {
    let ds_select = createDsSelect(el.options);
    el.after(ds_select);
}

Element.prototype.dsSelect = function(params) {
    dsSelect(this, params);
}