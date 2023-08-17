import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';
import readlineSync from 'readline-sync';

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
