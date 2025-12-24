import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

// Hook for Grades
export const useGrades = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformGrade = (grade) => ({
    id: grade._id,
    grade: grade.grade,
    courseId: grade.course?._id || grade.course,
    courseName: grade.course?.name || 'Unknown',
    studentId: grade.student?._id || grade.student,
    studentFirstName: grade.student?.firstName || '',
    studentLastName: grade.student?.lastName || '',
    date: grade.date || null
  });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const grades = await apiClient.getGrades();
        
        if (!Array.isArray(grades)) {
          console.error('Grades response is not an array:', grades);
          setData([]);
          setError('Invalid data format received from server');
          return;
        }
        
        setData(grades.map(transformGrade));
        setError(null);
      } catch (err) {
        console.error('Error fetching grades:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const createGrade = async (gradeData) => {
    const created = await apiClient.createGrade(gradeData);
    const mapped = transformGrade(created);
    setData((prev) => [...prev, mapped]);
    return mapped;
  };

  const updateGrade = async (id, gradeData) => {
    const updated = await apiClient.updateGrade(id, gradeData);
    const mapped = transformGrade(updated);
    setData((prev) => prev.map((g) => (g.id === id ? mapped : g)));
    return mapped;
  };

  const deleteGrade = async (id) => {
    await apiClient.deleteGrade(id);
    setData((prev) => prev.filter((g) => g.id !== id));
  };

  return { data, loading, error, createGrade, updateGrade, deleteGrade };
};

// Hook for Students
export const useStudents = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching students...');
        const students = await apiClient.getStudents();
        
        console.log('📥 Students received:', students);
        
        // Validate that students is an array
        if (!Array.isArray(students)) {
          console.error('Students response is not an array:', students);
          setData([]);
          setError('Invalid data format received from server');
          return;
        }
        
        // Transform data to match expected format
        const transformedStudents = students.map(student => ({
          id: student._id,
          firstname: student.firstName,
          lastname: student.lastName,
          email: student.email,
          phone: student.phone,
          dateOfBirth: student.dateOfBirth,
          address: student.address
        }));
        
        console.log('✅ Transformed students:', transformedStudents);
        setData(transformedStudents);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching students:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { data, loading, error };
};

// Hook for Courses
export const useCourses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const courses = await apiClient.getCourses();
        
        if (!Array.isArray(courses)) {
          console.error('Courses response is not an array:', courses);
          setData([]);
          setError('Invalid data format received from server');
          return;
        }
        
        const transformedCourses = courses.map(course => ({
          id: course._id,
          name: course.name,
          code: course.code
        }));
        
        setData(transformedCourses);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const createCourse = async (courseData) => {
    const created = await apiClient.createCourse(courseData);
    const mapped = { id: created._id, name: created.name, code: created.code };
    setData((prev) => [...prev, mapped]);
    return mapped;
  };

  const updateCourse = async (id, courseData) => {
    const updated = await apiClient.updateCourse(id, courseData);
    const mapped = { id: updated._id, name: updated.name, code: updated.code };
    setData((prev) => prev.map((c) => (c.id === id ? mapped : c)));
    return mapped;
  };

  const deleteCourse = async (id) => {
    await apiClient.deleteCourse(id);
    setData((prev) => prev.filter((c) => c.id !== id));
  };

  return { data, loading, error, createCourse, updateCourse, deleteCourse };
};

// Hook for Users (can be disabled for roles sans droits)
export const useUsers = (enabled = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      setData([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await apiClient.getUsers();
        
        if (!Array.isArray(users)) {
          console.error('Users response is not an array:', users);
          setData([]);
          setError('Invalid data format received from server');
          return;
        }
        
        const transformedUsers = users.map(user => ({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }));
        
        setData(transformedUsers);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [enabled]);

  // CREATE user
  const createUser = async (userData) => {
    try {
      const newUser = await apiClient.createUser(userData);
      const transformed = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      };
      setData([...data, transformed]);
      return transformed;
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.message);
      throw err;
    }
  };

  // UPDATE user
  const updateUser = async (id, userData) => {
    try {
      const updatedUser = await apiClient.updateUser(id, userData);
      const transformed = {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      };
      setData(data.map(user => user.id === id ? transformed : user));
      return transformed;
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
      throw err;
    }
  };

  // DELETE user
  const deleteUser = async (id) => {
    try {
      await apiClient.deleteUser(id);
      setData(data.filter(user => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
      throw err;
    }
  };

  return { 
    data, 
    loading, 
    error,
    createUser,
    updateUser,
    deleteUser
  };
};