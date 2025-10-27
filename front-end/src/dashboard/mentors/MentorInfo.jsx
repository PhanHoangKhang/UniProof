import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const MentorInfo = () => {
  const { mentorId } = useParams();
  const { apiUrl } = useContext(StoreContext);
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/${mentorId}`);
        if (!res.ok) throw new Error('Không thể tải thông tin mentor');
        const data = await res.json();
        setMentor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải thông tin...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!mentor) return <p className="text-center text-gray-500">Không tìm thấy mentor.</p>;

  return (
    <>
      <Link to='/dashboard/meeting' className='text-[#368cd1]'>Quay về</Link>
      <div className='flex justify-center items-center h-[70vh]'>
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#efbd18] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
              {mentor.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold mb-2">{mentor.name}</h2>
            <p className="text-gray-600 mb-1">Email: {mentor.email}</p>
            <p className="text-gray-600 mb-4">Chuyên môn: {mentor.major || 'Chưa cập nhật'}</p>
            <div className="w-full text-sm text-gray-700 space-y-2 mb-4">
                {mentor.university && (
                  <p>
                    🏫 <span className="font-semibold">Trường:</span>{" "}
                    {mentor.university}
                  </p>
                )}
                {mentor.experience && (
                  <p>
                    💼 <span className="font-semibold">Kinh nghiệm:</span>{" "}
                    {mentor.experience}
                  </p>
                )}
                {mentor.certificates && (
                  <p>
                    🎓 <span className="font-semibold">Chứng chỉ:</span>{" "}
                    {mentor.certificates}
                  </p>
                )}
                {mentor.description && (
                  <p className="text-gray-600 italic line-clamp-3">
                    “{mentor.description}”
                  </p>
                )}
              </div>

            <Link to={`/dashboard/meeting/book/${mentor._id}`} className="bg-[#368cd1] text-white px-4 py-2 rounded-lg hover:bg-[#efbd18] transition-all">
              Đặt lịch ngay
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorInfo;
