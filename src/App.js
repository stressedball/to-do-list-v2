import Menu from "./components/Menu";
import AddTask from "./components/AddTask";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProject from "./components/AddProject";
import ProjectsMenu from "./components/ProjectsMenu";

function App() {

  const [selectedOption, setSelectedOption] = useState('AddTask');
  const [selectedView, setSelectView] = useState('a.links[href="/all-tasks"] p')

  useEffect(() => {
    document.querySelectorAll('.underline').forEach(el => {
      el.classList.remove('underline')
    })
    document.querySelector(`${selectedView}`).classList.add('underline')
  }, [selectedView, selectedOption])

  const changeTab = (val, handle) => {
    if (handle === '') {
      setSelectView(`div.project-box#${val}`)
    } else {
      setSelectView(`a.links[href="${val}"] p`)
    }
  }

  return (

    <div className="App">

      < Menu
        changeTab={changeTab}
      />

      < ProjectsMenu
        changeTab={changeTab}
      />

      {selectedOption === 'AddTask' ? (

        <AddTask
          setSelectedOption={setSelectedOption}
        />

      ) : (

        <AddProject
          setSelectedOption={setSelectedOption}
        />
      )}

      <div id="main-container">

        <Outlet />

      </div>
    </div>
  );
}

export default App;
