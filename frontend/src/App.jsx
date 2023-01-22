import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import './App.css'
import AllProjectsScreen from './screens/AllProjectsScreen'
import MyProjectsScreen from './screens/MyProjectsScreen'
import SignUpScreen from './screens/SignUpScreen'
import AddProjectScreen from './screens/AddProjectScreen'
import TesterProjects from './screens/TesterProjects'
import AddBugScreen from './screens/AddBugScreen'
import AddMembersToProject from './screens/AddMembersToProject'
import BugListScreen from './screens/BugListScren'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginScreen />} />
        <Route path="/home" element={<AllProjectsScreen />} />
        <Route path="/register" element={<SignUpScreen />} />
        <Route path="/All_Projects" element={<AllProjectsScreen />} />
        <Route path="/Testing_Projects" element={<TesterProjects />} />
        <Route path="/My_Projects" element={<MyProjectsScreen />} />
        <Route path="/addProject" element={<AddProjectScreen />} />
        <Route path="/addBug" element={<AddBugScreen />} />
        <Route path="/addMembers" element={<AddMembersToProject />} />
        <Route path="/allBugs" element={<BugListScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
