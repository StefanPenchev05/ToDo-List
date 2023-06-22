import './style.css'
import ListTemplate from './templetes/ListTemplate';
import FullListItem from './module/FullListItem';
import ListItem from './module/ListItem';


const initApp = ():void =>{
    const fullList = FullListItem.instance;
    const templetes = ListTemplate.instance;

    const intemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

    intemEntryForm.addEventListener('submit', (event:SubmitEvent):void=>{
        event.preventDefault();

        const input = document.getElementById('newItem') as HTMLInputElement;
        const newEntryText: string = input.value.trim();
        if(!newEntryText.length) return;

        const itemId = fullList.list.length  
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1  : 1;
        
        const newItem = new ListItem(itemId.toString(), newEntryText);

        fullList.addItem(newItem);
        templetes.render(fullList);
        input.value = '';
    });

    const clearButton = document.getElementById('clearItemsButton') as HTMLButtonElement;
    clearButton.addEventListener('click', ():void => {
        fullList.clearList();
        templetes.clear();
    });

    fullList.load();
    templetes.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp);