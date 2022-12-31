import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogin from './componenets/user/userLogin/UserLogin';
import Structure from './Pages/admin/Structure';
import AdminLogin from './componenets/admin/AdminLogin';
import AddUser from './componenets/admin/AddUser';
import UserStructure from './Pages/user/UserStructure';
import UserDashboard from './componenets/user/userDashboard/UserDashboard';
import AdminAddTask from './componenets/admin/AdminAddTask';
import Updation from './context/userContext';
import ViewUser from './componenets/admin/ViewUser';
import Assigned from './componenets/user/assigned/Assigned';
import Started from './componenets/user/Started/Started';
import Completed from './componenets/user/completed/Completed';
import AdminDashboard from './componenets/admin/AdminDashboard';
import WeeklyReports from './componenets/admin/WeeklyReports';
import MonthlyReport from './componenets/admin/MonthlyReport';
import ErrorPage from './componenets/admin/Error';



function App() {
  return (
    <div>
      <Router>


        <Routes>

          <Route path='/admin/login' element={<AdminLogin />} ></Route>

          <Route path='/admin' element={<Structure />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='user-add' element={<AddUser />} ></Route>
            <Route path='add-task' element={<AdminAddTask />} ></Route>
            <Route path='view-users' element={<ViewUser />} ></Route>
            <Route path='weekly-reports' element={<WeeklyReports />} ></Route>
            <Route path='monthly-reports' element={<MonthlyReport />} ></Route>




          </Route>


          <Route path='/login' element={<UserLogin />} ></Route>
          <Route path='/' element={<UserStructure />}>
            <Route path='/dashboard' element={<UserDashboard />}></Route>
            <Route path='/assigned' element={<Assigned />}></Route>
            <Route path='/started' element={<Started />}></Route>
            <Route path='/completed' element={<Completed />}></Route>
          </Route>


          <Route path='*' element={<ErrorPage />} />


        </Routes>

      </Router>

    </div>


  );
}

export default App;
