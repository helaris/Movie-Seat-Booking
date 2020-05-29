//1. Take all the DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movies = document.getElementById('movie');

populateUI();

let ticketPrice = +movies.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update count and total DOM
function updateDOM(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Copy selected seats into arr - seatsIndex / use spread operator ...selectedSeats
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));


    //Save seatsIndex to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    
    //Map through array
    // return a new array of indexes

    const selectedSeatsCount = selectedSeats.length;
    
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movies.selectedIndex = selectedMovieIndex;
    }
}

//Pick a movie value and update DOM
movies.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    // Getting movie index and value/price and passing it to setMovieData
    setMovieData(e.target.selectedIndex, e.target.value);

    updateDOM();
});

//Seat click event - if i click the seat that it will toggle success/ not occupied
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateDOM();
    }
});

// Initial count and total set

updateDOM();
