import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AppContext } from "../contexts/appContext";
import { Alert } from "../components";
import NoTask from "../components/NoTask";
import Navbar from "../components/Navbar";

const Home = () => {
  const {
    fetchTasks,
    userTasks,
    createTask,
    displayAlert,
    deleteTask,
    showAlert,
    updateTask,
  } = useContext(AppContext);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [userTasks]);


  const handleEditBtnClick = (name, id) => {
    setIsEditing(true);
    setTask(name);
    setTaskID(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      displayAlert();
      return;
    } 
    if (isEditing) {
      updateTask(taskID, task)
      setIsEditing(false)
      setTask('')
      return
    } else {
      createTask(task);
      setTask("");
      return; 
    }
  };

  return (
    <>
      <Navbar />
      <main className="container-task">
        <section className="form">
          <h2 style={{ textAlign: "center" }}>Task Manager</h2>
          {showAlert && <Alert />}
          <form className="form-row form-row-task">
            <input
              type="text"
              className="task-form-input"
              placeholder="e.g debug code"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className="submit-task-btn"
              type="submit"
              onClick={handleSubmit}
            >
              {isEditing ? "edit Task" : "add Task"}
            </button>
          </form>
        </section>

        <section>
          {userTasks.length <= 0 ? (
            <NoTask />
          ) : (
            userTasks.map((task, _id) => {
              return (
                <div className="form tasks-div" key={_id}>
                  <div className="tasks-div-checkbox">
                    <input type="checkbox" className="checkbox" />
                    <p>{task.name}</p>
                  </div>
                  <div>
                    <FaEdit
                      onClick={() => handleEditBtnClick(task.name, task._id)}
                      className="task-icons"
                    />
                    <FaTrash
                      onClick={() => deleteTask(task._id)}
                      className="task-icons"
                    />
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
