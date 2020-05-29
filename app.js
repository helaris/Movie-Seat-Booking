//1. Take all the DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movies = document.getElementById('movie');

let ticketPrice = +movies.value;

//3. Update count and total DOM
function updateDOM(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

//4. Pick a movie value and update DOM
movies.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    
    updateDOM();
})

//2. Seat click event - if i click the seat that it will toggle success/ not occupied
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateDOM();
    }
})

