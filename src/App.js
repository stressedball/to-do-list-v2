import SideBar from "./components/SideBar";
import AddTask from "./components/Task-management/AddTask";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProject from "./components/Project-Management/AddProject";

function App({ addTask, tasks, addProject, projects }) {
  const [selectedOption, setSelectedOption] = useState('AddProject');
  const [selectedView, setSelectView] = useState('/all-tasks')

  useEffect(() => {

    document.querySelectorAll('.underline').forEach(el => {
      el.classList.remove('underline')
    })

    document.querySelector(`a[href="${selectedView}"]`).classList.add('underline')
  }, [selectedView])

  const changeTab = (val) => {
    setSelectView(val)
  }

  return (

    <div className="App">

      < SideBar changeTab={changeTab} projects={projects} />

      {selectedOption === 'AddTask' ? (
        <AddTask addTask={addTask} setSelectedOption={setSelectedOption} />
      ) : (
          
        <AddProject setSelectedOption={setSelectedOption} tasks={tasks} addProject={addProject} />
      )}

      <div id="main-container">

        <Outlet path={`${selectedView}`} />
      </div>
    </div>
  );
}

export default App;
