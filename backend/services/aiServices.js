const OpenAIApi = require('openai');

const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

async function generatePrompt(messages) {
    const chatLog = messages.map(m => {
        return {
            role: `${m.client ? "user" : "assistant"}`,
            content: m.manager ? m.manager : m.client
        }
    })
    return chatLog;
};

async function generateReply(message) {
    let messages = await generatePrompt(message.history)
    const responsibilityPrompt = { role: 'system', content: 'You are a project manager of HackerKernel who is determined to get the project even if client is not ready he will try to do the best to convence him and going to reply user accordingly to the given conversation.' }
    const prompt = [responsibilityPrompt, ...messages]
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: prompt,
            max_tokens: 20,
        });
        const replyText = response.choices[0].message.content.trim();
        const tokensUsed = response.usage.total_tokens;
        return { reply: replyText, tokens_used: tokensUsed }
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

// below code is not in use as of now
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
            max_tokens: 5
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
    generateReply, suggestMessage, generateReplyV01
}

