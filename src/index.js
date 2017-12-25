import {Item} from './item';
import {Slider} from './slider';
import {Showcase} from './showcase';

const slider = new Slider(0, 100);
const prices = [];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 1; i <= 150; i++) {
    prices.push(getRandomIntInclusive(1, 100));
}

const showcase = new Showcase(prices);

document.body.appendChild(slider.root);
document.body.appendChild(showcase.root);

slider.onChange = function(limit) {
    showcase.setLimit(limit);
}
