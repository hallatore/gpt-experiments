import { FaissStore } from 'langchain/vectorstores/faiss';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import readlineSync from 'readline-sync';
import faqData from './faq.json';

export const description = `
Takes user input from terminal and does a similarity search on a faq dataset.
The faq dataset is located in experiments/basic/vector-search/faq.json.

Try search for "Info about shipping", "Do you offer discounts?" or "How do I get a refund?".

NB: Send an empty message to exit.
`;

export default async () => {
    const texts = faqData.map((faq) => `${faq.question}\r\n${faq.answer}`);
    const metadatas = faqData.map((faq, index) => ({ ...faq, id: index }));

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

        const result = await vectorStore.similaritySearch(input, 3);

        result.forEach((item) => {
            console.log(`Q: ${item.metadata.question}`);
            console.log(`   ${item.metadata.answer}`);
        });

        console.log('');
    }
};
