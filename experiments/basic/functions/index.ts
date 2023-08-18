import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { chat_completion } from '../../../core/gpt-api';
import readlineSync from 'readline-sync';
import 'dotenv/config';

export const description = `
This example builds on chat-with-history but adds the use of functions. 
rollDice returns a number between 1 and max. GPT can choose to request this function if it wants to. The function runs on our computer.

Try asking GPT to roll a dice.

NB: Send an empty message to exit.
`;

const functions = [
    {
        name: 'rollDice',
        description: 'Get a random number between 1 and max',
        parameters: {
            type: 'object',
            properties: {
                sides: {
                    type: 'number',
                    description: 'The maximum number of the dice',
                },
            },
            required: ['sides'],
        },
    },
];

export default async () => {
    const messages: ChatCompletionRequestMessage[] = [];
    let skipUserInputSinceFunctionWasCalled = false;

    messages.push({
        role: 'system',
        content: `
Don't make assumptions about what values to plug into functions. 
Ask for clarification if a user request is ambiguous.
Evaluate if you need to run another function before returning a response. 
Don't ask to run a function.
        `
            .trim()
            .replaceAll(/[ \t\r\n]+/g, ' '),
    });

    while (true) {
        if (!skipUserInputSinceFunctionWasCalled) {
            const input = readlineSync.question('PROMPT: ');

            if (input === '') {
                return true;
            }

            messages.push({
                role: 'user',
                content: input,
            });
        }

        const result = await chat_completion(messages, functions, 'auto');
        skipUserInputSinceFunctionWasCalled = false;

        messages.push({
            role: 'assistant',
            content: result?.content,
            function_call: result?.function_call,
        });

        if (result?.content) {
            console.log(`GPT: ${result?.content}`);
        }

        if (result?.function_call) {
            const x = JSON.parse(result.function_call.arguments || '{}') as {
                sides: number;
            };
            const roll = Math.floor(Math.random() * x.sides) + 1;

            messages.push({
                role: 'function',
                name: result.function_call.name,
                content: JSON.stringify({ result: roll }),
            });

            console.log(
                `${JSON.stringify(result.function_call || {})} => ${roll}`
            );

            skipUserInputSinceFunctionWasCalled = true;
        }
    }
};
