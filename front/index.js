document.querySelector("#new-event-button").addEventListener("click", function () {
	document.querySelector("#form-container").style.display = "block";
});

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	document.querySelector("#form-container").style.display = "none";
	const nameInput = document.querySelector("#name").value;
	const dateInput = document.querySelector("#date").value;
	const timeInput = document.querySelector("#time").value || "00:00";
	const inputDatetime = new Date(`${dateInput}T${timeInput}`);
	const currentDatetime = new Date();
	const difference = inputDatetime - currentDatetime;
	if (difference <= 0) {
		document.querySelector("#countdowns").innerHTML += `<div class='countdown'>Time's up!</div>`;
		return;
	}
	const countdownContainer = document.createElement("div");
	countdownContainer.classList.add("countdown");
	countdownContainer.innerHTML = `
    <h3>${nameInput}</h3>
    <div id="countdown-${currentDatetime.getTime()}"></div>`;
	document.querySelector("#countdowns").appendChild(countdownContainer);
	updateCountdown(currentDatetime.getTime(), difference);
});

function updateCountdown(id, difference) {
	const countdownElement = document.querySelector(`#countdown-${id}`);
	const seconds = Math.floor((difference / 1000) % 60);
	const minutes = Math.floor((difference / 1000 / 60) % 60);
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	countdownElement.innerHTML = `
    ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
	if (difference <= 0) {
		countdownElement.innerHTML = "Time's up!";
		return;
	}
	setTimeout(() => {
		updateCountdown(id, difference - 1000);
	}, 1000);
}
