const OpenAIApi = require('openai');


const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

const generatePrompt = (messages) => {
    const chatLog = messages.map(m => `User: ${m.user ? m.user : ''}\nManager: ${m.manager ? m.manager : ''}`).join('\n');
    return `${chatLog}\nManager:`;
};

const generateReply = async (chatHistory) => {
    const messages = chatHistory.body.history.map(message => {
        return { role: 'user', content: message.user };
    });

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 5
        });
        const replyText = response.data.choices[0].message.content.trim();
        const tokensUsed = response.data.usage.total_tokens;
        return { reply: replyText, tokens_used: tokensUsed };
    } catch (error) {
        return { error: error.message };
    }
}


const suggestMessage = async (text) => {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Finish my thought: ${text}`,
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log(response);
        return { text: response.choices[0].text }
    } catch (error) {
        console.log("error message :", error.message);
    }
}

const generatePromptV01 = (messages) => {
    return messages.map(entry => {
        const keys = Object.keys(entry);
        return keys.map(key => {
            let role;
            if (key === 'user') {
                role = 'user';
            } else if (key === 'manager') {
                role = 'system'; // or 'manager' if that's the intended role
            }
            return { role: role, content: entry[key] };
        });
    }).flat();
};


const generateReplyV01 = async (chatHistory, res) => {
    const messages = chatHistory.body.history;
    const prompt = generatePromptV01(messages);
    try {
        const response = await openai.chat.completions.create({
            messages: prompt,
            model: "ft:gpt-3.5-turbo-0125:hackerkernel::9hjIJBNx",
            max_tokens: 50
        });
        const replyText = response.choices[0].message.content;
        const tokensUsed = response.usage.prompt_tokens;
        let obj = { reply: replyText, tokens_used: tokensUsed };
        res.send(obj);
    } catch (error) {
        return { error: error.message };
    }
}


module.exports = {
    generateReply, suggestMessage,generateReplyV01
}

