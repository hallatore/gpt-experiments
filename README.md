# gpt-experiments

Contains different GPT sample projects/experiments written in js/typescript.

## Setup

### Installation

```
npm install -g ts-node
npm install
```

Create an .env file with the following content

```
OPENAI_API_KEY=<API-KEY>
OPENAI_MODEL=gpt-3.5-turbo
```

You can get your api-key from https://platform.openai.com/account/api-keys

### Running the experiments

Run `npm start` and select which experiment you want to run.

## Experiments

### Basic

#### Hello gpt

Sends `Hello, I am a human.` to gpt and prints the response to the console.

#### Chat without history

Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.

Note that each request/response is sent in isolation. So you cannot ask follow up questions.

#### Chat with history

Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.

Note that the history is kept. So GPT processes all messages each request.

### Intermidiate

...

### Advanced

...
