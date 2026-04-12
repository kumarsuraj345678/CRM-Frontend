const checkIn = async (req, res) => {
  const userId = req.user.id;

  const today = new Date().toDateString();

  const existing = await Attendance.findOne({ userId, date: today });

  if (existing) {
    return res.json(existing);
  }

  const newEntry = await Attendance.create({
    userId,
    checkInTime: new Date(),
    isActive: true,
    date: today,
  });

  res.json(newEntry);
};
