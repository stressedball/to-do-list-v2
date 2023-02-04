import './index.css';
import App from './App';
import AllTasks from './components/Outlet/AllTasks';
import WeekTasks from './components/Outlet/WeekTasks';
import ImportantTasks from './components/Outlet/ImportantTasks';
import DoneTasks from './components/Outlet/DoneTasks';
import Project from './components/Outlet/Project';
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

function Root() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
      />,
      children: [
        {
          path: "/",
          element: <AllTasks
          />
        },
        {
          path: "/week-tasks",
          element: <WeekTasks
          />
        },
        {
          path: "/important-tasks",
          element: <ImportantTasks
          />
        },
        {
          path: "/done-tasks",
          element: <DoneTasks
          />
        },
        {
          path: "/project/:id",
          element: <Project
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