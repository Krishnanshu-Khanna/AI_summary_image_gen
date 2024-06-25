# AI Text Summarizer App

Welcome to the AI Text Summarizer App repository! This app leverages the power of Artificial Intelligence APIs to provide concise summaries of long texts. Whether you have a lengthy article, research paper, or any other text document that you want to summarize quickly, our app can assist you.

## Features

- **Text Summarization**: Input long text and get a summarized version.
- **Image Generation**: Generate an image based on the summarized text.

## Usage

### Prerequisites

Before you start, make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```
### Running the App
- Start the development server:

```bash
npm run dev
uvicorn api:app --reload
```
- The app will be running at http://localhost:3000.
- The fast api of generation will be at http://127.0.0.1:8000/docs#

### Usage Example
1. Open the app in your web browser.
2. Paste a long text into the text area.
3. Click the "Summarize" button to get a summary.
4. Optionally, click the "Generate Image" button to generate an image based on the summarized text.
### Technologies Used
- HTML
- CSS
- JavaScript (including Fetch API for backend communication and server)
- FastAPI Python (for the image generation)
- diffusers, transformers, safetensors, accelerate, torch, stable-diffusion-xl-base-1.0 (Image generation modules dependency)
Other dependencies (listed in package.json)
