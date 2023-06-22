import FullListItem from "../module/FullListItem";

interface DOMList{
    ul: HTMLUListElement,
    clear():void,
    render(fullList: FullListItem):void
}

export default class ListTemplate implements DOMList{
    static instance:ListTemplate = new ListTemplate();

    private constructor(private _ul = document.getElementById('listItems') as HTMLUListElement){}

    get ul():HTMLUListElement{
        return this._ul
    }

    clear(): void {
        this._ul.innerHTML = '';
    }

    render(fullList: FullListItem): void {
        this.clear();

        fullList.list.forEach(el => {
            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'item';

            const check = document.createElement('input') as HTMLInputElement;
            check.type = 'checkbox';
            check.id = el.id;
            check.checked = el.checked;
            check.tabIndex = 0;
            li.appendChild(check);

            check.addEventListener('change', () =>{
                el.checked = !el.checked;
                fullList.save();
            });

            const label = document.createElement('label') as HTMLLabelElement;
            label.htmlFor = el.id;
            label.textContent = el.item;
            li.appendChild(label);

            const buttton = document.createElement('button') as HTMLButtonElement;
            buttton.className= 'button';
            buttton.textContent = 'X';
            li.appendChild(buttton);

            buttton.addEventListener('click', () =>{
                fullList.removeItem(el.id);
                this.render(fullList);
            });
            this._ul.appendChild(li);
        })
    }
}