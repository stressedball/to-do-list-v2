import SideBar from "./components/Sidebar/SideBar";
import AddTask from "./components/Task-management/AddTask";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AddProject from "./components/Project-Management/AddProject";
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {

  const location = useLocation()
  const [selectedOption, setSelectedOption] = useState('AddTask');
  const [selectedView, setSelectView] = useState('/')
  
  useEffect(() => {

    document.querySelectorAll('.underline').forEach(el => {
      el.classList.remove('underline')
    })
    console.log('location',location)
    // console.log(selectedView)
    // document.querySelector(`a[href="${selectedView}"]`).classList.add('underline')
  }, [selectedView])

  const changeTab = (val) => {
    setSelectView(val)
  }

  return (

    <div className="App">

      <Provider store={store}>

        < SideBar 
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

          <Outlet
            path={`${selectedView}`}
          />
        </div>

      </Provider>

    </div>
  );
}

export default App;
