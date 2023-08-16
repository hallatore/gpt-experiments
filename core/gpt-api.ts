import {
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessage,
    Configuration,
    OpenAIApi,
} from 'openai';
import 'dotenv/config';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chat_completion = async (
    messages: ChatCompletionRequestMessage[]
): Promise<ChatCompletionResponseMessage | undefined> => {
    try {
        const completions = await openai.createChatCompletion({
            model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
            messages: messages,
        });

        return completions.data.choices[0].message;
    } catch (error) {
        console.error(error);
        console.error(error?.toString());
    }
};
