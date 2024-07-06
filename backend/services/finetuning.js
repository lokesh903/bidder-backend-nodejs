const OpenAI = require('openai')
require('dotenv').config()
const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY })

async function CreateFineTune(fileId) {
    try {
        const response = await openai.fineTuning.jobs.create({ training_file: fileId, model: 'gpt-3.5-turbo' })
        return response
    } catch(err) {
        return { status: 400, data: err }
    }
}

async function ListFineTunes() {
    try {
        return await openai.fineTuning.jobs.list();
    } catch(err) {
        return { status: 400, data: err }
    }
}
async function RetrieveStateFineTune(jobId) {
    try {
        return await openai.fineTuning.jobs.retrieve(jobId)
    } catch(err) {
        return { status: 400, data: err }
    }
}

module.exports = {
    CreateFineTune,
    ListFineTunes,
    RetrieveStateFineTune
}