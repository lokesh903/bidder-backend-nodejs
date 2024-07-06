const fileService = require('../services/fileService')
const finetuneService = require('../services/finetuning')

async function UploadFile(req, res) {
    const response = await fileService.UploadFile()
    res.send(response)
}

async function ListFiles(req, res) {
    const response = await fileService.ListFiles()
    res.send(response.data)
}

async function RetrieveFile(req, res) {
    var fileId = req.query["fileId"]
    const response = await fileService.RetrieveFile(fileId)
    if (response == "fileId not found") {
        return res.status(404).send('fileId not found')
    }
    res.send(response)
}

async function CreateFineTune(req, res) {
    var fileId = req.query["fileId"]
    const response = await finetuneService.CreateFineTune(fileId)
    res.send(response)
}

async function ListFineTunes(req, res) {
    const response = await finetuneService.ListFineTunes()
    res.send(response)
}

module.exports = {
    UploadFile,
    ListFiles,
    RetrieveFile,
    CreateFineTune,
    ListFineTunes
}