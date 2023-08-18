import { FaissStore } from 'langchain/vectorstores/faiss';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import readlineSync from 'readline-sync';
import faqData from './faq.json';
import { ChatCompletionRequestMessage } from 'openai';
import { chat_completion } from '../../../core/gpt-api';

export const description = `
Takes user input from terminal and does a similarity search on a faq dataset.
Then it uses GPT to do a final filtering of the results.
The faq dataset is located in experiments/basic/vector-search/faq.json.

Try search for "Info about shipping", "Do you offer discounts?" or "How do I get a refund?".

NB: Send an empty message to exit.
`;

export default async () => {
    const texts = faqData.map((faq) => `${faq.question}\r\n${faq.answer}`);
    const metadatas = faqData.map((faq, index) => ({ index: index }));

    const vectorStore = await FaissStore.fromTexts(
        texts,
        metadatas,
        new OpenAIEmbeddings()
    );

    while (true) {
        const input = readlineSync.question('Search for: ');

        if (input === '') {
            return true;
        }

        const result = await vectorStore.similaritySearch(input, 10);

        const faqItems = result.map((item) => ({
            id: item.metadata.index,
            question: faqData[item.metadata.index].question,
            answer: faqData[item.metadata.index].answer,
        }));

        console.log('');
        console.log(`Top 10 (of ${faqData.length}) items from Vector search:`);
        result.forEach((item) => {
            console.log(
                `Q:[${item.metadata.index}] ${
                    faqData[item.metadata.index].question
                }`
            );
        });

        console.log('\r\n---\r\n');

        const systemPrompt = `
Return ids as json. Filter out those that are not relevant to the query. Include those that are vaguely relevant. You can return an empty array if none are relevant. Only return the id for each item.

FAQ json:
${JSON.stringify(faqItems)}

Example response:
[4, 17]
        `.trim();

        const messages: ChatCompletionRequestMessage[] = [
            {
                role: 'system',
                content: systemPrompt,
            },
            {
                role: 'user',
                content: `"${input}"`,
            },
        ];

        const chatResult = await chat_completion(messages);

        try {
            const chatResultJson = JSON.parse(chatResult?.content || '');

            console.log('Final filtering from GPT:');
            chatResultJson.forEach((item: number) => {
                console.log(`Q:[${item}] ${faqData[item].question}`);
                console.log(`  ${faqData[item].answer}`);
            });
        } catch (e) {
            console.log(`GPT?: ${chatResult?.content}`);
        }

        console.log('');
    }
};
