import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTasks } from "../redux/taskTrackerSlice";

const AddTaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);

  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.length < 1 || description.length < 1) {
      alert("Please enter Task and Description");
    } else {
      dispatch(
        addTasks({
          id: uuidv4(),
          taskName: taskName,
          description: description,
          status: status,
        })
      );
    }

    setTaskName("");
    setDescription("");
  };

  return (
    <div className="my-10">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="flex flex-col sm:flex-col md:flex-row md:mr-10 my-3">
            <label className="text-2xl mb-1">Task Name:</label>
            <input
              className="outline-none h-8 px-2 py-1 border rounded-md border-slate-900 ml-2 w-40 lg:w-52"
              type="text"
              value={taskName}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTaskName(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col sm:flex-col md:flex-row md:mr-10 my-3">
            <label className="text-2xl mb-1">Description:</label>
            <input
              className="outline-none h-8 px-2 py-1 border rounded-md border-slate-900 ml-2 w-40 lg:w-52"
              type="text"
              value={description}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className="bg-sky-400 text-white mt-3 sm:mt-0 py-2 px-4 rounded-lg hover:bg-sky-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
