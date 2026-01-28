// DeletedTasksPanel.jsx
import React from "react";

const DeletedTasksPanel = ({ deletedTasks, restoreTask }) => {
  if (deletedTasks.length === 0) return null;

  return (
    <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
      <h3>Deleted Tasks</h3>
      <ul>
        {deletedTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "5px" }}>
            {task.text}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => restoreTask(task.id)}
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletedTasksPanel;
