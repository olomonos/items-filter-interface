import './slider.css';

export class Slider {
    constructor(min, max) {
        this.slider = document.createElement('input');
        this.slider.className = 'slider';
        this.slider.id = 'filter-slider';
        this.slider.type = 'range';
        this.slider.min = min;
        this.slider.max = max;
        this.slider.value = 0;
        this.slider.step = 1;
        this.slider.addEventListener('input', this._onChange.bind(this));

        this.root = document.createElement('div');
        this.root.className = 'slidecontainer';
        this.root.appendChild(this.slider);
    }

    getValue() {
        let sliderValue = Number(this.slider.value);
        return sliderValue;
    }

    _onChange() {
        if (typeof this.onChange === 'function') {
            this.onChange(this.getValue());
        }
    }
}
