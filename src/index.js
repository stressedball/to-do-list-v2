import './index.css';
import App from './App';
import AllTasks from './components/AllTasks';
import WeekTasks from './components/WeekTasks';
import ImportantTasks from './components/ImportantTasks';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import uniqid from 'uniqid'

function Root() {
  const [rootTasks, setRootTasks] = useState(getLocal())
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  const addTask = (task) => {
    task.id = uniqid()
    localStorage.setItem(uniqid(), JSON.stringify(task))
    setRootTasks(getLocal())
  }

  const handleEditWrite = (id, value) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const task = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if (task.id === id) {
        const copyTask = task
        copyTask.title = value
        localStorage.setItem(key, JSON.stringify(copyTask))
        setRootTasks(getLocal())
        return
      }
    }
  }

  const handleImportantWrite = (id) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const task = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if (task.id === id) {
        const copyTask = task
        copyTask.important = task.important === "" ? "important" : ""
        localStorage.setItem(key, JSON.stringify(copyTask))
        setRootTasks(getLocal())
        break
      }
    }
  }

  useEffect(() => {

    setTasks(rootTasks)
  }, [rootTasks])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
        addTask={addTask}
      />,
      children: [
        {
          path: "/all-tasks",
          element: <AllTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
          />
        },
        {
          path: "/week-tasks",
          element: <WeekTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
          />
        },
        {
          path: "/important-tasks",
          element: <ImportantTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
          />
        },
        {
          path: ":project"
        }
        // add a finished tasks
      ]
    }
  ]);

  return (
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

function getLocal() {
  let arr = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = JSON.parse(localStorage.getItem(key))
    arr.push(value)
  }
  return arr
}


