import ListItem from "./ListItem";

interface List{
    list: ListItem[],
    load(): void,
    save():void,
    addItem(itemObj: ListItem): void,
    clearList():void,
    removeItem(id:string):void,
    checkExist(input:string):boolean
}

export default class FullListItem implements List{
    static instance = new FullListItem();

    private constructor(private _list:ListItem[] = []){}

    get list():ListItem[]{
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem('myList');
        if(typeof storedList !== 'string') return;

        const parsedList: {_id:string, _item:string, _checked:boolean}[] = JSON.parse(storedList);
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked);

            FullListItem.instance.addItem(newListItem);
        })
    }

    save():void{
        localStorage.setItem('myList', JSON.stringify(this._list));
    }

     clearList(): void {
        this._list = [];
        this.save();
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }

    checkExist(input:string): boolean {
        return this._list.some((el) => el.item.trim() === input);
    }
}
