import { Outlet } from 'react-router-dom';
import HeaderDashboard from './headers/HeaderDashboard';
import AdminNavigation from './headers/AdminNavigation';
import Wrapper from '../common/Wrapper';
import FooterOne from './footers/FooterOne';

const AdminLayout = () => {
  return (
    <Wrapper>
      <div className="bg-dark min-vh-100">
        <HeaderDashboard />
        <AdminNavigation />
        <div style={{ paddingTop: '20px', minHeight: 'calc(100vh - 200px)' }}>
          <Outlet />
        </div>
        <FooterOne />
      </div>
    </Wrapper>
  );
};

export default AdminLayout;