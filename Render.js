
class Card {
    constructor(imgId) {
        this.imgId = imgId;
    }

    renderCard() {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<img src="img/${this.imgId}.png" alt="" class="card__img">
            <img src="img/paw.png" alt="" class="front__side">`;
            field.append(card);
        };
    };
