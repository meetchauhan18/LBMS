import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/homePage';
import FormPage from './pages/formPage';

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
