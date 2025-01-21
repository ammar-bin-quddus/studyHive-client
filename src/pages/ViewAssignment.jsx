import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const ViewAssignment = () => {
  const assignmentsData = useLoaderData();
  console.log(assignmentsData);

  const { user } = useContext(AuthContext);

  const { _id, photoUrl, title, description, marks, dueDate, level, email } =
    assignmentsData;

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const link = e.target.docsLink.value;
    const note = e.target.note.value;
    const examineeEmail = user?.email;
    const examineeName = user?.displayName;

    const submitData = {
      link,
      note,
      title,
      marks,
      examineeName,
      examineeEmail,
      status: "pending"
    };

    fetch("http://localhost:3000/allAssignments/pendingTasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Submitted Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="w-[40%]">
          <img src={photoUrl} alt="Movie" />
        </figure>
        <div className="card-body w-[60%]">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>Marks: {marks}</p>
          <p>Due Date: {dueDate}</p>
          <p>Assignment Level: {level}</p>
          <div className="card-actions justify-end">
            <button
              disabled= {user?.email === email ? true : false}
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="btn btn-primary"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>

      {/* modal */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center border-b-2">
            Submit your assignment
          </h3>
          <div>
            <form
              method="dialog"
              onSubmit={(e) => {
                handleTaskSubmit(e);
                document.getElementById("my_modal_3").close();
              }}
            >
              {/* google docs input */}
              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text font-bold">Google docs link</span>
                </label>
                <input
                  type="text"
                  name="docsLink"
                  placeholder="Enter your google docs link"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* note input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Quick note</span>
                </label>
                <textarea
                  placeholder="Enter your note here"
                  name="note"
                  className="textarea textarea-bordered textarea-md w-full"
                ></textarea>
              </div>

              <div className="modal-action justify-center">
                <button className="btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewAssignment;
