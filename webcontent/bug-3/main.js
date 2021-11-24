async function logData() {
	const form = find("d-form").first();
	const log = find("#log").first();

	log.textContent = JSON.stringify(await form.value(), null, "\t");
}