import SideBar from "./components/SideBar";
import AddTask from "./components/Task-management/AddTask";
import { Outlet } from "react-router-dom";

function App({ addTask }) {
  return (
    <div className="App">
      < SideBar />
      < AddTask addTask={addTask} />
      <div id="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
