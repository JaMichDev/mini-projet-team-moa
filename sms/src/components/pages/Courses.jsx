import { useMemo, useState } from 'react';
import { useCourses } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';

export default function Courses() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const {
    data: courses = [],
    loading,
    error,
    createCourse,
    updateCourse,
    deleteCourse
  } = useCourses();

  const role = (user?.role || '').toLowerCase();
  const canEdit = role === 'admin' || role === 'scolarite';
  const canDelete = role === 'admin';

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return courses;
    const term = searchTerm.toLowerCase();
    return courses.filter((c) =>
      (c.name || '').toLowerCase().includes(term) ||
      (c.code || '').toLowerCase().includes(term) ||
      (c.id || '').toLowerCase().includes(term)
    );
  }, [courses, searchTerm]);

  const sortedCourses = useMemo(() => {
    if (!sortConfig.key) return filteredCourses;
    return [...filteredCourses].sort((a, b) => {
      const aValue = (a[sortConfig.key] || '').toString().toLowerCase();
      const bValue = (b[sortConfig.key] || '').toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredCourses, sortConfig]);

  const total = sortedCourses.length;
  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(total / pageSize));

  const visible = useMemo(() => {
    if (pageSize === 0) return sortedCourses;
    const start = (page - 1) * pageSize;
    return sortedCourses.slice(start, start + pageSize);
  }, [sortedCourses, page, pageSize]);

  if (loading) return <main className="Main page-content"><p>📥 Loading courses...</p></main>;
  if (error) return <main className="Main page-content"><p>❌ Error: {error}</p></main>;

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const goTo = (n) => setPage(Math.min(Math.max(1, n), totalPages));
  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData({ name: course.name || '', code: course.code || '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', code: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canEdit) return;
    setSubmitting(true);
    setMessage('');

    try {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim()
      };

      if (!payload.name || !payload.code) {
        setMessage('Name and code are required');
        setMessageType('error');
        setSubmitting(false);
        return;
      }

      if (editingId) {
        await updateCourse(editingId, payload);
        setMessage('Course updated successfully');
      } else {
        await createCourse(payload);
        setMessage('Course created successfully');
      }

      setMessageType('success');
      resetForm();
      setShowForm(false);
    } catch (err) {
      setMessage(err.message || 'Operation failed');
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!canDelete) return;
    if (!window.confirm('Delete this course?')) return;
    try {
      await deleteCourse(id);
      setMessage('Course deleted');
      setMessageType('success');
    } catch (err) {
      setMessage(err.message || 'Delete failed');
      setMessageType('error');
    }
  };

  return (
    <main className="Main page-shell">
      <section className="page-card">
        <header className="page-header">
          <div>
            <h1>📚 Courses</h1>
            <p style={{ margin: 0, color: '#475569' }}>{total} courses total</p>
          </div>
          <div className="toolbar">
            <input
              className="input"
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />

            <select
              className="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={0}>Show all</option>
            </select>

            {canEdit && (
              <button
                className="btn-primary-solid"
                onClick={() => {
                  resetForm();
                  setShowForm((v) => !v);
                }}
              >
                {showForm ? '✕ Close' : '➕ Add'}
              </button>
            )}
          </div>
        </header>

        {message && (
          <div className={`banner ${messageType === 'error' ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {showForm && canEdit && (
          <div className="page-card" style={{ marginBottom: 16 }}>
            <h2 style={{ margin: 0, marginBottom: 10 }}>{editingId ? 'Edit course' : 'Create course'}</h2>
            <form onSubmit={handleSubmit} className="form-grid">
              <label>
                <span>Course name *</span>
                <input
                  className="input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Algorithms"
                  required
                />
              </label>

              <label>
                <span>Code *</span>
                <input
                  className="input"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Ex: CS101"
                  required
                />
              </label>

              <div className="actions" style={{ marginTop: 6 }}>
                <button
                  type="submit"
                  className="btn-primary-solid"
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div className="table-card page-card" style={{ paddingTop: 0 }}>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('code')}>
                    Code {sortConfig.key === 'code' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('name')}>
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  {canEdit && <th style={{ textAlign: 'center' }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {visible.map((course) => (
                  <tr key={course.id}>
                    <td style={{ fontWeight: '700' }}>{course.code}</td>
                    <td>{course.name}</td>
                    {canEdit && (
                      <td>
                        <div className="actions" style={{ justifyContent: 'center' }}>
                          <button className="btn-ghost" onClick={() => handleEdit(course)}>✏️ Edit</button>
                          {canDelete && (
                            <button className="btn-ghost danger" onClick={() => handleDelete(course.id)}>🗑 Delete</button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <footer className="toolbar" style={{ justifyContent: 'center' }}>
            <button onClick={prev} className="btn-ghost" disabled={page === 1}>
              ← Previous
            </button>
            <span style={{ fontWeight: 600 }}>Page {page} of {totalPages}</span>
            <button onClick={next} className="btn-ghost" disabled={page === totalPages}>
              Next →
            </button>
          </footer>
        )}
      </section>
    </main>
  );
}