import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/homePage';
import FormPage from './pages/FormPage';
import EditFormPage from './pages/EditFormPage';

const browserRouter = createBrowserRouter([
  {
    element: <MainLayout />, 
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/form',
        element: <FormPage />,
      },
      {
        path: '/edit/:id',
        element: <EditFormPage />,
      }
    ],
  },
  {}
]);


function App() {

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
