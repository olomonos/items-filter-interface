import './item.css';

const STATE = {
    SHOWN: 'SHOWN',
    HIDING: 'HIDING',
    HIDDEN: 'HIDDEN',
    SHOWING: 'SHOWING'
}

export class Item {
    constructor(price) {
        this._state = STATE.SHOWN;
        this.price = price;
        this.root = document.createElement('div');
        this.root.appendChild(document.createTextNode(price));
        this.root.className = 'item';

        this._step = this._step.bind(this);
    }

    _step(timestamp) {
        if (!this._start) this._start = timestamp;
        let progress = timestamp - this._start;
        if (this._state === STATE.HIDING) {
            this.root.style.opacity = Math.max(1 - (progress / 1000), 0);
            if (progress < 1000) {
                window.requestAnimationFrame(this._step);
            } else {
                this.root.style.display = 'none';
                this._state = STATE.HIDDEN;
            }
        }
        if (this._state === STATE.SHOWING) {
            this.root.style.opacity = Math.min(progress / 1000, 1);
            if (progress < 1000) {
                window.requestAnimationFrame(this._step);
            } else {
                this._state = STATE.SHOWN;
            }
        }
    }

    hide() {
        if (this._state !== STATE.HIDDEN) {
            if (this._state === STATE.SHOWN) this._start = null;
            this._state = STATE.HIDING;
            this.root.style.opacity = '1';
            
            window.requestAnimationFrame(this._step);
        }
    }

    show() {
        if (this._state !== STATE.SHOWN) {
            if (this._state === STATE.HIDDEN) this._start = null;
            this._state = STATE.SHOWING;
            this.root.style.display = null;
            this.root.style.opacity = '0';
            
            window.requestAnimationFrame(this._step);
        }
    }
}
