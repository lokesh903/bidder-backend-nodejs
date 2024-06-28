const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
});


const openai = new OpenAIApi(configuration);

const generatePrompt = (messages) => {
    const chatLog = messages.map(m => `User: ${m.user}\nManager: ${m.manager}`).join('\n');
    return `${chatLog}\nManager:`;
};

// below function is responsible for generating response 
export const generateReply = async (chatHistory) => {
    const messages = chatHistory.history;
    const prompt = generatePrompt(messages);

    try {
        const response = await openai.createCompletion({
            model: 'gpt-3.5-turbo',
            prompt: prompt,
            max_tokens: 100
        });

        const replyText = response.data.choices[0].text.trim();
        const tokensUsed = response.data.usage.total_tokens;

        return { reply: replyText, tokens_used: tokensUsed };
    } catch (error) {
        return { error: error.message };
    }
};

