import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { FaSearch, FaTag } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";

const allAssignments = () => {
  const assignmentsData = useLoaderData();
  // console.log(assignmentsData);

  const { user } = useContext(AuthContext);
  const [searchName, setSearchName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [myTaskData, setMyTaskData] = useState(assignmentsData);

  //console.log(myTaskData);

  const filteredCard = myTaskData.filter((task) =>
    task.title.toLowerCase().includes(searchName.toLowerCase())
  );

  console.log(filteredCard);

  const handleSearch = () => {
    fetch(
      `https://study-hive-server-site.vercel.app/allAssignments?search=${searchName}&level=${selectedLevel}`
    )
      .then((res) => res.json())
      .then((data) => setMyTaskData(data));
  };

  const handleFilter = (level) => {
    setSelectedLevel(level);
    fetch(
      `https://study-hive-server-site.vercel.app/allAssignments?search=${searchName}&level=${level}`
    )
      .then((res) => res.json())
      .then((data) => setMyTaskData(data));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://study-hive-server-site.vercel.app/allAssignments/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Campaign Data has been deleted.",
                icon: "success",
              });
              const remainData = myTaskData.filter(
                (myTask) => myTask._id !== id
              );
              setMyTaskData(remainData);
            }
          });
      }
    });
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="my-8 flex max-md:flex-col gap-5 justify-between items-center">
        <div className="max-md:order-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchName(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search by title..."
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </label>
        </div>
        <h1 className="text-center text-2xl font-bold max-md:order-1">
          All Assignments
        </h1>
        <div className="space-x-2 max-md:order-3">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => handleFilter(level)}
              className={`btn ${
                selectedLevel === level ? "btn-neutral" : "btn-outline"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
          {selectedLevel && (
            <button
              onClick={() => handleFilter("")}
              className="btn btn-error btn-outline ml-2"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      <div
        className={`w-full h-[50vh] justify-center items-center ${
          filteredCard.length === 0 ? "flex" : "hidden"
        }`}
      >
        <p className="text-3xl text-gray-600 hover:text-blue-400 transition-colors">
          {filteredCard.length === 0 ? (
            <Link to="/create-assignments">
              <p>Create Some Assignment ⚠</p>
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCard.map((task, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white p-6 rounded-lg shadow-md border border-yellow-500 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={task?.photoUrl}
              alt={task?.title}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h2 className="mt-1 flex items-center text-xl font-semibold text-yellow-400">
              <FaTag className="mr-2 text-yellow-400" /> {task?.title}
            </h2>
            <p className="mt-1 flex  items-center">
              <CiDiscount1 className="mr-2 text-xl text-yellow-200" /> Marks:{" "}
              <span className="text-yellow-200">{task?.marks}</span>
            </p>
            <p className="mt-1 flex items-center">
              <FaCalendar className="mr-2 text-xl text-yellow-200" /> Deadline:{" "}
              <span className="text-yellow-200">{task?.dueDate}</span>
            </p>

            {/* View Details Button */}
            <div className="flex justify-center items-center flex-wrap gap-2">
              <Link to={`/allAssignments/${task._id}`}>
                <button className="sharedBtn">View</button>
              </Link>
              <Link to={`/update/${task._id}`}>
                <button
                  className={`sharedBtn ${
                    user?.email === task.email ? "block" : "hidden"
                  }`}
                >
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className={`sharedBtn ${
                  user?.email === task.email ? "block" : "hidden"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default allAssignments;
