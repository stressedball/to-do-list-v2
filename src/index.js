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
  const [rootProjects, setRootProjects] = useState(getLocalProjects())
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  const addTask = (task) => {
    task.id = uniqid()
    localStorage.setItem(uniqid(), JSON.stringify(task))
    setRootTasks(getLocal())
  }

  const addProject = (project) => {
    project.id = uniqid()
    localStorage.setItem(`${project.id}, project`, JSON.stringify(project))
    setRootProjects(getLocalProjects())
  }

  const handleEditWrite = (id, value) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const task = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if (task.id === id) {
        task.title = value
        localStorage.setItem(key, JSON.stringify(task))
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
        task.important = task.important === "" ? "important" : ""
        localStorage.setItem(key, JSON.stringify(task))
        setRootTasks(getLocal())
        break
      }
    }
  }

  const handleDueDateWrite = (date, id) => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const task = JSON.parse(localStorage.getItem(localStorage.key(i)))
      if (task.id === id) {
        task.dueDate = date
        localStorage.setItem(key, JSON.stringify(task))
        setRootTasks(getLocal())
        break
      }
    }
  }

  useEffect(() => {
    setTasks(rootTasks)
    setProjects(rootProjects)
  }, [rootTasks, rootProjects])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
        addTask={addTask}
        tasks={tasks}
        addProject={addProject}
        projects={projects}
      />,
      children: [
        {
          path: "/all-tasks",
          element: <AllTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
            handleDueDateWrite={handleDueDateWrite}
          />
        },
        {
          path: "/week-tasks",
          element: <WeekTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
            handleDueDateWrite={handleDueDateWrite}
            />
        },
        {
          path: "/important-tasks",
          element: <ImportantTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleDueDateWrite={handleDueDateWrite}
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
    if (key.split(',').length <= 1) {
      const value = JSON.parse(localStorage.getItem(key))
      arr.push(value)
    }
  }
  return arr
}

function getLocalProjects() {
  let arr = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.split(',').length > 1) {
      const value = JSON.parse(localStorage.getItem(key))
      arr.push(value)
    }
  }
  return arr
}


