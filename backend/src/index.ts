import express from 'express'
import cors from 'cors'
import routes from './routes/main.routes';
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', routes)

// In production, serve static files from the frontend build directory
if (process.env.DEPLOY_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  
    // For all other routes, serve the index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
    })
  }


export default app