import { Outlet } from 'react-router-dom';
import HeaderDashboard from './headers/HeaderDashboard';
import Wrapper from '../common/Wrapper';

const AdminLayout = () => {
  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default AdminLayout; 