import Menu from "./components/Menu";
import AddTask from "./components/AddTask";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProject from "./components/AddProject";
import { Provider } from 'react-redux';
import { store } from './redux';
import ProjectsMenu from "./components/ProjectsMenu";
import uniqid from 'uniqid'
import { useSelector } from 'react-redux';
import ProjectMaker from "./components/ProjectMaker";
import { useNavigate } from "react-router-dom";

function App() {

  const location = useLocation()
  const [selectedOption, setSelectedOption] = useState('AddTask');
  const [selectedView, setSelectView] = useState('/all_tasks')
  const items = useSelector(state => state.items);
  const navigate = useNavigate();
  const projects = items.filter(el => el[1].tasks !== undefined)

  useEffect(() => {

    document.querySelectorAll('.underline').forEach(el => {
      el.classList.remove('underline')
    })
    console.log(selectedView)
    document.querySelector(`${selectedView}`).classList.add('underline')
  })

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
