import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../../components/AppIcon';
import AdminNavigation from '../../../layouts/headers/AdminNavigation';
import Wrapper from '../../../common/Wrapper';
import HeaderDashboard from '../../../layouts/headers/HeaderDashboard';
import NodeService from '../../../services/Node';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../components/ui/Button';

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  joinDate: string;
  lastLogin: string;
  totalSpent: number;
  billingCycle: string;
  subscriptionCancellationDate: string | null;
  planId: number;
}

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, loading, userEmail }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; loading: boolean; userEmail: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-80 backdrop-blur" style={{ zIndex: 1050 }}>
      <div className="bg-dark bg-opacity-50 border border-light border-opacity-10 rounded-4 shadow w-100 mh-80 d-flex flex-column backdrop-blur" style={{ maxWidth: '28rem' }}>
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-light border-opacity-10">
          <h2 className="fs-5 fw-semibold text-light mb-0">Cancel Subscription</h2>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <div className="text-light-50">
            <p className="mb-3 lh-base">Are you sure you want to cancel the subscription for <span className="fw-bold text-light">{userEmail}</span>?</p>
            <p className="mb-0 text-warning small">This action cannot be undone.</p>
          </div>
        </div>
        <div className="p-4 border-top border-light border-opacity-10 d-flex justify-content-end gap-2">
          <Button variant="ghost" onClick={onClose} disabled={loading}>No, Keep Subscription</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>Yes, Cancel</Button>
        </div>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, message }: { isOpen: boolean; onClose: () => void; message: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-80 backdrop-blur" style={{ zIndex: 1050 }}>
      <div className="bg-dark bg-opacity-50 border border-light border-opacity-10 rounded-4 shadow w-100 mh-80 d-flex flex-column backdrop-blur" style={{ maxWidth: '28rem' }}>
        <div className="d-flex align-items-center justify-content-between p-4 border-bottom border-light border-opacity-10">
          <h2 className="fs-5 fw-semibold text-light mb-0">Subscription Cancelled</h2>
        </div>
        <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
          <div className="text-success lh-base">{message}</div>
        </div>
        <div className="p-4 border-top border-light border-opacity-10 d-flex justify-content-end">
          <Button variant="primary" onClick={onClose}>OK</Button>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [cancelLoading, setCancelLoading] = useState(false);
  // Add join date and cancellation date filter states
  const [filterJoinDate, setFilterJoinDate] = useState<Date | null>(null);
  const [filterCancelDate, setFilterCancelDate] = useState<Date | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; userId: string | null; planId: number | null; userEmail: string }>({ open: false, userId: null, planId: null, userEmail: '' });
  const [successModal, setSuccessModal] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  useEffect(() => {
    setLoading(true);
    NodeService.getAllUserPlans().then(result => {
      if (result && Array.isArray(result.userPlans)) {
        setUsers(result.userPlans.map((u: any) => ({
          id: u.userId,
          name: u.name,
          email: u.email,
          status: u.status.toLowerCase(),
          plan: u.plan,
          joinDate: u.joinDate,
          lastLogin: '', // Not provided
          totalSpent: u.totalSpent,
          billingCycle: u.billingCycle,
          subscriptionCancellationDate: u.subscriptionCancellationDate,
          planId: u.planId, // Assuming planId is part of the user object
        })));
      } else {
        setUsers([]);
      }
      setLoading(false);
    });
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    // Add join date and cancellation date filtering using Date objects
    const matchesJoinDate = !filterJoinDate || (user.joinDate && new Date(user.joinDate).toDateString() === filterJoinDate.toDateString());
    const matchesCancelDate = !filterCancelDate || (user.subscriptionCancellationDate && new Date(user.subscriptionCancellationDate).toDateString() === filterCancelDate.toDateString());
    return matchesSearch && matchesStatus  && matchesPlan && matchesJoinDate && matchesCancelDate;
  });

  const getStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase();
    const statusConfig: Record<string, { class: string; text: string }> = {
      active: { class: 'bg-success', text: 'Active' },
      inactive: { class: 'bg-danger', text: 'Inactive' },
      pending: { class: 'bg-warning', text: 'Pending' },
      cancelled: { class: 'bg-warning', text: 'Canceled' }, 
    };
    const config = statusConfig[normalized] || { class: 'bg-secondary', text: status || 'Unknown' };
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

  const refreshUsers = async () => {
    setLoading(true);
    const result = await NodeService.getAllUserPlans();
    if (result && Array.isArray(result.userPlans)) {
      setUsers(result.userPlans.map((u: any) => ({
        id: u.userId,
        name: u.name,
        email: u.email,
        status: u.status.toLowerCase(),
        plan: u.plan,
        joinDate: u.joinDate,
        lastLogin: '',
        totalSpent: u.totalSpent,
        billingCycle: u.billingCycle,
        subscriptionCancellationDate: u.subscriptionCancellationDate,
        planId: u.planId,
      })));
    } else {
      setUsers([]);
    }
    setLoading(false);
  };

  const handleCancelSubscription = async (userId: string, planId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) {
      setSuccessModal({ open: true, message: 'User not found for cancellation.' });
      return;
    }
    setConfirmModal({ open: true, userId, planId, userEmail: user.email });
  };

  const confirmCancelSubscription = async () => {
    if (!confirmModal.userId || !confirmModal.planId) return;
    setCancelLoading(true);
    try {
      const result = await NodeService.cancelSubscription(confirmModal.userId, confirmModal.planId);
      if (result) {
        setSuccessModal({ open: true, message: 'Subscription cancelled successfully for ' + confirmModal.userEmail });
        setConfirmModal({ open: false, userId: null, planId: null, userEmail: '' });
        await refreshUsers();
      } else {
        setSuccessModal({ open: true, message: 'Failed to cancel subscription.' });
      }
    } catch (error) {
      setSuccessModal({ open: true, message: 'Error cancelling subscription.' });
    }
    setCancelLoading(false);
  };

  if (loading) {
    return (
      <Wrapper>
        {/*
        <div className="bg-dark">
          // <HeaderDashboard />
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
        */}
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-light">Loading users...</p>
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

      <Wrapper>
        <div className="bg-dark min-vh-100">
          <HeaderDashboard />
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
              <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-3 mb-4">
                <div className="row g-3 align-items-end">
                  <div className="col-lg-3 col-12">
                    <label className="form-label text-light small mb-1 d-flex align-items-center gap-2">
                      <Icon name="Filter" size={16} className="text-primary" />
                      Filters
                    </label>
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
                  <div className="col-lg-2 col-6">
                    <label className="form-label text-light small mb-1">Status</label>
                    <select
                      className="form-select bg-dark border-light border-opacity-25 text-light"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All-Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-6">
                    <label className="form-label text-light small mb-1">Plan</label>
                    <select
                      className="form-select bg-dark border-light border-opacity-25 text-light"
                      value={filterPlan}
                      onChange={(e) => setFilterPlan(e.target.value)}
                    >
                      <option value="all">All-Plan</option>
                      <option value="LITE">LITE</option>
                      <option value="PRO">PRO</option>
                      <option value="ENTERPRISE">ENT</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-6">
                    <label className="form-label text-light small mb-1">Join Date</label>
                    <DatePicker
                      selected={filterJoinDate}
                      onChange={date => setFilterJoinDate(date)}
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholderText="Join Date"
                      dateFormat="yyyy-MM-dd"
                      isClearable
                    />
                  </div>
                  <div className="col-lg-3 col-6">
                    <label className="form-label text-light small mb-1">Cancellation Date</label>
                    <DatePicker
                      selected={filterCancelDate}
                      onChange={date => setFilterCancelDate(date)}
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholderText="Cancellation Date"
                      dateFormat="yyyy-MM-dd"
                      isClearable
                    />
                  </div>
                </div>
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
                            <th className="text-light fw-medium">Billing Cycle</th>
                            <th className="text-light fw-medium">Cancellation Date</th>
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
                              <td className="text-light text-opacity-75">
                                {user.billingCycle ? user.billingCycle.charAt(0).toUpperCase() + user.billingCycle.slice(1) : '-'}
                              </td>
                              <td className="text-light text-opacity-75">
                                {user.subscriptionCancellationDate ? user.subscriptionCancellationDate.split('T')[0] : '-'}
                              </td>
                              {/* <td className="text-light text-opacity-75">{user.lastLogin}</td> */}
                              <td className="text-light fw-medium">
                                {user.status?.toUpperCase() === 'PENDING' ? 'N/A' : `$${user.totalSpent.toFixed(2)}`}
                              </td>
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
    className={`btn btn-sm ${user.status === 'cancelled' ? 'btn-outline-secondary text-secondary border-secondary' : 'btn-outline-danger text-danger'}`}
    title="Cancel Subscription"
    onClick={user.status === 'cancelled' ? () => setSuccessModal({ open: true, message: 'This subscription is already cancelled.' }) : () => handleCancelSubscription(user.id, user.planId)}
    disabled={user.status === 'cancelled' || user.status?.toUpperCase() === 'PENDING'}
    style={user.status === 'cancelled' || user.status?.toUpperCase() === 'PENDING' ? { background: '#444', borderColor: '#888', color: '#aaa', opacity: 1, cursor: 'not-allowed' } : {}}
  >
    <Icon name="XCircle" size={14} className={user.status === 'cancelled' ? 'text-secondary' : 'text-danger'} />
  </button>

  {/* Change Plan Button */}
 {/*<button
    className="btn btn-sm btn-outline-primary text-primary hover:text-primary"
    title="Change Plan"
  >
    <Icon name="RefreshCw" size={14} />
  </button>
*/}

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
      <ConfirmationModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, userId: null, planId: null, userEmail: '' })}
        onConfirm={confirmCancelSubscription}
        loading={cancelLoading}
        userEmail={confirmModal.userEmail}
      />
      <SuccessModal
        isOpen={successModal.open}
        onClose={() => setSuccessModal({ open: false, message: '' })}
        message={successModal.message}
      />
        </div>
      </Wrapper>
    </>
  );
};

export default UserManagement;