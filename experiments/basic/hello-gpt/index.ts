import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';

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
