import React, { useState, useEffect } from "react";
import {
  MdDeleteForever,
  MdOutlineRemoveDone,
  MdOutlineDoneAll,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Header from "../components/Header";
import AddTaskForm from "../components/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { deleteTasks, markAsDoneTasks } from "../redux/taskTrackerSlice";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  taskName: string;
  description: string;
  status: boolean;
}

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const tasksList = useSelector((state: RootState) => state.tasks.taskItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setTasks(tasksList);
  }, [tasksList]);

  const deleteHandler = (id: string) => {
    dispatch(deleteTasks(id));
  };

  const markAsDoneHandler = (id: string) => {
    dispatch(markAsDoneTasks(id));
  };

  return (
    <>
      <Header />
      <AddTaskForm />
      {tasks?.map((task: Task) => (
        <div
          key={task.id}
          className="flex justify-between items-center mx-1 sm:mx-40 my-7 px-3 sm:px-7 py-7 bg-teal-50 rounded-md"
        >
          <div>
            <h1 className="text-2xl font-bold">{task.taskName}</h1>
            <p className="text-xl text-slate-700">{task.description}</p>
          </div>
          <div>
            <Link to={`/update/${task.id}`}>
              <button className="text-4xl text-blue-600 hover:text-blue-400 mx-4">
                <FaRegEdit />
              </button>
            </Link>
            <button
              onClick={() => deleteHandler(task.id)}
              className="text-4xl text-red-600 hover:text-red-400 mx-0 sm:mx-4"
            >
              <MdDeleteForever />
            </button>
            <button
              onClick={() => markAsDoneHandler(task.id)}
              className="text-4xl text-green-600 hover:text-green-400"
            >
              {task.status ? <MdOutlineDoneAll /> : <MdOutlineRemoveDone />}
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="bg-emerald-50 mx-5 sm:mx-40 py-10 rounded-md">
          <p className="text-3xl text-slate-800 text-center">No Tasks</p>
        </div>
      )}
    </>
  );
};

export default HomePage;
