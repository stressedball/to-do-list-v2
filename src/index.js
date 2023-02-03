import './index.css';
import App from './App';
import AllTasks from './components/AllTasks';
import WeekTasks from './components/WeekTasks';
import ImportantTasks from './components/ImportantTasks';
import DoneTasks from './components/DoneTasks';
import Project from './components/Project';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import uniqid from 'uniqid'

// Have to manage props at top of App
// Makes passing props to components tedious
// Will get to Redux after this project
function Root() {
  // setting props based on localStorage
  // updating props here
  const [rootTasks, setRootTasks] = useState(getLocalTasks())
  const [rootProjects, setRootProjects] = useState(getLocalProjects())
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  // setting and managing writes to localStorage for TASKS
  const addTask = (task) => {
    localStorage.setItem(uniqid(), JSON.stringify(task))
    setRootTasks(getLocalTasks())
  }

  const removeObject = (id) => {
    localStorage.removeItem(id)
  }

  const handleEditWrite = (id, value) => {
    let { object, key } = getObjectById(id)
    object.title = value
    localStorage.setItem(key, JSON.stringify(object))
    setRootTasks(getLocalTasks())
  }

  const handleImportantWrite = (id) => {
    let { object, key } = getObjectById(id)
    object.important = object.important === "" ? "important" : ""
    localStorage.setItem(key, JSON.stringify(object))
    setRootTasks(getLocalTasks())
  }

  const handleDueDateWrite = (date, id) => {
    let { object, key } = getObjectById(id)
    object.dueDate = date
    localStorage.setItem(key, JSON.stringify(object))
    setRootTasks(getLocalTasks())
  }

  const handleDoneWrite = (id, isChecked) => {
    let { object, key } = getObjectById(id)
    object.done = isChecked
    localStorage.setItem(key, JSON.stringify(object))
    setRootTasks(getLocalTasks())
  }

  // setting and managing writes to localStorage for PROJECTS
  const addProject = (project) => {
    project.tasks = []
    localStorage.setItem(uniqid(), JSON.stringify(project))
    setRootProjects(getLocalProjects())
  }

  const handleEditProjectWrite = (id) => {

  }

  const handleRemoveProject = (id) => {

  }

  const handleAppendTaskWrite = (taskId, projectId) => {
    let taskKey = getObjectById(taskId).key
    let { object, key } = getObjectById(projectId)
    if (object.tasks.filter(el => el === taskId).length > 0) return
    object.tasks.push(taskKey)
    localStorage.setItem(key, JSON.stringify(object));
    setRootProjects(getLocalProjects())
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
        handleAppendTaskWrite={handleAppendTaskWrite}
        removeObject={removeObject}
      />,
      children: [
        {
          path: "/all-tasks",
          element: <AllTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
            handleDueDateWrite={handleDueDateWrite}
            handleDoneWrite={handleDoneWrite}
            handleAppendTaskWrite={handleAppendTaskWrite}
            removeTask={removeObject}
          />
        },
        {
          path: "/week-tasks",
          element: <WeekTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
            handleDueDateWrite={handleDueDateWrite}
            handleDoneWrite={handleDoneWrite}
            handleAppendTaskWrite={handleAppendTaskWrite}
            removeTask={removeObject}
          />
        },
        {
          path: "/important-tasks",
          element: <ImportantTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleDueDateWrite={handleDueDateWrite}
            handleImportantWrite={handleImportantWrite}
            handleAppendTaskWrite={handleAppendTaskWrite}
            handleDoneWrite={handleDoneWrite}
            removeTask={removeObject}
          />
        },
        {
          path: "/done-tasks",
          element: <DoneTasks
            tasks={tasks}
            handleEditWrite={handleEditWrite}
            handleImportantWrite={handleImportantWrite}
            handleDueDateWrite={handleDueDateWrite}
            handleDoneWrite={handleDoneWrite}
            handleAppendTaskWrite={handleAppendTaskWrite}
            removeTask={removeObject}
          />
        },
        {
          path: "/:project",
          element: <Project projects={projects}
            handleEditWrite={handleEditWrite}
            handleDueDateWrite={handleDueDateWrite}
            handleImportantWrite={handleImportantWrite}
            handleAppendTaskWrite={handleAppendTaskWrite}
            handleDoneWrite={handleDoneWrite}
            removeProject={removeObject}
          />
        }
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

function getLocalTasks() {
  let arr = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = JSON.parse(localStorage.getItem(key))
    if (!value.tasks) {
      value.id = key
      arr.push(value)
    }
  }
  return arr
}

function getLocalProjects() {
  let arr = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = JSON.parse(localStorage.getItem(key))
    if (value.tasks) {
      value.id = key
      arr.push(value)
    }
  }
  return arr
}


const getObjectById = id => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key === id) {
      let object = JSON.parse(localStorage.getItem(key))
      return { object, key }
    }
  }
}