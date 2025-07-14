import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';
import AdminNavigation from '../../../layouts/headers/AdminNavigation';
import Wrapper from '../../../common/Wrapper';
import HeaderDashboard from '../../../layouts/headers/HeaderDashboard';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  plan: string;
  joinDate: string;
  lastLogin: string;
  totalSpent: number;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  // Mock user data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      plan: 'PRO',
      joinDate: '2024-01-15',
      lastLogin: '2025-01-10',
      totalSpent: 299.99
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      plan: 'LITE',
      joinDate: '2024-03-20',
      lastLogin: '2025-01-09',
      totalSpent: 89.99
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'inactive',
      plan: 'PRO',
      joinDate: '2024-02-10',
      lastLogin: '2024-12-15',
      totalSpent: 599.99
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      status: 'pending',
      plan: 'ENTERPRISE',
      joinDate: '2025-01-05',
      lastLogin: 'Never',
      totalSpent: 0
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    return matchesSearch && matchesStatus  && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { class: 'bg-success', text: 'Active' },
      inactive: { class: 'bg-danger', text: 'Inactive' },
      pending: { class: 'bg-warning', text: 'Pending' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      LITE: { class: 'bg-secondary', text: 'LITE' },
      PRO: { class: 'bg-primary', text: 'PRO' },
      ENTERPRISE: { class: 'bg-warning', text: 'ENTERPRISE' }
    };
    const config = planConfig[plan as keyof typeof planConfig];
    return (
      <span className={`badge ${config.class} text-white`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark">
          {/* <HeaderDashboard /> */}
          <br></br>
          <br></br>
          <br></br>
          <AdminNavigation />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading users...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>User & Plan Management - Admin Dashboard - N0de</title>
        <meta name="description" content="Manage users and accounts in the admin dashboard" />
      </Helmet>
      <br></br>
          <br></br>
          <br></br>
          <AdminNavigation />
      {/* Page Header */}
      <div className="section-space-md-top pb-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">User & Plan Management</span>
                </div>
                <h1 className="text-light mb-2" data-cue="fadeIn">
                  Manage <span className="text-gradient-primary">Users & Plans</span>
                </h1>
                <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                  View and manage all user accounts and plans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

          {/* Search and Filters */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-light border-opacity-25 text-light">
                      <Icon name="Search" size={16} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select bg-dark border-light border-opacity-25 text-light"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                  {/* Plan Filter (reduced width) */}
              <div className="col-md-3">
                <select
                  className="form-select bg-dark border-light border-opacity-25 text-light"
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                >
                  <option value="all">Plan</option>
                  <option value="LITE">LITE</option>
                  <option value="PRO">PRO</option>
                  <option value="ENTERPRISE">ENT.</option>
                </select>
              </div>
                {/* <div className="col-md-3">
                  <Link
                    to="/admin/user-management/add-user"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  >
                    <Icon name="Plus" size={16} className="me-2" />
                    Add New User
                  </Link>
                </div> */}
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4">
                    <div className="table-responsive">
                      <table className="table table-dark table-striped table-hover mb-0">
                        <thead>
                          <tr>
                            <th className="text-light fw-medium">User</th>
                            <th className="text-light fw-medium">Status</th>
                            <th className="text-light fw-medium">Plan</th>
                            <th className="text-light fw-medium">Join Date</th>
                            {/* <th className="text-light fw-medium">Last Login</th> */}
                            <th className="text-light fw-medium">Total Spent</th>
                            <th className="text-light fw-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <Icon name="User" size={16} className="text-primary" />
                                  </div>
                                  <div>
                                    <div className="text-light fw-medium">{user.name}</div>
                                    <div className="text-light text-opacity-75 small">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td>{getStatusBadge(user.status)}</td>
                              <td>{getPlanBadge(user.plan)}</td>
                              <td className="text-light text-opacity-75">{user.joinDate}</td>
                              {/* <td className="text-light text-opacity-75">{user.lastLogin}</td> */}
                              <td className="text-light fw-medium">${user.totalSpent.toFixed(2)}</td>
                              <td>
                              <div className="d-flex align-items-center gap-2">
  {/* Edit User Button */}
  {/* <Link
    to={`/admin/user-management/edit-user/${user.id}`}
    className="btn btn-sm btn-outline-light text-light text-opacity-75 hover:text-light"
    title="Edit User"
  >
    <Icon name="Edit" size={14} />
  </Link> */}

  {/* Cancel Subscription Button */}
  <button
    className="btn btn-sm btn-outline-warning text-warning hover:text-warning"
    title="Cancel Subscription"
  >
    <Icon name="XCircle" size={14} />
  </button>

  {/* Change Plan Button */}
  <button
    className="btn btn-sm btn-outline-primary text-primary hover:text-primary"
    title="Change Plan"
  >
    <Icon name="RefreshCw" size={14} />
  </button>

  {/* Delete User Button */}
  {/* <button
    className="btn btn-sm btn-outline-danger text-danger hover:text-danger"
    title="Delete User"
  >
    <Icon name="Trash2" size={14} />
  </button> */}
</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="section-space-sm-y">
            {/* <div className="container">
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-light fw-bold fs-2 mb-2">{users.length}</div>
                    <div className="text-light text-opacity-75">Total Users</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-success fw-bold fs-2 mb-2">{users.filter(u => u.status === 'active').length}</div>
                    <div className="text-light text-opacity-75">Active Users</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-warning fw-bold fs-2 mb-2">{users.filter(u => u.status === 'pending').length}</div>
                    <div className="text-light text-opacity-75">Pending Users</div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-4 text-center">
                    <div className="text-danger fw-bold fs-2 mb-2">{users.filter(u => u.status === 'inactive').length}</div>
                    <div className="text-light text-opacity-75">Inactive Users</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
    </>
  );
};

export default UserManagement; 