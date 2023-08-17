import readlineSync from 'readline-sync';
import helloGpt from './experiments/basic/hello-gpt';
import chat from './experiments/basic/chat';
import chatWithHistory from './experiments/basic/chat-with-history';
import translate from './experiments/basic/translate';

const experiments = [
    {
        name: 'basic/hello-gpt',
        readme: 'experiments/basic/hello-gpt/README.md',
        fn: helloGpt,
    },
    {
        name: 'basic/chat',
        readme: 'experiments/basic/chat/README.md',
        fn: chat,
    },
    {
        name: 'basic/chat-with-history',
        readme: 'experiments/basic/chat-with-history/README.md',
        fn: chatWithHistory,
    },
    {
        name: 'basic/translate',
        readme: 'experiments/basic/translate/README.md',
        fn: translate,
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
            `\r\n---\r\nRunning ${experiments[experimentIndex].name}\r\n---\r\n`
        );

        const result = experiments[experimentIndex].fn();

        if (result instanceof Promise) {
            await result;
        }

        readlineSync.keyIn(
            '\r\n\x1b[33mDone running experiment. Press any key to continue. \x1b[0m'
        );

        console.log('\x1b[33m%s\x1b[0m', '\r\n---');
    }
}

main();
