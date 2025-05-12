import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const PendingTasks = () => {
  const allData = useLoaderData();

  const { user } = useContext(AuthContext);

  const [pendingTasks, setPendingTasks] = useState(allData);
  const [selectedTask, setSelectedTask] = useState(null);
  // console.log(pendingTasks);
  // console.log(allData)
  console.log("Pending Tasks Data: ", pendingTasks);
  console.log("User Email: ", user?.email);

  const handleGiveMark = (task) => {
    setSelectedTask(task);
  };

  const handleSubmitMark = (e) => {
    e.preventDefault();
    const obtainMark = e.target.obtainMark.value;
    const feedBack = e.target.feedback.value;

    const checkedAssignmentData = {
      obtainMark,
      feedBack,
      status: "completed",
    };

    fetch(
      `https://study-hive-server-site.vercel.app/allAssignments/pendingTasks/marks/${selectedTask?._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(checkedAssignmentData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);

        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Submitted Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          e.target.reset();
          const remainData = pendingTasks.filter(
            (task) => task._id !== selectedTask._id
          );
          setPendingTasks(remainData);
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <h1 className="text-2xl text-center font-bold mb-4">
        Pending Assignments
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SN</th>
              <th>Assignment Title</th>
              <th>Marks</th>
              <th>Examinee Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.filter(
              (task) =>
                task.examineEmail !== user?.email && task.status === "pending"
            ).length > 0 ? (
              pendingTasks
                .filter(
                  (task) =>
                    task.examineeEmail !== user?.email &&
                    task.status === "pending"
                )
                .map((task, index) => (
                  <tr key={task._id}>
                    <td>{index + 1}</td>
                    <td>{task?.title}</td>
                    <td>{task?.marks}</td>
                    <td>{task?.examineeName || "N/A"}</td>
                    <td>
                      <button
                        className="sharedBtn"
                        onClick={() => {
                          handleGiveMark(task);
                          document.getElementById("my_modal_3").showModal();
                        }}
                      >
                        Give Mark
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No pending tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* modal */}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* solution docs link */}
          <div className="my-3">
            <a
              className="underline text-blue-600 hover:text-blue-800"
              href={selectedTask?.link}
            >
              <p>View Assignment Solution</p>
            </a>
          </div>
          {/* note input */}
          <div className="my-3">
            <span className="font-bold">Note:</span>
            <p className="text-sm text-gray-600">{selectedTask?.note}</p>
          </div>
          <div>
            <form
              method="dialog"
              onSubmit={(e) => {
                handleSubmitMark(e);
                document.getElementById("my_modal_3").close();
              }}
            >
              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text font-bold">Give Mark:</span>
                </label>
                <input
                  name="obtainMark"
                  type="number"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control my-3">
                <label className="label">
                  <span className="label-text font-bold">Give Feedback:</span>
                </label>
                <textarea
                  name="feedback"
                  placeholder="feedback"
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

export default PendingTasks;
