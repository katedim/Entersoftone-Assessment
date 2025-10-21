import './App.scss'
import EmployeesTable  from './components/employeesTable/employeesTable';
import EmployeeInfo from './components/employeeInfo/employeeInfo';
import Header from './components/header/header';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
function App() {

 return (
    <Router>
      <Header/>
        <Routes>
          <Route path='/employees' element={<EmployeesTable />} />
          <Route path='/employee/:id' element={<EmployeeInfo />} />
          <Route path='*' element={<Navigate to='/employees' replace />}/>
        </Routes>
    </Router>
 )
}

export default App
