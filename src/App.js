import SideBar from "./components/SideBar";
import AddTask from "./components/Task-management/AddTask";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import AddProject from "./components/Project-Management/AddProject";

function App({ addTask }) {
  const [selectedOption, setSelectedOption] = useState('AddTask');
  return (
    <div className="App">
      < SideBar />
      {selectedOption === 'AddTask' ? (
        <AddTask addTask={addTask} setSelectedOption={setSelectedOption} />
      ) : (
        <AddProject setSelectedOption={setSelectedOption} />
      )}
      <div id="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
