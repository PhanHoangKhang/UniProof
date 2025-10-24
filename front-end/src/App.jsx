import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './navbar/ScrollToTop'
import UserDashboard from './dashboard/userDashboard'
import Home from './main-info/Home'
import GrammarAI from './dashboard/GrammarAI'
import BookMeeting from './dashboard//booking/BookMeeting'
import UserInfo from './dashboard/userInfo'
import MentorList from './dashboard/mentors/MentorList'
import MentorInfo from './dashboard/mentors/MentorInfo'
import BookingList from './dashboard/booking/BookingList'
import FileViewer from "./FileViewer/FileViewer";
import SeeText from './dashboard/booking/SeeText'
import ChatPage from './dashboard/chatbox/ChatPage'

function App() {
 
  return (
    <>
      <ScrollToTop />
      <div className="animate-opa">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/file-viewer/:fileName" element={<FileViewer />} />
          {/* Dashboard layout */}
          <Route path="/dashboard/*" element={<UserDashboard />}>
            <Route path="grammarcheck" element={<GrammarAI />} />
            {/* Meeting routes */}
            <Route path="meeting" element={<MentorList />} />
            <Route path="meeting/book/:mentorId" element={<BookMeeting />} />
            <Route path='meeting/mentor-info/:mentorId' element={<MentorInfo></MentorInfo>}></Route>
            <Route path="submitted" element={<BookingList/>} />
            <Route path="submitted/seetext/:bookingId" element={<SeeText/>} />
            <Route path="user-info" element={<UserInfo />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
