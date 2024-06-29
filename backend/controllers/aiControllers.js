const  OpenAIApi  = require('openai');


const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

const generatePrompt = (messages) => {
    const chatLog = messages.map(m => `User: ${m.user ? m.user : ''}\nManager: ${m.manager ? m.manager :''}`).join('\n');
    return `${chatLog}\nManager:`;
};


const generateReply =  async (chatHistory) => {
    const messages = chatHistory.history;
    // console.log("ssssssssssssssss",messages);
    const prompt = generatePrompt(messages);

    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            prompt: prompt,
            max_tokens: 5
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
      return { text: response.choices[0].text }
    } catch (error) {
      console.log("error message :",error.message);
    }
}

// below function is responsible for generating response 
module.exports = {
    generateReply,suggestMessage
}

