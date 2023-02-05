import './index.css';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Menu from './components/Menu';
import { Provider } from 'react-redux';
import { store } from './redux';
import TasksOutlet from './components/Outlet';

function Root() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App
      />,
      children: [
        {
          path: "/all-tasks",
          element: <TasksOutlet />
        },
        {
          path: "/week-tasks",
          element: <TasksOutlet />
        },
        {
          path: "/important-tasks",
          element: <TasksOutlet />
        },
        {
          path: "/done-tasks",
          element: <TasksOutlet />
        },
        {
          path: "/:id",
          element: <TasksOutlet />
        }
      ]
    }
  ]);

  return (
    <Provider store={store}>

      <RouterProvider router={router}>
        <Root />
      </RouterProvider>

    </Provider>

  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);