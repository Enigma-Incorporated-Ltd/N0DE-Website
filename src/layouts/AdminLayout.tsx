import { Outlet } from 'react-router-dom';
import HeaderDashboard from './headers/HeaderDashboard';
import AdminNavigation from './headers/AdminNavigation';
import Wrapper from '../common/Wrapper';

const AdminLayout = () => {
  return (
    <Wrapper>
      <div className="bg-dark min-vh-100">
        <HeaderDashboard />
        <AdminNavigation />
        <div style={{ paddingTop: '20px' }}>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminLayout; 