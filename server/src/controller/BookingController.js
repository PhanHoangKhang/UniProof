import Booking from '../model/Booking.js'

// Create booking
const createBooking =  async (req, res) => {
  
  try {
    const { studentId, mentorId, mentorName, date, timeSlot, notes, title, text} = req.body

    const booking = new Booking({ 
      student: studentId, 
      mentor: mentorId,
      mentorName, 
      date, 
      timeSlot, 
      notes,
      title,
      text
    })

    await booking.save()
    res.status(201).json({ message: 'Booking created successfully!', booking })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
// Get bookings for a user
const getBooking =  async (req, res) => {
  
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({
      $or: [{ student: userId }, { mentor: userId }]

    }).populate('student mentor', 'name email').sort({ createdAt: -1 });
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const infoBooking = async(req, res) => {
 
  try {
    const { id } = req.params;
    const user = await Booking.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export {createBooking, getBooking, infoBooking}
