import './item.css';

export class Item {
    constructor(price) {
        this.hidden = false;
        this.price = price;
        this.root = document.createElement('div');
        this.root.appendChild(document.createTextNode(price));
        this.root.className = 'item';

        this._hideEnd = this._hideEnd.bind(this);
    }

    _hideEnd() {
        this.root.className = 'item hidden';
        this.root.removeEventListener('transitionend', this._hideEnd);
        this.hidden = true;
    }

    hide() {
        if (!this.hidden) {
            this.root.className = 'item hiding';
            this.root.addEventListener('transitionend', this._hideEnd);
        }
    }

    show() {
        if (this.hidden) {
            const that = this;
            const root = this.root;
            let start = null;
            let index = 0;

            function step(timestamp) {
                if (!start) {
                    that.hidden = false;
                    start = timestamp;
                    let progress = timestamp - start;
                    root.className = 'item transparent';
                    window.requestAnimationFrame(step);
                } else {
                    if (index === 0) {
                        index++;
                        root.className = 'item showing';
                        
                    }
                }
            }

            root.removeEventListener('transitionend', this._hideEnd);
            window.requestAnimationFrame(step);
        }
    }
}
