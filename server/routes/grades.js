const express = require('express');
const { Grade } = require('../models');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(auth);

// List grades (students see only their grades, teachers/admins see all)
router.get('/', async (req, res) => {
  try {
    const role = (req.user?.role || '').toLowerCase();
    let query = {};
    
    // Si c'est un étudiant, voir uniquement ses notes
    if (role === 'student') {
      // Trouver l'étudiant lié à cet utilisateur (par userId ou email)
      const { Student, User } = require('../models');
      const user = await User.findById(req.userId).lean();
      
      const student = await Student.findOne({
        $or: [
          { userId: req.userId },
          { email: user?.email }
        ]
      }).lean();
      
      if (!student) {
        return res.json([]);
      }
      query.student = student._id;
    }
    
    const grades = await Grade.find(query)
      .populate('student', 'firstName lastName email')
      .populate('course', 'name code')
      .lean();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch grades' });
  }
});

// Create grade (admin/teacher)
router.post('/', authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { student, course, grade, date } = req.body;
    const created = await Grade.create({ student, course, grade, date });
    const populated = await created
      .populate('student', 'firstName lastName email')
      .populate('course', 'name code');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to create grade' });
  }
});

// Update grade (admin/teacher)
router.put('/:id', authorize('admin', 'teacher'), async (req, res) => {
  try {
    const { student, course, grade, date } = req.body;
    const updated = await Grade.findByIdAndUpdate(
      req.params.id,
      { student, course, grade, date },
      { new: true, runValidators: true }
    )
      .populate('student', 'firstName lastName email')
      .populate('course', 'name code');

    if (!updated) return res.status(404).json({ error: 'Grade not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to update grade' });
  }
});

// Delete grade (admin/teacher)
router.delete('/:id', authorize('admin', 'teacher'), async (req, res) => {
  try {
    const deleted = await Grade.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Grade not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete grade' });
  }
});

module.exports = router;
