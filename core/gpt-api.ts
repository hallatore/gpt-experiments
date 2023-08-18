import {
    ChatCompletionFunctions,
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessage,
    Configuration,
    CreateChatCompletionRequestFunctionCall,
    OpenAIApi,
} from 'openai';
import 'dotenv/config';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export const chat_completion = async (
    messages: ChatCompletionRequestMessage[],
    functions?: Array<ChatCompletionFunctions>,
    function_call?: CreateChatCompletionRequestFunctionCall
): Promise<ChatCompletionResponseMessage | undefined> => {
    try {
        const completions = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
            messages: messages,
            functions: functions,
            function_call: function_call,
        });

        return completions.data.choices[0].message;
    } catch (error) {
        console.error(error);
        console.error(error?.toString());
    }
};
