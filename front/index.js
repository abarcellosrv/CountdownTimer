const form = document.querySelector('#countdown-form');
const display = document.querySelector('#countdown-display');


form.addEventListener('submit', async (event) => {

	setInterval(
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

	fetch("http://localhost:8080/countdown/events", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(eventData)
	})
		.then(response => {
			return response.json();
		}).then(jsonResponse => {
			let string = "";
			jsonResponse.forEach(element => {
				string += element + " : ";
			});
			display.innerHTML = string;
		}).catch(error => {
			console.log(error)
		})
	,1000);
});

/* const submitEvent = () => {
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

	fetch("/countdown/events", {
		method: "POST",
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(eventData)
	})
		.then(response => response.json())
		.then(data => {
			console.log("Success: ", data);
		})
		.catch(error => {
			console.error("Error: ", error);
		})
} */
