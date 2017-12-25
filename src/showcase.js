import './showcase.css';
import {Item} from './item';

export class Showcase {
    constructor(prices) {
        this.prices = prices;
        this.root = document.createElement('div');
        this.root.className = 'showcase';
        const root = this.root;
        this.limit = 0;
        this.items = prices.map(function(price) {
            const item = new Item(price);
            root.appendChild(item.root);
            return item;
        });
    }

    setLimit(newLimit) {
        this.limit = newLimit;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.price < this.limit) {
                // if (!item.hidden) {
                    item.hide();
                // }
            } else {
                // if (item.hidden) {
                    item.show();
                // }
            }
        }
    }
}
