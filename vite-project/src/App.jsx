// import { Suspense, lazy } from 'react';
// import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// import SuspenseLoader from './components/common/SuspenseLoader.jsx';
// import DataProvider from './context/DataProvider.jsx';
// import Login from './Login.jsx';
// import Signup from './Signup.jsx';
// const ErrorComponent = lazy(() => import('./components/common/ErrorComponent.jsx'));

// const router = createBrowserRouter(
//   createRoutesFromElements(
    <Route>
      {/* Uncomment and adjust these routes as needed */}
      {/* <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />} >
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} /> */}
      <Route path='/' element={<Navigate to="/Login" />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
    </Route>
//   )
// );

// function App() {
//   return (
//     <Suspense fallback={<SuspenseLoader />}>
//       <DataProvider>
//         <RouterProvider router={router} />
//       </DataProvider>
//     </Suspense>
//   );
// }

// export default App;
import { Suspense, lazy } from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx'; // Ensure this path matches where your Login component is located
import Signup from './components/Signup.jsx'; // Ensure this path matches where your Signup component is located
const ErrorComponent = lazy(() => import('./components/common/ErrorComponent.jsx'));
import SuspenseLoader from "./components/common/SuspenseLoader.jsx";
import DataProvider from "./components/context/DataProvider.jsx";
import routes from "./routes/routes.jsx";
import "./App.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Navigate to="/Login" />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      <Route path={routes.main.path} element={<routes.main.element />} >
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Suspense>
  );
}

export default App;

