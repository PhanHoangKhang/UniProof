import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#16456a] text-white py-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {/* Cột 1: Giới thiệu */}
        <div>
          <h4 className="text-xl font-bold mb-4">Uni<span className='text-[#efbd18]'>Proof</span></h4>
          <p className="text-sm">Giải pháp chỉnh sửa bài luận học thuật hàng đầu tại Việt Nam.</p>
        </div>
        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#efbd18]">Liên kết nhanh</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-400 text-sm">Trang Chủ</a></li>
            <li><a href="#services" className="hover:text-yellow-400 text-sm">Dịch Vụ</a></li>
            <li><a href="#" className="hover:text-yellow-400 text-sm">Hỗ Trợ & FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-400 text-sm">Điều Khoản</a></li>
          </ul>
        </div>
        {/* Cột 3: Liên hệ */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#efbd18]">Liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:contact@uniproof.vn" className="hover:text-yellow-400">contact@uniproof.vn</a></li>
            <li>SĐT: (028) XXXX XXX</li>
            <li>Địa chỉ: TP. Hồ Chí Minh, Việt Nam</li>
          </ul>
        </div>
        {/* Cột 4: Mạng xã hội */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-[#efbd18]">Theo dõi chúng tôi tại</h4>
          <div className="flex space-x-4">
            <span className="text-2xl hover:text-yellow-400 cursor-pointer">📘</span> {/* Facebook */}
            <span className="text-2xl hover:text-yellow-400 cursor-pointer">📸</span> {/* Instagram */}
            <span className="text-2xl hover:text-yellow-400 cursor-pointer">💼</span> {/* LinkedIn */}
          </div>
        </div>
      </div>
      {/* Bản quyền */}
      <div className="border-t border-blue-800 mt-8 pt-4 text-center">
        <p className="text-xs">© {new Date().getFullYear()} UniProof. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer