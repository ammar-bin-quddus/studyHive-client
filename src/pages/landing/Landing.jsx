import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import "./landing.css";
import { Autoplay } from "swiper/modules";

const Landing = () => {
  return (
    <div className="w-full mb-8">
      {/* banner section */}
      <section className="w-full h-[90vh]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div>
              <img src={banner1} alt="" />
              <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center text-xl sm:text-6xl text-white font-bold">
                <p>Welcome to StudyHive</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={banner2} alt="" />
              <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center text-xl sm:text-6xl text-white font-bold">
                <p>Collaborate with your friends</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={banner3} alt="" />
              <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center text-xl sm:text-6xl text-white font-bold">
                <p>Share your task</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={banner4} alt="" />
              <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center text-xl sm:text-6xl text-white font-bold">
                <p>Take challenges</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img src={banner5} alt="" />
              <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center text-xl sm:text-6xl text-white font-bold">
                <p>Enjoy your study!</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* featured section */}
      <section className="w-11/12 mx-auto my-16">
        <h2 className="text-3xl text-center font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Create Assignments",
              desc: "Easily create and share assignments with your study group.",
            },
            {
              title: "Grade Assignments",
              desc: "Evaluate and provide feedback on your friend's assignments.",
            },
            {
              title: "Track Progress",
              desc: "Monitor your and your friend's assignment completion status.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="card bg-base-100 cursor-pointer shadow-md transition-all duration-75 hover:bg-gradient-to-r hover:from-[#09203F] hover:to-[#537895]"
            >
              <div className="card-body transition-colors duration-500 hover:text-white">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* faq section */}
      <section className="w-11/12 mx-auto my-16">
        <h2 className="text-3xl text-center font-bold mb-8">FAQs</h2>
        <div className="space-y-4">
          <div className="collapse collapse-plus bg-base-100 shadow-md hover:scale-y-125 transition-transform">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              How do I create an assignment?
            </div>
            <div className="collapse-content">
              <p>
                Go to the assignments page and click on "Create Assignment" to
                start.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 shadow-md hover:scale-y-125 transition-transform">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Can I grade my own assignments?
            </div>
            <div className="collapse-content">
              <p>
                No, you can only grade assignments submitted by your friends.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100 shadow-md hover:scale-y-125 transition-transform">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Is this platform free to use?
            </div>
            <div className="collapse-content">
              <p>Yes, StudyHive is completely free to use for everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
