import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { reportsAPI } from '../../services/api';
import ReportsList from './ReportsList';
import ReportForm from './ReportForm';
import ReportView from './ReportView';
import { toast } from 'react-toastify';

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await reportsAPI.getAll();
      setReports(response.data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      toast.error('Failed to load reports');
      // Fallback to empty array if API fails
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReport = () => {
    setView('create');
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setView('view');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedReport(null);
    fetchReports(); // Refresh the list
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.topic_taught?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading reports...</span>
        </div>
        <p className="text-muted mt-2">Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lecture Reports</h2>
        {user.role === 'lecturer' && view === 'list' && (
          <button className="btn btn-primary" onClick={handleCreateReport}>
            <i className="bi bi-plus-circle me-2"></i>New Report
          </button>
        )}
      </div>

      {view === 'list' && (
        <ReportsList
          reports={filteredReports}
          userRole={user.role}
          onViewReport={handleViewReport}
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      )}

      {view === 'create' && (
        <ReportForm onBack={handleBackToList} onSuccess={handleBackToList} />
      )}

      {view === 'view' && selectedReport && (
        <ReportView 
          report={selectedReport} 
          onBack={handleBackToList}
          userRole={user.role}
        />
      )}
    </div>
  );
};

export default Reports;