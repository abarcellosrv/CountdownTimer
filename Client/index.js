setInterval(() => {
	getCountdown("2023-03-01 12:00:00");
}, 1000);

async function getCountdown(datetime) {
	try {
		const response = await axios.get(`http://localhost:8080/countdown?targetDateTime=${datetime}`);
		const events = response.data;
		return events;
	} catch (error) {
		console.error(error);
	}
}