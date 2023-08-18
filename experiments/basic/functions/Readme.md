# Functions

This example builds on chat-with-history but adds the use of functions. 

rollDice returns a number between 1 and max. GPT can choose to request this function if it wants to. The function runs on our computer.

## Examples

```
PROMPT: Give me a number between 1 and 100
{"name":"rollDice","arguments":"{\n  \"sides\": 100\n}"} => 62
GPT: The randomly generated number between 1 and 100 is 62.
```

```
PROMPT: Roll a 20 sided dice two times. Return the highest roll
{"name":"rollDice","arguments":"{\n  \"sides\": 20\n}"} => 5
{"name":"rollDice","arguments":"{\n\"sides\": 20\n}"} => 8
GPT: The highest roll from the two 20-sided dice is 8.

PROMPT: Roll it again until you get a higher number
{"name":"rollDice","arguments":"{\n  \"sides\": 20\n}"} => 16
GPT: The dice roll resulted in a higher number, 16.

PROMPT: Roll it again until you get a higher number 
{"name":"rollDice","arguments":"{\n\"sides\": 20\n}"} => 15
{"name":"rollDice","arguments":"{\"sides\": 20}"} => 18
GPT: The dice roll resulted in a higher number, 18.
```

```
PROMPT: roll a 20 sided dice 4 times
{"name":"rollDice","arguments":"{\n  \"sides\": 20\n}"} => 15
{"name":"rollDice","arguments":"{\n\"sides\": 20\n}"} => 2
{"name":"rollDice","arguments":"{\n\"sides\": 20\n}"} => 14
{"name":"rollDice","arguments":"{\n\"sides\": 20\n}"} => 5
GPT: I've rolled a 20-sided dice 4 times and here are the results: 15, 2, 14, 5.
```