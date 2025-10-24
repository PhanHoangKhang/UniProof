import React from "react";
import image from "/image.png";
import SignInModal from "../SignIn/SignInModal";

const MainInfo = () => {
  const services = [
    { title: "Hiệu đính Học thuật", description: "Cải thiện cấu trúc, logic, và văn phong chuyên ngành của bài luận, đảm bảo tính mạch lạc cao nhất.", icon: "📚" },
    { title: "Kiểm tra Ngữ pháp & Lỗi", description: "Loại bỏ mọi lỗi chính tả, ngữ pháp, và dấu câu để bài viết đạt sự chuyên nghiệp tuyệt đối.", icon: "✍️" },
    { title: "Tư vấn Đề tài & Dàn ý", description: "Hỗ trợ định hình đề tài nghiên cứu và xây dựng dàn ý chặt chẽ, khoa học ngay từ bước đầu.", icon: "💡" },
    { title: "Không viết hộ", description: "Cam kết không viết hộ để đảm bảo tính nguyên bản và trung thực của bài viết.", icon: "🛡️" },
  ];
  const testimonials = [
    { quote: "Nhờ UniProof, bài tốt nghiệp của mình đạt A+ và được hội đồng đánh giá cao về cách lập luận.", name: "Minh Anh", title: "SV Đại học Kinh tế Quốc dân" },
    { quote: "Tốc độ phản hồi nhanh, chất lượng chỉnh sửa tuyệt vời! Chuyên gia rất am hiểu về lĩnh vực của mình.", name: "Quang Hải", title: "Nghiên cứu sinh, ĐH Bách Khoa" },
    { quote: "Từ một bản nháp lộn xộn, họ đã giúp mình biến thành một bài luận rõ ràng, mạch lạc, đúng chuẩn quốc tế.", name: "Thanh Trúc", title: "SV Đại học Ngoại Thương" },
  ];

  return (
    <>
      {/* Main Section */}
      <div className="mt-32 md:mt-40 flex flex-col-reverse lg:flex-row justify-center items-center gap-10 md:gap-20 px-5 md:px-20 lg:px-32">
        {/* Text Section */}
        <div className="lg:max-w-[50%] text-center lg:text-left">
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold">Uni<span className="text-[#efbd18]">Proof</span></p>
          <p className="text-2xl md:text-3xl mt-4">Dịch Vụ Chấm Chữa Bài Chuẩn Học Thuật</p>
          <p className="text-lg md:text-xl mt-4">
            <span className="font-bold italic">"Viết chuẩn, sống thật"</span> -
            Biến những ý tưởng thành bài luận rõ ràng, mạch lạc, đầy chất sáng tạo
          </p>

          <div className="mt-6 flex justify-center lg:justify-start">
            <SignInModal buttonClass="bg-[#368cd1] text-white font-bold rounded-lg py-3 px-6 cursor-pointer text-lg 
            md:text-xl shadow-xl hover:bg-[#efbd18] transition-all" text="Thử Ngay"/>
          </div>
        </div>
        {/* Image Section */}
        <div className="lg:max-w-[50%] flex justify-center">
          <img src={image} alt="Main illustration" className="w-72 md:w-96 lg:w-[500px] h-auto object-contain"/>
        </div>
      </div>
      {/* Highlight Section */}
      <div className="px-5 md:px-20 lg:px-32 mt-10 space-y-3">
        <p className="text-base md:text-lg lg:text-xl">✅ 100% được chấm chữa bởi các chuyên gia học thuật</p>
        <p className="text-base md:text-lg lg:text-xl">✅ Cam kết 100% bài luận đạt chuẩn quốc tế, điểm số bứt phá</p>
        <p className="text-base md:text-lg lg:text-xl">✅ Được tin dùng bởi các sinh viên từ các trường đại học hàng đầu Việt Nam</p>
      </div>
      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-around items-center py-5 text-white mt-10 gap-3 md:gap-0">
        <p className="text-sm md:text-base lg:text-lg bg-[#efbd18] text-[#16456a] py-2 px-4 rounded-lg font-semibold">Phù hợp với mọi trình độ</p>
        <p className="text-sm md:text-base lg:text-lg bg-[#efbd18] text-[#16456a] py-2 px-4 rounded-lg font-semibold">Feedbacks 1-1</p>
        <p className="text-sm md:text-base lg:text-lg bg-[#efbd18] text-[#16456a] py-2 px-4 rounded-lg font-semibold">Mọi lúc mọi nơi</p>
      </div>

      <section id="services" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-900">Dịch Vụ Chuyên Sâu UniProof</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {services.map((service, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-blue-900">Khách Hàng Nói Gì Về Chúng Tôi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {testimonials.map((testi, index) => (
              <div key={index} className="p-8 bg-blue-50 rounded-lg shadow-md border-t-4 border-blue-600">
                <p className="italic text-lg mb-4 text-gray-700">"{testi.quote}"</p>
                <p className="font-semibold text-blue-800">- {testi.name}</p>
                <p className="text-sm text-gray-500">{testi.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MainInfo;
