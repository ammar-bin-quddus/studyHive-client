import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto my-8">
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to StudyHive
          </h1>
          {/* Connect, collaborate, and conquer */}
          <p className="text-lg md:text-xl mb-6 font-bold">
            <span className="text-amber-500">
            <Typewriter
              cursor
              cursorStyle=" "
              cursorBlinking
              delaySpeed={1000}
              deleteSpeed={45}
              loop={0}
              typeSpeed={90}
              words={["Connect", "Collaborate", "And conquer"]}
            />
            </span>
            your assignments with friends!
          </p>
          <Link to="/create-assignments"><button className="btn btn-accent btn-md">Get Started</button></Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="my-16">
        <h2 className="text-3xl text-center font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="text-xl font-bold">Create Assignments</h3>
              <p>Easily create and share assignments with your study group.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="text-xl font-bold">Grade Assignments</h3>
              <p>Evaluate and provide feedback on your friends' assignments.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="text-xl font-bold">Track Progress</h3>
              <p>
                Monitor your and your friends' assignment completion status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="my-16">
        <h2 className="text-3xl text-center font-bold mb-8">FAQs</h2>
        <div className="space-y-4">
          <div className="collapse collapse-plus bg-base-100 shadow-md">
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
          <div className="collapse collapse-plus bg-base-100 shadow-md">
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
          <div className="collapse collapse-plus bg-base-100 shadow-md">
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

export default Home;
