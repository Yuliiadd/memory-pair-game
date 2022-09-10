
const field = document.querySelector(".game__field"),
cards = document.querySelectorAll(".card"),
score = document.querySelector(".score__value"),
restart = document.querySelector(".btn"),
collection = document.querySelector(".collection");

let openedCardsSrc = [];
let openedCards = [];
let foldedPairs = 0;
let cardNames = ['c1', 'c2', 'c3', 'd4', 'd5', 'd6', 'c1', 'c2', 'c3', 'd4', 'd5', 'd6'];


// event listeners

document.addEventListener('DOMContentLoaded', render);
field.addEventListener("click", flipTheCard);
restart.addEventListener("click", render);

// function fliping cards & create arrays of opened cards

function flipTheCard(e) {
    let frontSide = e.target;
    openedCards = document.querySelectorAll(".open__card");
    if (frontSide.tagName === "IMG" && openedCards.length < 2) {
        console.log(openedCards);
        let openedCard = e.target.parentElement;
        openedCard.classList.add("open__card");
        openedCards = document.querySelectorAll(".open__card");
        let backSide = e.target.previousElementSibling;
        frontSide.style.transform = "rotateY(180deg)"
        backSide.style.transform = "rotateY(360deg)"
        backSide.style.opacity = "100";
        openedCardsSrc.push(backSide.src.slice(-6));
        console.log(openedCardsSrc);
    };

    if (openedCards.length == 2) {
        checkThePairs();
    };

    if (frontSide.tagName === "DIV") return;

};

// checking opened cards

function checkThePairs() {
    if (openedCardsSrc[0] === openedCardsSrc[1] && foldedPairs < 6) {
        foldedPairs++;
        score.textContent = foldedPairs;
        openedCards.forEach((card => {
            card.classList.remove("open__card");
        }));

        let pair = document.createElement("div");
        for (let i=1; i<=2; i++) {
            let miniCard = document.createElement("img");
            miniCard.classList.add('miniCard');
            miniCard.src = `img/${openedCardsSrc[1]}`;
            pair.append(miniCard);
            pair.style.marginLeft = "10px";
            pair.style.marginRight = "10px";
        };
        collection.append(pair);

        openedCards.forEach(card => {
            card.classList.add("hidden");
            card.classList.remove("open__card");
        });
        openedCards = document.querySelectorAll(".open__card");
        openedCardsSrc = [];

        if (foldedPairs == 6) {
            field.classList.add('field__over');
            field.classList.remove('game__field');
            field.innerHTML = `<span class = "game__over">GAME OVER!</span>`;
            restart.classList.add("btn__red");
        };


    } else if (openedCardsSrc[0] !== openedCardsSrc[1]) {
        setTimeout(() => openedCards.forEach(card => {
            card.classList.remove("open__card");
            card.firstElementChild.style.transform = "rotateY(180deg)";
            card.lastElementChild.style.transform = "rotateY(360deg)";
        }), 500);
            openedCards = document.querySelectorAll(".open__card");
            openedCardsSrc = [];
    };
};

// randomizer for cards

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
};

// render for cards

function render() {
    score.innerHTML = "0";
    shuffle(cardNames);
    field.innerHTML = '';
    field.classList.add('game__field');
    field.classList.remove('field__over');
    restart.classList.remove("btn__red");
    collection.innerHTML = "";
    for (let i = 0; i < cardNames.length; i++) {
        let card = new Card(cardNames[i]);
        card.renderCard();
    };
};
