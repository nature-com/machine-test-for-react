import { lazy, Suspense } from 'react';

const EmployeeList = lazy(() => import('../pages/Employee/EmployeeList.jsx'));
const EditEmployee = lazy(() => import('../pages/Employee/EditEmployee.jsx'));

const Loading = () => <div className='text-center'>Loading...</div>;

const allRoutes = [

  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <EmployeeList />
      </Suspense>
    ),
  },
  {
    path: '/edit-employee',
    element: (
      <Suspense fallback={<Loading />}>
        <EditEmployee />
      </Suspense>
    ),
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;