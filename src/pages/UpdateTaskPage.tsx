import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { updateTasks } from "../redux/taskTrackerSlice";

interface Task {
  id: string;
  taskName: string;
  description: string;
  status: boolean;
}

const UpdateTaskPage: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TaskItems = useSelector((state: RootState) => state.tasks.taskItems);
  const { id } = useParams();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.length < 1 || description.length < 1) {
      alert("Please enter Task and Description");
    } else {
      dispatch(
        updateTasks({
          id: id,
          taskName: taskName,
          description: description,
          status: status,
        })
      );
      navigate(-1);
    }

    setTaskName("");
    setDescription("");
  };

  useEffect(() => {
    const tasks: Task = TaskItems.find((item) => item.id === id);

    setTaskName(tasks.taskName);
    setDescription(tasks.description);
  }, [id]);

  return (
    <>
      <Header />
      <h1 className="text-3xl text-center font-semibold my-5">Update Task</h1>
      <div className="my-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <div className="flex flex-col sm:flex-row mr-0 sm:mr-0 md:mr-10 my-3 sm:my-0">
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
            <div className="flex flex-col sm:flex-row mr-0 sm:mr-0 md:mr-10 my-3 sm:my-0">
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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateTaskPage;
