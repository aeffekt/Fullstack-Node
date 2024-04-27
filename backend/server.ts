import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csv2Json from 'convert-csv-to-json'

const app = express()
const port = process.env.PORT ?? 3000

// tomado de la docs npm multer oficial
const storage = multer.memoryStorage() 
const upload = multer({ storage: storage })

let userData: Array<Record<string, string>> = []

app.use(cors()) //permite peticiones de cualquier dominio al habilitar cors

app.post('/api/files', upload.single('file'), async (req, res) => {
    // 1. Extract file from request
    const { file } = req
    
    // 2. Validate the file
    if(!file) {
        return res.status(500).json({data: [], message: 'File not found'})
    }
    // 3. Validate the mimetype (csv)
    if(file.mimetype !== 'text/csv') {
        return res.status(500).json({data: [], message: 'File type must be CSV'})
    }
    // 4. Transform file to String
    let jsonData: Array<Record<string, string>> = []
    try{
        const csv = Buffer.from(file.buffer).toString('utf-8')        
        console.log(csv)
        // 5. Trasnform string to JSON
        jsonData = csv2Json.fieldDelimiter(',').csvStringToJson(csv)        
    } catch (error){
        return res.status(500).json({message: 'Error parsing the file'})
    }
    // 6. Save JSON to DB
    userData = jsonData
    
    // 7. return 200, message and JSON
    return res.status(200).json({data: jsonData, message: 'File uploaded successfully'})
})

app.get('/api/users/', async (req, res) => {
    // 1. Extract query param 'q' from request
    const { q } = req.query
    // 2. Validate query param    
    if(!q){
        return res.status(500).json({message: 'Query param not found'})
    }
    if(Array.isArray(q)){
        return res.status(500).json({message: 'Query param must be a string'})
    }
    // 3. Filter data from db with query param
    const search = q.toString().toLowerCase()
    const filteredData = userData.filter(row => {
        return Object
            .values(row)
            .some(value => value.toLowerCase().includes(search))
    })

    // 4. return 200 with filtered data
    return res.status(200).json({data: []})
})

app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`)    
})