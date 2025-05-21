import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaCalendar, FaStickyNote, FaTag } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";

const ViewAssignment = () => {
  const assignmentsData = useLoaderData();
  //console.log(assignmentsData);

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
      status: "pending",
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
        //console.log(data);
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
      {/* <div className="card card-side bg-base-100 shadow-xl flex flex-col sm:flex-row">
        <figure className="sm:w-[40%] h-[300px]">
          <img src={photoUrl} alt="Movie" />
        </figure>
        <div className="card-body sm:w-[60%]">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p><span className="font-semibold">Marks:</span> {marks}</p>
          <p>Due Date: {dueDate}</p>
          <p>Assignment Level: {level}</p>
          <div className="card-actions justify-end">
            <button
              disabled= {user?.email === email ? true : false}
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="sharedBtn"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div> */}

      <div className="bg-gray-900 min-h-[90vh] flex flex-col sm:flex-row items-start gap-6  text-white p-6 rounded-lg shadow-md border border-yellow-500">
        <div className="w-full h-[50vh] sm:h-[80vh] sm:w-1/2 max-sm:order-2">
          <img
            src={photoUrl}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg mb-4"
          />
        </div>
        <div className="w-full sm:w-1/2 max-sm:order-3">
          <h2 className="mt-1 flex items-center text-xl font-semibold text-yellow-400">
            <FaTag className="mr-2 text-yellow-400" /> {title}
          </h2>
          <p className="mt-1 flex  items-center">
            <FaStickyNote className="mr-2 text-xl text-yellow-200" />{" "}
            Description: <span className="text-yellow-200">{description}</span>
          </p>
          <p className="mt-1 flex  items-center">
            <CiDiscount1 className="mr-2 text-xl text-yellow-200" /> Marks:{" "}
            <span className="text-yellow-200">{marks}</span>
          </p>
          <p className="mt-1 flex  items-center">
            <MdCategory className="mr-2 text-xl text-yellow-200" /> Level:{" "}
            <span className="text-yellow-200">{level}</span>
          </p>
          <p className="mt-1 flex items-center">
            <FaCalendar className="mr-2 text-xl text-yellow-200" /> Deadline:{" "}
            <span className="text-yellow-200">{dueDate}</span>
          </p>

          {/* View Details Button */}
          <div className="">
            <button
              disabled={user?.email === email ? true : false}
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="sharedBtn"
            >
              Take Assignment
            </button>
          </div>
        </div>
        <div className="max-sm:order-1">
          <Link to="/assignments">
            <button className="sharedBtn">
              <IoMdArrowRoundBack />
            </button>
          </Link>
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
                <button className="sharedBtn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewAssignment;
