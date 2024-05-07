import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <iframe 
        width="600" 
        height="800" 
        src="https://lookerstudio.google.com/embed/reporting/3bfc8308-0e99-429a-8d5e-5a8799d25874/page/p_f7yfk3dygd"  
        allowFullScreen 
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
      </iframe>
    </>
  )
}

export default App
