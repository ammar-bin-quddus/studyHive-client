import React from "react";
import { useLoaderData } from "react-router-dom";

const allAssignments = () => {
  const assignmentsData = useLoaderData();
  console.log(assignmentsData);
  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="my-8">
        <h1 className="text-center text-2xl font-bold">All Assignments</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {assignmentsData.map((assignment) => (
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img src={assignment.photoUrl} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{assignment.title}</h2>
              <p>{assignment.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View</button>
                <button className="btn btn-primary">Update</button>
                <button className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default allAssignments;
