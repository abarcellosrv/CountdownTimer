import Project from './Models/Project.js';
const form = document.querySelector('#countdown-form');
const display = document.querySelector('#countdown-display');
const cardTitle = document.querySelector('#card-title');
const cardSubtitle = document.querySelector('#card-subtitle');
const cardContent = document.querySelector('#card-content')
const cardContainer = document.querySelector('#card-container');
const url = "http://localhost:8080/api/countdown/events";
const urlUpdate = "http://localhost:8080/api/countdown/events/timer"
let allEvents = new Array();

$(function() {
	$.get(url, function(data) {
		console.log(data);
		for(let i=0; i < data.length; i++) {
			let event = new Project(data[i].id,data[i].name, data[i].date,data[i].description);
			createNewCard(event);
			updateNewCard(event);
		}
	});
});

form.addEventListener('submit', async (event) => {
	event.preventDefault();
	const eventName = document.querySelector('#event-name').value;
	const eventDescription = document.querySelector('#event-desc').value;
	const eventDate = document.querySelector('#event-date').value;
	const eventTime = document.querySelector('#event-time').value || '00:00';
	const eventDatetime = `${eventDate}T${eventTime}:00`;	

	const eventData = {
		name: eventName,
		date: eventDatetime,
		description: eventDescription
	};
	$.ajaxSetup({
		contentType: "application/json"
	});
	$.post(url,JSON.stringify(eventData),function(data){
		let	newEvent = new Project(data, eventData.name, eventData.date, eventData.description);
		allEvents.push(newEvent);
		createNewCard(newEvent);
		updateNewCard(newEvent);
	})
	
});

function updateNewCard(event) {
	const url = `http://localhost:8080/api/countdown/events/timer/${event.id}`
	setInterval(function () {
		$.getJSON(url, event.id,
			function (data) {
				updateCountdown(event.id,data);
			}
		);
	}, 1000)
}


function createNewCard(event) {
	const newCardContainer = document.createElement("div");
	newCardContainer.classList.add("col-4");
	newCardContainer.innerHTML = `
	<div class="card">
    <div class="card-body">
    <h5 class="card-title" id="card-title">${event.name}</h5>
	<h6 class="card-subtitle mb-2 text-muted" id="card-subtitle">${event.description}</h6>
	<p class="card-text" id="countdown-${event.id}">00:00:00:00</p>
	<a href="#" class="card-link" id="edit-button-${event.id}" onclick="editCard()">Edit</a>
	<a href="#" class="card-link" id="remove-button-${event.id}">Remove</a>
	</div>
    </div>

`;
	cardContainer.appendChild(newCardContainer)

}

function updateCountdown(id, data) {
	let days = data.days < 10 ? `0${data.days}` : data.days;
	let hours = data.hours < 10 ? `0${data.hours}` : data.hours;
	let minutes = data.minutes < 10 ? `0${data.minutes}` : data.minutes;
	let seconds = data.seconds < 10 ? `0${data.seconds}` : data.seconds;
	

	document.querySelector(`#countdown-${id}`).innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
}

function editCard(id, data) {
	
}


