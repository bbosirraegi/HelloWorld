import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components'
import { Topic, Main } from './pages'


const IndexRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/notification" element={<Topic />} />
      </Route>
    </Routes>
  )
}

export default IndexRouter