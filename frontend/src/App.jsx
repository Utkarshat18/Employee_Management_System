import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/Protectedroute/Protectedroute'
import Login from './components/Login/Login'
import Adminpage from './components/Adminpage/Adminpage'
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<ProtectedRoute role="admin"><Adminpage/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
