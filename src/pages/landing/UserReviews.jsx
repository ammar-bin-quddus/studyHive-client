import Marquee from "react-fast-marquee";

const UserReviews = () => {
  const review = [
    {
      image: "https://i.pravatar.cc/150?img=1",
      name: "Ariana Smith",
      review:
        "StudyHive makes group study so efficient. Love the clean UI and useful features!",
    },
    {
      image: "https://i.pravatar.cc/150?img=2",
      name: "Michael Johnson",
      review:
        "Creating and reviewing assignments with friends has never been easier.",
    },
    {
      image: "https://i.pravatar.cc/150?img=3",
      name: "Fatima Noor",
      review:
        "Best study tool I’ve used this semester. Helps me stay organized.",
    },
    {
      image: "https://i.pravatar.cc/150?img=4",
      name: "Daniel Kim",
      review:
        "The ability to evaluate my peers' assignments is really useful and interactive.",
    },
    {
      image: "https://i.pravatar.cc/150?img=5",
      name: "Sophia Lee",
      review: "StudyHive helped my group prep for finals. Great platform!",
    },
    {
      image: "https://i.pravatar.cc/150?img=7",
      name: "Emma Davis",
      review:
        "Exactly what I needed for my remote study group. Highly recommend.",
    },
  ];

  return (
    <div className="my-4">
      {/* Heading */}
      <div className="my-6 text-center px-5 mx-auto">
        <h3 className="text-3xl font-bold my-2">What Our Members Say</h3>
      </div>

      {/* Card Marquee */}
      <div className="gap-7">
        <Marquee pauseOnHover={true} speed={200}>
          {review?.map((data, index) => (
            <div
              key={index}
              className="md:w-80 w-72 bg-gray-900 text-white p-6 my-4 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300 mx-5"
            >
              {/* Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 mx-auto">
                <img
                  src={data.image}
                  alt="Review"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h2 className="mt-3 text-2xl font-bold text-center text-yellow-400">
                {data.name}
              </h2>

              {/* Review */}
              <p className="my-3 text-center">
                <span className="text-white">{data.review}</span>
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default UserReviews;
