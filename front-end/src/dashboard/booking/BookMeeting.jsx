import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import ConfirmBooking from './ConfirmBooking'; // adjust path if needed

const BookMeeting = () => {
  const { mentorId } = useParams()
  const [mentor, setMentor] = useState(null)
  const { user } = useContext(StoreContext);
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await fetch(`http://localhost:3000/user/${mentorId}`)
      const data = await res.json()
      setMentor(data)
    }
    fetchMentor()
  }, [mentorId])

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append('studentId', user?._id);
    formData.append('mentorId', mentorId);
    formData.append('mentorName', mentor.name)
    formData.append('date', date);
    formData.append('timeSlot', time);  // match backend field
    formData.append('notes', note);
    formData.append('text', text)
    formData.append('title', title)

    try {
      const res = await fetch('http://localhost:3000/api/bookings/create', {
        method: 'POST',
        body: formData, // no headers here — browser sets it automatically
      });
      const err = await res.json();
      if (res.ok) {
        setMessage("Đặt lịch thành công! ");
        setIsSuccess(true);
        setDate("");
        setTime("");
        setNote("");
        setText('')
        setTitle('')
        
      } else {
        setIsSuccess(false);
        setMessage(`Đặt lịch thất bại: ${err.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting booking.');
    }
  };

  return (
    <div className="p-6 w-full">
      <div className='mb-5'><Link to='/dashboard/meeting' className='text-[#368cd1]'>Quay về</Link></div>  
      <h2 className="text-2xl font-bold text-center mb-6">Đặt lịch với Mentor</h2>
      {mentor && (
        <div className="text-center mb-6">
          <div className='flex items-center justify-center'>
            <div className="w-16 h-16 bg-[#efbd18] rounded-full flex items-center justify-center 
            text-white text-2xl font-bold mb-3">
                  {mentor.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <p className="text-xl font-semibold">{mentor.name}</p>
          <p className="text-gray-600">{mentor.email}</p>
          <br></br>
          <Link to={`/dashboard/meeting/mentor-info/${mentor._id}`} className="bg-[#368cd1] text-white text-center 
          px-4 py-2 rounded-lg hover:bg-[#efbd18] transition-all">
                Profile
          </Link>
        </div>

      )}

      <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
        <label className="block mb-2 font-semibold">Ngày</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border p-2 rounded mb-3"
        />

        <label className="block mb-2 font-semibold">Giờ</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full border p-2 rounded mb-3"
        />
        <h2 className='text-center font-bold text-xl'>Bài viết của bạn</h2>
        <label className="block mb-2 font-semibold">Tiêu đề</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="Nhập bài làm..."
        />

        <label className="block mb-2 font-semibold">Bài làm</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="Nhập bài làm..."
        />

        <label className="block mb-2 font-semibold">Ghi chú</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          placeholder="Nhập ghi chú hoặc câu hỏi..."
        />

        <p id="message" className={`text-center mb-2 font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}>
          {message}
        </p>

        <ConfirmBooking text='Đặt lịch' onConfirm={handleSubmit} buttonClass='w-full bg-[#efbd18]
         rounded-lg p-2 font-semibold'></ConfirmBooking>
      </form>
    </div>
  )
}

export default BookMeeting
