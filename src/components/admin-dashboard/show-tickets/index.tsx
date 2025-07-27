import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Wrapper from '../../../common/Wrapper';
import Icon from '../../../components/AppIcon';
import NodeService from '../../../services/Node';

interface Ticket {
  ticketId: number;
  userId: string;
  username: string;
  title: string;
  description: string;
}


const ShowTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTicketId, setFilterTicketId] = useState('');

  useEffect(() => {
    setLoading(true);
    NodeService.getAllTickets().then(result => {
      if (result && Array.isArray(result.ticketdetails)) {
        setTickets(result.ticketdetails.map((t: any) => ({
          ticketId: t.ticketId,
          userId: t.userId,
          username: t.username || t.name || '',
          title: t.title,
          description: t.description
        })));
      } else {
        setTickets([]);
      }
      setLoading(false);
    });
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toString().includes(searchTerm);
    const matchesTitle = filterTitle === '' || ticket.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesTicketId = filterTicketId === '' || ticket.ticketId.toString().includes(filterTicketId);
    return matchesSearch && matchesTitle && matchesTicketId;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  const pagedTickets = filteredTickets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return (
      <Wrapper>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#181A20',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-light">Loading tickets...</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
      <Helmet>
        <title>Show Tickets - Admin Dashboard - N0de</title>
        <meta name="description" content="View and manage support tickets in the admin dashboard" />
      </Helmet>
      <Wrapper>
        <div className="bg-dark min-vh-100">
          {/* Page Header */}
          <div className="pt-3 pb-1">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Show Tickets</span>
                    </div>
                    <h1 className="text-light mb-2" data-cue="fadeIn">
                      Manage <span className="text-gradient-primary">Tickets</span>
                    </h1>
                    <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                      View and manage all support tickets
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Search and Filters */}
          <div className="mb-3">
            <div className="container">
              <div className="bg-dark-gradient border border-light border-opacity-10 rounded-4 p-3">
                <div className="row g-3 align-items-end">
                  <div className="col-lg-4 col-12">
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
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <label className="form-label text-light small mb-1">Title</label>
                    <input
                      type="text"
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholder="Filter by title..."
                      value={filterTitle}
                      onChange={e => setFilterTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-2 col-6">
                    <label className="form-label text-light small mb-1">Ticket ID</label>
                    <input
                      type="text"
                      className="form-control bg-dark border-light border-opacity-25 text-light"
                      placeholder="Filter by ticket ID..."
                      value={filterTicketId}
                      onChange={e => setFilterTicketId(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Tickets Table */}
          <div className="mt-2">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4">
                    <div className="table-responsive">
                      <table className="table table-dark table-striped table-hover mb-0" style={{ tableLayout: 'fixed' }}>
                        <thead>
                          <tr>
                            <th className="text-light fw-medium" style={{ width: '12%' }}>Ticket ID</th>
                            <th className="text-light fw-medium" style={{ width: '16%' }}>Name</th>
                            <th className="text-light fw-medium" style={{ width: '22%' }}>Title</th>
                            <th className="text-light fw-medium" style={{ width: '50%' }}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedTickets.map((ticket) => (
                            <tr key={ticket.ticketId}>
                              <td style={{ width: '12%' }}>
                                <div className="d-flex align-items-center">
                                  <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '2rem', height: '2rem' }}>
                                    <Icon name="Ticket" size={14} className="text-primary" />
                                  </div>
                                  <span>{ticket.ticketId}</span>
                                </div>
                              </td>
                              <td style={{ width: '16%', wordWrap: 'break-word' }}>{ticket.username}</td>
                              <td style={{ width: '22%', wordWrap: 'break-word' }}>{ticket.title}</td>
                              <td style={{ width: '50%', wordWrap: 'break-word' }} title={ticket.description}>
                                {ticket.description.length > 80
                                  ? ticket.description.slice(0, 80) + '...'
                                  : ticket.description}
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
            {/* Pagination - always show at least page 1 */}
            <div className="d-flex justify-content-center align-items-center py-4" style={{ background: 'transparent' }}>
              <nav aria-label="Tickets pagination">
                <ul className="pagination mb-0 justify-content-center" style={{ background: 'transparent', gap: '0.75rem', border: 'none' }}>
                  {/* PREV button, only show if not on first page */}
                  {currentPage > 1 && (
                    <li>
                      <button
                        className="fw-bold prev-next-btn"
                        style={{
                          minWidth: '3.2rem',
                          height: '2rem',
                          borderRadius: '1.2rem',
                          border: '2px solid #fff',
                          background: 'transparent',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.2s, color 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          textAlign: 'center',
                          letterSpacing: '-1px',
                        }}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        PREV
                      </button>
                    </li>
                  )}
                  {/* Page numbers with ellipsis logic */}
                  {(() => {
                    const pages = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      if (currentPage <= 4) {
                        pages.push(1, 2, 3, 4, 5, '...', totalPages);
                      } else if (currentPage >= totalPages - 3) {
                        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                      } else {
                        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                      }
                    }
                    return pages.map((page, idx) => {
                      if (page === '...') {
                        return (
                          <li key={"ellipsis-" + idx} style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: '#fff', fontSize: '1.1rem', padding: '0 0.3rem' }}>...</li>
                        );
                      }
                      return (
                        <li key={page}>
                          <button
                            className={
                              currentPage === page
                                ? "fw-bold active-page-btn"
                                : "page-btn"
                            }
                            style={{
                              width: '2rem',
                              height: '2rem',
                              borderRadius: '50%',
                              border: currentPage === page ? '2px solid #A3D34B' : '2px solid #fff',
                              background: 'transparent',
                              color: currentPage === page ? '#A3D34B' : '#fff',
                              fontWeight: currentPage === page ? 700 : 400,
                              fontSize: '1rem',
                              outline: 'none',
                              cursor: 'pointer',
                              transition: 'background 0.2s, color 0.2s',
                            }}
                            onClick={() => setCurrentPage(page as number)}
                            disabled={currentPage === page}
                          >
                            {page}
                          </button>
                        </li>
                      );
                    });
                  })()}
                  {/* NEXT button, only show if not on last page */}
                  {currentPage < totalPages && (
                    <li>
                      <button
                        className="fw-bold prev-next-btn"
                        style={{
                          minWidth: '3.2rem',
                          height: '2rem',
                          borderRadius: '1.2rem',
                          border: '2px solid #fff',
                          background: 'transparent',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          outline: 'none',
                          cursor: 'pointer',
                          transition: 'background 0.2s, color 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          textAlign: 'center',
                          letterSpacing: '-1px',
                        }}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        NEXT
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
            <style>{`
              .prev-next-btn:hover {
                background: #A3D34B !important;
                color: #222 !important;
                border-color: #A3D34B !important;
              }
              .active-page-btn {
                border: 2px solid #A3D34B !important;
                color: #A3D34B !important;
                background: transparent !important;
              }
              .page-btn {
                border: 2px solid #fff !important;
                color: #fff !important;
                background: transparent !important;
              }
            `}</style>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ShowTickets; 