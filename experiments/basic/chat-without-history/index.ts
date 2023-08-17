import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';
import readlineSync from 'readline-sync';

export const description = `
Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.
Note that each request/response is sent in isolation. So you cannot ask follow up questions.

NB: Send an empty message to exit.
`;

export default async () => {
    while (true) {
        const input = readlineSync.question('PROMPT: ');

        if (input === '') {
            break;
        }

        const messages: ChatCompletionRequestMessage[] = [
            {
                role: 'user',
                content: input,
            },
        ];

        const result = await chat_completion(messages);
        console.log(`GPT: ${result?.content}`);
    }
};
