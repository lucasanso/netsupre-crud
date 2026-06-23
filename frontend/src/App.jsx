import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FormularioCadastro from './pages/FormularioCadastro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section >
        <FormularioCadastro />
      </section>
    </>
      
  )
}

export default App
