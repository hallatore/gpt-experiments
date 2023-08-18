import readlineSync from 'readline-sync';
import helloGpt, {
    description as helloGptDescription,
} from './experiments/basic/hello-gpt';
import chatWithoutHistory, {
    description as chatWithoutHistoryDescription,
} from './experiments/basic/chat-without-history';
import chatWithHistory, {
    description as chatWithHistoryDescription,
} from './experiments/basic/chat-with-history';
import translate, {
    description as translateDescription,
} from './experiments/basic/translate';
import vectorSearch, {
    description as vectorSearchDescription,
} from './experiments/basic/vector-search';
import vectorSearchWithGpt, {
    description as vectorSearchWithGptDescription,
} from './experiments/basic/vector-search-with-gpt';
import functions, {
    description as functionsDescription,
} from './experiments/basic/functions';

const experiments = [
    {
        name: 'basic/hello-gpt',
        readme: 'experiments/basic/hello-gpt/README.md',
        description: helloGptDescription,
        fn: helloGpt,
    },
    {
        name: 'basic/chat-without-history',
        readme: 'experiments/basic/chat-without-history/README.md',
        description: chatWithoutHistoryDescription,
        fn: chatWithoutHistory,
    },
    {
        name: 'basic/chat-with-history',
        readme: 'experiments/basic/chat-with-history/README.md',
        description: chatWithHistoryDescription,
        fn: chatWithHistory,
    },
    {
        name: 'basic/translate',
        readme: 'experiments/basic/translate/README.md',
        description: translateDescription,
        fn: translate,
    },
    {
        name: 'basic/vector-search',
        readme: 'experiments/basic/vector-search/README.md',
        description: vectorSearchDescription,
        fn: vectorSearch,
    },
    {
        name: 'basic/vector-search-with-gpt',
        readme: 'experiments/basic/vector-search-with-gpt/README.md',
        description: vectorSearchWithGptDescription,
        fn: vectorSearchWithGpt,
    },
    {
        name: 'basic/functions',
        readme: 'experiments/basic/functions/README.md',
        description: functionsDescription,
        fn: functions,
    },
];

async function main() {
    while (true) {
        console.log('\x1b[33m%s\x1b[0m', 'EXPERIMENTS');
        const longestExperimentName = Math.max(
            ...experiments.map((e) => e.name.length)
        );

        const experimentIndex = readlineSync.keyInSelect(
            experiments.map(
                (experiment) =>
                    `${experiment.name.padEnd(longestExperimentName + 4)} ${
                        experiment.readme || ''
                    }`
            ),
            'Which experiment would you like to run?'
        );

        if (experimentIndex === -1) {
            break;
        }

        console.log(
            '\x1b[33m%s\x1b[0m',
            `\r\n---\r\nRunning ${
                experiments[experimentIndex].name
            }\r\n\r\n${experiments[
                experimentIndex
            ].description.trim()}\r\n---\r\n`
        );

        const result = await experiments[experimentIndex].fn();

        if (result === undefined) {
            readlineSync.keyIn(
                '\r\n\x1b[33mDone running experiment. Press SPACEBAR to continue. \x1b[0m'
            );
        }

        console.log('\x1b[33m%s\x1b[0m', 'Done running experiment.\r\n---');
    }
}

main();
