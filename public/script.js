const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const generateButton = document.getElementById("generate-button");
submitButton.disabled = true;
generateButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
generateButton.addEventListener("click", generateImage);

function verifyTextLength(e) {
	// The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called 'textarea'
	const textarea = e.target;

	// Verify the TextArea value.
	if (textarea.value.length > 200 && textarea.value.length < 100000) {
		// Enable the button when text area has value.
		submitButton.disabled = false;
		generateButton.disabled = false;
		
	} else {
		// Disable the button when text area is empty.
		submitButton.disabled = true;
		generateButton.disabled = true;
	}
}

function submitData(e) {
	// This is used to add animation to the submit button
	submitButton.classList.add("submit-button--loading");

	const text_to_summarize = textArea.value;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		text_to_summarize: text_to_summarize,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	// Send the text to the server using fetch API

	// Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!
	fetch("/summarize", requestOptions)
		.then((response) => response.text()) // Response will be summarized text
		.then((summary) => {
			// Do something with the summary response from the back end API!

			// Update the output text area with new summary
			summarizedTextArea.value = summary;

			// Stop the spinning loading animation
			submitButton.classList.remove("submit-button--loading");
		})
		.catch((error) => {
			console.log(error.message);
		});
}

function generateImage(e) {
	e.preventDefault();
	generateButton.classList.add("generate-button--loading");

	const text_for_image_gen = textArea.value;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	fetch(
		`http://127.0.0.1:8000/?prompt=${encodeURIComponent(text_for_image_gen)}`,
		requestOptions
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok " + response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			const imageUrl = `data:image/png;base64,${data.image}`;
			Image.src = imageUrl;
			submitButton.classList.remove("generate-button--loading");
		})
		.catch((error) => {
			console.error("There has been a problem with your fetch operation:", error);
			submitButton.classList.remove("generate-button--loading");
		});
}
