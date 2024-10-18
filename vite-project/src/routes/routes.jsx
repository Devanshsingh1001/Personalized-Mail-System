import { lazy } from 'react';

const Main = lazy(() => import('../pages/Main'));
const Emails = lazy(() => import('../components/Emails'));
const ViewEmail = lazy(() => import('../components/ViewEmail'));

const routes = {
    main: {
        path: '/',
        element: Main
    },
    emails: {
        path: '/emails',
        element: Emails
    },
    invalid: {
        path: '/*',
        element: Emails
    },
    view: {
        path: '/view',
        element: ViewEmail
    }
}

export default routes ;



// import Emails from "./components/Emails.jsx";
// import ViewEmail from "./components/ViewEmail.jsx";
//  const routes = {
//             main: {
//                 path: '/',
//                 element: Main
//             },
//             emails: {
//                 path: '/emails',
//                 element: Emails
//             },
//             invalid: {
//                 path: '/*',
//                 element: Emails
//             },
//             view: {
//                 path: '/view',
//                 element: ViewEmail
//             }
    
// };
// export default routes;
