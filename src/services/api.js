import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (_) {}
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authAPI = {
  register:       (data) => api.post("/api/auth/register", data),
  login:          (data) => api.post("/api/auth/login", data),
  forgotPassword: (data) => api.post("/api/auth/forgot-password", data),
  resetPassword:  (data) => api.post("/api/auth/reset-password", data),
};

export const internshipAPI = {
  getAll:       ()                => api.get("/api/internships"),
  getById:      (id)              => api.get(`/api/internships/${id}`),
  search:       (params)          => api.get("/api/internships/search", { params }),
  getByCompany: (companyId)       => api.get(`/api/internships/company/${companyId}`),
  create:       (companyId, data) => api.post(`/api/internships/company/${companyId}`, data),
  update:       (id, data)        => api.put(`/api/internships/${id}`, data),
  updateStatus: (id, status)      => api.patch(`/api/internships/${id}/status`, null, { params: { status } }),
  delete:       (id)              => api.delete(`/api/internships/${id}`),
};

export const applicationAPI = {
  apply:           (studentId, data)  => api.post(`/api/applications/student/${studentId}`, data),
  getByStudent:    (studentId)        => api.get(`/api/applications/student/${studentId}`),
  getByInternship: (internshipId)     => api.get(`/api/applications/internship/${internshipId}`),
  getByCompany:    (companyId)        => api.get(`/api/applications/company/${companyId}`),
  updateStatus:    (appId, data)      => api.patch(`/api/applications/${appId}/status`, data),
};

export const notificationAPI = {
  getMyNotifications: () => api.get('/api/notifications'),
  markAsRead: (id) => api.put(`/api/notifications/${id}/read`),
  markAllAsRead: () => api.put('/api/notifications/read-all'),
};

export const reportAPI = {
  submit:          (studentId, data)  => api.post(`/api/reports/student/${studentId}`, data),
  getByStudent:    (studentId)        => api.get(`/api/reports/student/${studentId}`),
  getByInternship: (internshipId)     => api.get(`/api/reports/internship/${internshipId}`),
  review:          (reportId, data)   => api.patch(`/api/reports/${reportId}/review`, data),
};

export const evaluationAPI = {
  evaluate:        (supervisorId, data) => api.post(`/api/evaluations/supervisor/${supervisorId}`, data),
  getByStudent:    (studentId)          => api.get(`/api/evaluations/student/${studentId}`),
  getBySupervisor: (supervisorId)       => api.get(`/api/evaluations/supervisor/${supervisorId}`),
};

export const supervisorAPI = {
  getStudents: (supervisorId) => api.get(`/api/supervisors/${supervisorId}/students`),
};

export const certificateAPI = {
  generate:     (data)      => api.post("/api/certificates/generate", data),
  getByStudent: (studentId) => api.get(`/api/certificates/student/${studentId}`),
  verify:       (code)      => api.get(`/api/certificates/verify/${code}`),
};

export const collaborationAPI = {
  getAll:          ()              => api.get("/api/collaborations"),
  getById:         (id)            => api.get(`/api/collaborations/${id}`),
  getByCompany:    (companyId)     => api.get(`/api/collaborations/company/${companyId}`),
  getByInstitution:(institutionId) => api.get(`/api/collaborations/institution/${institutionId}`),
  create:          (data)          => api.post("/api/collaborations", data),
  updateStatus:    (id, status, outcomes) =>
    api.patch(`/api/collaborations/${id}/status`, null, { params: { status, outcomes } }),
  delete:          (id)            => api.delete(`/api/collaborations/${id}`),
};

export const institutionAPI = {
  getStudents: (institutionId) => api.get(`/api/institution/${institutionId}/students`),
  getStats:    (institutionId) => api.get(`/api/institution/${institutionId}/stats`),
  getAll:      ()                => api.get("/api/institution"),
  getAllStudents: ()             => api.get("/api/institution/students/all"),
};

export const dashboardAPI = {
  getStats: () => api.get("/api/government/stats"),
};

export const adminAPI = {
  getUsers:      ()               => api.get("/api/admin/users"),
  setUserStatus: (userId, status) => api.patch(`/api/admin/users/${userId}/status`, null, { params: { status } }),
  getStats:      ()               => api.get("/api/admin/stats"),
  getCompanies:  ()               => api.get("/api/admin/companies"),
  createUser:    (data)           => api.post("/api/admin/users", data),
  deleteUser:    (userId)         => api.delete(`/api/admin/users/${userId}`),
};

export default api;
