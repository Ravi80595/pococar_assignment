import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import Signup from '../Pages/Signup'
import PrivateRoute from './PrivateRoutes'



const AllRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
  )
}

export default AllRoutes
