import { Route, BrowserRouter,Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/mainindex.js";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Edit from "./components/Main/Edit.js";
import Details from "./components/Main/Details.js";
import EmployeeList from "./components/Main/employeelist.js";
import "./App.css"
import Register from "./components/Main/Register.js";

function App() {
  const user = localStorage.getItem("token");

	return (
		<BrowserRouter>
		<Routes>
			{user && <Route path='/'  exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/employeelist" exact element={<EmployeeList />} />
			<Route exact path="/edit/:id" element={<Edit/>} />
      <Route exact path="employeelist/view/:id"  element={<Details/>} />
      <Route path="/register" exact element={<Register />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
