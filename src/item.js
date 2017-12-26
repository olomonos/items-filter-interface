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
        this._animation = null;
        this.price = price;
        this.root = document.createElement('div');
        this.root.appendChild(document.createTextNode(price));
        this.root.className = 'item';

        this._step = this._step.bind(this);
    }

    _step(timestamp) {
        if (!this._start) this._start = timestamp;
        const progress = timestamp - this._start;
        let opacity = null;

        if (this._state === STATE.HIDING) {
            opacity = Math.max(1 - (progress / 1000), 0);
        } else if (this._state === STATE.SHOWING) {
            opacity = Math.min(progress / 1000, 1);
        }

        this.root.style.opacity = opacity;

        if (progress < 1000) {
            this._animate(this._step);
        } else {
            this._animationEnd();
        }
    }

    _animationEnd() {
        this._animation = null;
        if (this._state === STATE.HIDING) {
            this._state = STATE.HIDDEN;
            this.root.style.display = 'none';
        } else if (this._state === STATE.SHOWING) {
            this._state = STATE.SHOWN;
        }
    }

    _animate(fn) {
        if (this._animation) cancelAnimationFrame(this._animation);
        this._animation = requestAnimationFrame(fn);
    }

    hide() {
        if (this._state !== STATE.HIDDEN) {
            if (this._state === STATE.SHOWN) this._start = null;
            this._state = STATE.HIDING;
            this.root.style.opacity = '1';
            
            this._animate(this._step);
        }
    }

    show() {
        if (this._state !== STATE.SHOWN) {
            if (this._state === STATE.HIDDEN) this._start = null;
            this._state = STATE.SHOWING;
            this.root.style.display = null;
            this.root.style.opacity = '0';

            this._animate(this._step);
        }
    }
}
