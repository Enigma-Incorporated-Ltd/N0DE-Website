import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from './headers/HeaderDashboard';
import AdminNavigation from './headers/AdminNavigation';
import Wrapper from '../common/Wrapper';

const AdminLayout = () => {
  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        {/* <AdminNavigation /> */}
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default AdminLayout; 