import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const allAssignments = () => {
  const assignmentsData = useLoaderData();
  // console.log(assignmentsData);

  const { user } = useContext(AuthContext);
  const [myTaskData, setMyTaskData] = useState(assignmentsData);

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
      <div className="my-8">
        <h1 className="text-center text-2xl font-bold">All Assignments</h1>
      </div>
      <div
        className={`w-full h-[50vh] justify-center items-center ${
          myTaskData.length === 0 ? "flex" : "hidden"
        }`}
      >
        <p className="text-3xl text-gray-600 hover:text-blue-400 transition-colors">
          {myTaskData.length === 0 ? (
            <Link to="/create-assignments">
              <p>Create Some Assignment ⚠</p>
            </Link>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myTaskData.map((task) => (
          <div
            key={task._id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img className="w-full h-56" src={task.photoUrl} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{task.title}</h2>
              <p>{task.description}</p>
              <div className="card-actions justify-end">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default allAssignments;
