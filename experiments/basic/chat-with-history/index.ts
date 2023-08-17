import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';
import readlineSync from 'readline-sync';

export const description = `
Takes user input from terminal and sends it to gpt. Prints the respons in the terminal.
Note that the history is kept. So GPT processes all messages each request.

NB: Send an empty message to exit.
`;

export default async () => {
    const messages: ChatCompletionRequestMessage[] = [];

    while (true) {
        const input = readlineSync.question('PROMPT: ');

        if (input === '') {
            break;
        }

        messages.push({
            role: 'user',
            content: input,
        });

        const result = await chat_completion(messages);

        messages.push({
            role: 'assistant',
            content: result?.content,
        });

        console.log(`GPT: ${result?.content}`);
    }
};
