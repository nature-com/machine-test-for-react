import EmployeeList from '../pages/Employee/EmployeeList.jsx';
import EditEmployee from "../pages/Employee/EditEmployee.jsx";

const allRoutes = [

  {
    path: '/employee',
    element: <EmployeeList />,
  },
  {
    path: '/edit-employee',
    element: <EditEmployee />,
  },

  {
    path: '*',
    element: 'Outside page not found',
  },
];
export default allRoutes;