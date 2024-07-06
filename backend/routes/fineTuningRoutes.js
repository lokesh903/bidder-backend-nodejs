const express = require('express')
const apiController = require('../controllers/fileTuningController')
const router = express.Router()

router.post('/upload-file', apiController.UploadFile)
router.get('/list-files', apiController.ListFiles)
router.get('/get-file', apiController.RetrieveFile)
router.post('/create-finetune', apiController.CreateFineTune)
router.get('/list-finetunes', apiController.ListFineTunes)

module.exports = router