# Hello gpt

Takes user input from terminal and translates it to Swedish, French, and German.

## Example

```
Translate the following text to Swedish, French, and German.

PROMPT: Hvilken dag er det i dag
Swedish: Vilken dag är det idag?
French: Quel jour sommes-nous aujourd'hui?
German: Welcher Tag ist heute?

PROMPT: Will it rain tomorrow? Should I bring an umbrella?
Swedish: Kommer det att regna imorgon? Bör jag ta med ett paraply?
French: Est-ce qu'il va pleuvoir demain? Je devrais apporter un parapluie?
German: Wird es morgen regnen? Soll ich einen Regenschirm mitbringen?
```

This experiment uses a system prompt to instruct GPT on how to behave. It doesn't try to answer your input as a question, but instead return the input translated to the language given.

Note that the input language is not given. First prompt is in Norwegian and second in English.