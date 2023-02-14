import Project from './Models/Project.js';
const form = document.querySelector('#countdown-form');
const cardContainer = document.querySelector('#card-container');
const url = "http://localhost:8080/api/countdown/events";
const urlUpdateTimer = (id) => { return `http://localhost:8080/api/countdown/events/timer/${id}`;}
const urlUpdateCard = (id) => { return `http://localhost:8080/api/countdown/events/${id}`;}
let allEvents = new Array();
const editForm = document.querySelector('#edit-form');
let intervalIds = [];

const modal = document.querySelector(".modal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function () {
	modal.style.display = "none";
}

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


$(function () {
	$.get(url, function (data) {
		console.log(data);
		for (let i = 0; i < data.length; i++) {
			let event = new Project(data[i].id, data[i].name, data[i].date, data[i].description);
			createNewCard(event);
			updateTimerCountdown(event);
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
	$.post(url, JSON.stringify(eventData), function (data) {
		let newEvent = new Project(data, eventData.name, eventData.date, eventData.description);
		allEvents.push(newEvent);
		createNewCard(newEvent);
		updateTimerCountdown(newEvent);
	})

});

editForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const eventName = document.querySelector('#edit-name').value;
	const eventDescription = document.querySelector('#edit-desc').value;
	const eventDate = document.querySelector('#edit-date').value;
	const eventTime = document.querySelector('#edit-time').value || '00:00';
	const eventDatetime = `${eventDate}T${eventTime}:00`;

	const editFormId = editForm.id.split('-')[2];
	const eventData = {
		name: eventName,
		date: eventDatetime,
		description: eventDescription
	};
	console.log("Edit Form Submitted");
	editTimerInServer(editFormId,JSON.stringify(eventData));
	editCard(editFormId);

});



function addEventListenerToRemoveButton() {
	const removeButtons = document.querySelectorAll('[id^="remove-button-"]');
	removeButtons.forEach(removeButton => {
		removeButton.addEventListener('click', event => {
			event.preventDefault();
			const eventId = removeButton.id.split('-')[2];
			const card = removeButton.closest('.col-4');
			deleteTimer(eventId)
			clearInterval(intervalIds[eventId]);
			card.remove();			
		});
	});
}

function addEventListenerToEditButton() {
	const editButtons = document.querySelectorAll('[id^="edit-button-"]');
	editButtons.forEach(editButton => {
		editButton.addEventListener('click', event => {
			event.preventDefault();
			console.log("Button addingEventListener");

			const id = editButton.id.split('-')[2];
			modal.style.display = "block";
			editForm.id += id;
			console.log(editForm.id);
		})
	})
}

function updateTimerCountdown(event) {
	let updateInterval = setInterval(function () {
		$.getJSON(urlUpdateTimer(event.id), event.id,
			function (data) {
				updateCountdown(event.id, data);
				if (hasFinished(data)) {
					clearInterval(updateInterval);
				}
			}
		);
	}, 1000)
	intervalIds[event.id] = updateInterval;

}


function createNewCard(event) {
	const newCardContainer = document.createElement("div");
	newCardContainer.classList.add("col-4");
	newCardContainer.id = `card-container-${event.id}`;
	newCardContainer.innerHTML = `
	<div class="card">
    <div class="card-body">
    <h5 class="card-title" id="card-title-${event.id}">${event.name}</h5>
	<h6 class="card-subtitle mb-2 text-muted" id="card-subtitle-${event.id}">${event.description}</h6>
	<p class="card-text" id="countdown-${event.id}">00:00:00:00</p>
	<button class="card-link edit" id="edit-button-${event.id}">Edit</button>
	<button class="card-link remove" id="remove-button-${event.id}">Remove</button>
	</div>
    </div>

`;
	cardContainer.appendChild(newCardContainer);
	addEventListenerToRemoveButton();
	addEventListenerToEditButton();
}

function updateCountdown(id, data) {
	let days = data.days < 10 ? `0${data.days}` : data.days;
	let hours = data.hours < 10 ? `0${data.hours}` : data.hours;
	let minutes = data.minutes < 10 ? `0${data.minutes}` : data.minutes;
	let seconds = data.seconds < 10 ? `0${data.seconds}` : data.seconds;


	document.querySelector(`#countdown-${id}`).innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
}

function editTimerInServer(id, data) {
	$.ajax({
		url: urlUpdate(id),
		type: 'PUT',
		data: data
	})
		.done(function (result) {
			console.log("Timer edited successfully: " + result);
		})
}

function deleteTimer(id) {
	const urlDelete = url + "/" + id;
	$.ajax({
		url: urlDelete,
		type: 'DELETE',
		success: function (result) {
			console.log("Event Deleted: " + result);
		}
	});
}

function editCard(id) {
	const cardTitle = document.querySelector(`#card-title-${id}`);
	const cardDescription = document.querySelector(`#card-subtitle-${id}`);
	$.get(urlUpdateCard(id), 
		function (data) {
			const newEvent = new Project(data.id,data.name,data.date,data.description);
			cardTitle.textContent(data.name);
			cardDescription.textContent(data.description);
			clearInterval(intervalIds[eventId]);
			updateTimerCountdown(newEvent);
		}
	);	
}


function hasFinished(time) {
	return time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;
}



