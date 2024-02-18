import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Layout1 from './components/stock/Layout1'
import Product from './components/stock/Product'
import Sale from './components/stock/Sale'


const App = () => {
  const token = localStorage.getItem('token')
  return (
    <div>
      {token ? (
        <Routes>
          <Route path='/admin' element={<Layout1 />} >
            <Route index element={<Navigate to="/admin" />} />
            <Route path='/admin/product' element={<Product/>} />
            <Route path='/admin/sale' element={<Sale/>} />
          </Route>

          <Route path='/' element={<Navigate to="/admin" />} />
          <Route path='*' element={<Navigate to="/admin" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App