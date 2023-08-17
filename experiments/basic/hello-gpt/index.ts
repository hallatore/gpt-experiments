import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';

export const description = `
Sends \`Hello, I am a human.\` to gpt and prints the response to the console.
`;

export default async () => {
    const messages: ChatCompletionRequestMessage[] = [
        {
            role: 'user',
            content: 'Hello, I am a human.',
        },
    ];

    const result = await chat_completion(messages);

    console.log(`GPT: ${result?.content}`);
};
