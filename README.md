# gpt-experiments

Contains different GPT sample projects/experiments written in js/typescript.

## Setup

### Installation

```
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

#### [Hello gpt](./experiments/basic/hello-gpt/Readme.md)

Sends `Hello, I am a human.` to gpt and prints the response to the console.

#### [Chat without history](./experiments/basic/chat-without-history/Readme.md)

Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.

#### [Chat with history](./experiments/basic/chat-with-history/Readme.md)

Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.

#### [Translate](./experiments/basic/translate/Readme.md)

Takes user input from terminal and translates it to Swedish, French, and German.

### Intermidiate

...

### Advanced

...

## How to contribute

1. Create a experiments folder with your code. See experiments/basic/hello-gpt for a starting point.
2. Add it to the list in [index.ts](./index.ts)
3. Add it to the list in this readme
4. Create a pull request on GitHub with your changes.

PS: https://platform.openai.com/playground is great for prototyping GPT logic!