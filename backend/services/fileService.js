const fs = require('fs')
const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY })

async function UploadFile() {
    const response = await openai.files.create({ file: fs.createReadStream('mydata.jsonl'), purpose: 'fine-tune' });
    return response
}

async function ListFiles() {
    return await openai.files.list()
}

async function RetrieveFile(fileId) {
    try {
        return await openai.files.retrieve(fileId)
    } catch(err) {
        return "fileId not found"
    }
}

module.exports = {
    UploadFile,
    ListFiles,
    RetrieveFile
}