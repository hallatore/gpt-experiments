import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';
import readlineSync from 'readline-sync';

const tranlate = async (
    input: string,
    language: string
): Promise<string | undefined> => {
    const messages: ChatCompletionRequestMessage[] = [
        {
            role: 'system',
            content: `Act as a translator. Translate the following text to ${language}.`,
        },
        {
            role: 'user',
            content: input,
        },
    ];

    const result = await chat_completion(messages);
    return result?.content;
};

export default async () => {
    console.log('Translate the following text to Swedish, French, and German.');

    while (true) {
        const input = readlineSync.question('PROMPT: ');

        if (input === '') {
            break;
        }

        const swedishResult = await tranlate(input, 'Swedish');
        console.log(`Swedish: ${swedishResult}`);

        const frenchResult = await tranlate(input, 'French');
        console.log(`French: ${frenchResult}`);

        const germanResult = await tranlate(input, 'German');
        console.log(`German: ${germanResult}`);
    }
};
