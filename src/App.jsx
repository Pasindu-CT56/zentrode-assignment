import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductList from '../components/ProductList'

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
      
    </div>
  )
}

export default App
