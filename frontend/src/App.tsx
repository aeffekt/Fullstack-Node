import{useState} from 'react'
import { Toaster, toast } from 'sonner'
import './App.css'
import { uploadFile } from './services/upload'
import { type  Data } from './services/types'

const APP_STATUS ={
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  UPLOAD: 'upload',
  READY_USAGE: 'ready_usage',
}

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE)
  const [data, setData] = useState<Data>([])
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
      console.log('Selecting file...')
      const [file] = event.target.files ??[]    
      if(file) {
        setFile(file)
        setAppStatus(APP_STATUS.UPLOAD)
      }
  }   

  const handleSubmit = async (event: React
    .FormEvent<HTMLFormElement>) => {
      console.log('Uploading...')
      event.preventDefault()
      if(appStatus!=APP_STATUS.UPLOAD || !file) 
        return
      setAppStatus(APP_STATUS.LOADING)

      const [err, newData] = await uploadFile(file)
      console.log({ newData })

      if(err){
        setAppStatus(APP_STATUS.ERROR)
        toast.error(err.message)
        return
      }

      setAppStatus(APP_STATUS.READY_USAGE)
      if (newData) setData(newData)
      toast.success('File uploaded')
  }

  const showButton = appStatus===APP_STATUS.UPLOAD || appStatus===APP_STATUS.LOADING

  return (
    <>     
      <Toaster richColors/> 
      <h2>Upload CSV file + search</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input 
          onChange={handleInputChange} 
          name="file" 
          type="file" 
          accept=".csv"
        />
        {showButton && 
          (<button disabled={appStatus===APP_STATUS.LOADING}>Upload</button>)
        }
      </form>
    </>
  )
}

export default App
