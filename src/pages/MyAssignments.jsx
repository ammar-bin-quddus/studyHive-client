import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyAssignments = () => {
  const [myAssignments, setMyAssignments] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //console.log(myAssignments);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      `https://study-hive-server-site.vercel.app/attempted-assignments?email=${user?.email}`
    );
    const data = await res.json();
    setMyAssignments(data);
  };

  const handleOpenModal = (task) => {
    setSelected(task);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <h1 className="text-2xl text-center font-bold mb-4">My Assignments</h1>
      <div className="overflow-x-auto">
        {myAssignments && (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>SN</th>
                <th>Assignment Title</th>
                <th>Assignment Status</th>
                <th>Assignment Marks</th>
                <th>Obtain Marks</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {myAssignments.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task?.title}</td>
                  <td
                    className={
                      task.status === "pending"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {task?.status}
                  </td>
                  <td>{task?.marks}</td>
                  <td>{task?.obtainMark || "Not Marked"}</td>
                  <td
                    onClick={() => {
                      handleOpenModal(task);
                    }}
                    className="underline text-blue-400 hover:text-blue-600 cursor-pointer"
                  >
                    View Feedback
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* modal */}

      {showModal && selected && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <form method="dialog">
              <button
                onClick={() => {
                  handleCloseModal();
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <p className="py-4">{selected?.feedBack || "Not Available"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
