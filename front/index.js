const form = document.querySelector('#countdown-form');
const display = document.querySelector('#countdown-display');
const addMilestones = document.querySelector('#milestones');
const milestonesForm = document.querySelector('#milestones-form');
const milestonesButton = document.querySelector('#add-milestones-button');

milestonesButton.addEventListener('click', function() {
	addMilestones.style.display = (addMilestones.style.display === 'none') ? 'block' : 'none';
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

	fetch("http://localhost:8080/countdown/events", {
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
