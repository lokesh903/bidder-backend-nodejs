const  OpenAIApi  = require('openai');


const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

const generatePrompt = (messages) => {
    const chatLog = messages.map(m => `User: ${m?.user}\nManager: ${m?.manager}`).join('\n');
    return `${chatLog}\nManager:`;
};

// below function is responsible for generating response 
module.exports.generateReply = async (chatHistory) => {
    const messages = chatHistory.history;
    // console.log("ssssssssssssssss",messages);
    const prompt = generatePrompt(messages);

    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            max_tokens: 100
        });
        console.log("response::",response);

        const replyText = response.choices[0].text.trim();
        const tokensUsed = response.usage.total_tokens;

        console.log("reply txt",replyText);
        console.log("token used",tokensUsed);

        return { reply: replyText, tokens_used: tokensUsed };
    } catch (error) {
        return { error: error.message };
    }
};

