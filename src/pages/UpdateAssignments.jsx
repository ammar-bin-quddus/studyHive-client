import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const UpdateAssignments = () => {
  const updateData = useLoaderData();
  const {user} = useContext(AuthContext);

  const {email} = user;

  const { _id, photoUrl, title, description, marks, dueDate, level } =
    updateData;

  // console.log(updateData)

  const handleUpdateAssignments = (e) => {
    e.preventDefault();

    const form = e.target;
    const photoUrl = form.photo.value;
    const title = form.title.value;
    const description = form.description.value;
    const level = form.level.value;
    const marks = form.marks.value;
    const dueDate = form.dueDate.value;

    const updatedAssignments = {
      photoUrl,
      title,
      description,
      marks,
      dueDate,
      level,
      email
    };

    fetch(`https://study-hive-server-site.vercel.app/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedAssignments),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "Updated Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          e.target.reset();
        }
      });
  };

  return (
    <div>
      <div className="w-11/12 mx-auto my-8">
        <h1 className="font-bold text-3xl text-center">Update Assignment</h1>
        <form
          onSubmit={(e) => handleUpdateAssignments(e)}
          className="card-body"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* image url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                defaultValue={photoUrl}
                type="text"
                name="photo"
                placeholder="enter your photo url"
                className="input input-bordered"
                required
              />
            </div>
            {/* campaign title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                defaultValue={title}
                type="text"
                name="title"
                placeholder="enter title"
                className="input input-bordered"
                required
              />
            </div>
            {/* campaign type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Assignment difficulty level</span>
              </label>
              <select
                defaultValue={level}
                name="level"
                className="select select-bordered"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">description</span>
              </label>
              <textarea
                defaultValue={description}
                placeholder="description"
                name="description"
                className="textarea textarea-bordered textarea-md w-full"
              ></textarea>
            </div>
            {/* donation amount */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Marks</span>
              </label>
              <input
                defaultValue={marks}
                type="number"
                name="marks"
                placeholder="enter marks"
                className="input input-bordered"
                required
              />
            </div>
            {/* deadline */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                defaultValue={dueDate}
                type="date"
                name="dueDate"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAssignments;
