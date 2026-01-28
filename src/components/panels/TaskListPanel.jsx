import { CheckCircle, Trash2, Edit2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function TaskListPanel({ tasks, completedTasks, deleteTask, updateTask, markDone }) {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [successMsg, setSuccessMsg] = useState({});
  const [showCompleted, setShowCompleted] = useState(true); // toggle state

  // Sounds
  const playDoneSound = () => {
    const audio = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2026/01/Short-electronic-notification-alert.mp3"
    );
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const playDeleteSound = () => {
    const audio = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2026/01/Short-electronic-notification-alert.mp3"
    );
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleDone = (taskId) => {
    playDoneSound();
    setSuccessMsg({ ...successMsg, [taskId]: "Task completed successfully!" });
    setTimeout(() => setSuccessMsg({ ...successMsg, [taskId]: "" }), 1500);
    markDone(taskId);
  };

  const handleDelete = (taskId, isCompleted = false) => {
    playDeleteSound();
    deleteTask(taskId, isCompleted);
  };

  const startEdit = (taskId, text) => {
    setEditId(taskId);
    setEditText(text);
  };

  const saveEdit = (taskId) => {
    if (!editText.trim()) return;
    updateTask(taskId, editText);
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="p-5 space-y-5">
      {/* ACTIVE TASKS */}
      <div>
        <h2 className="text-sm font-medium mb-3 text-[color:var(--ink-muted)]">Active Tasks</h2>
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between border-b border-[color:var(--border-soft)] pb-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
              {editId === task.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border-b border-[color:var(--border-soft)] bg-transparent focus:outline-none py-1 px-1 text-sm text-main"
                />
              ) : (
                <span className="text-sm text-main">{task.text}</span>
              )}

              <div className="flex gap-3">
                <button onClick={() => handleDone(task.id)} className="text-[color:var(--ink-muted)] hover:text-green-500 active:scale-90 transition-all duration-200" aria-label="Mark done">
                  <CheckCircle size={16} />
                </button>

                {editId === task.id ? (
                  <button onClick={() => saveEdit(task.id)} className="text-blue-500 hover:text-blue-600 active:scale-90 transition-all duration-200" aria-label="Save task">
                    <CheckCircle size={16} />
                  </button>
                ) : (
                  <button onClick={() => startEdit(task.id, task.text)} className="text-[color:var(--ink-muted)] hover:text-blue-500 active:scale-90 transition-all duration-200" aria-label="Edit task">
                    <Edit2 size={16} />
                  </button>
                )}

                <button onClick={() => handleDelete(task.id)} className="text-[color:var(--ink-muted)] hover:text-red-500 active:scale-90 transition-all duration-200" aria-label="Delete task">
                  <Trash2 size={16} />
                </button>
              </div>

              {successMsg[task.id] && <span className="text-xs text-green-500 mt-1">{successMsg[task.id]}</span>}
            </div>
          ))}
          {tasks.length === 0 && <p className="text-sm text-[color:var(--ink-muted)]">No active tasks</p>}
        </div>
      </div>

      {/* COMPLETED TASKS / HISTORY */}
      <div>
        <button
          onClick={() => setShowCompleted(prev => !prev)}
          className="flex items-center gap-2 text-sm font-medium mb-2 text-[color:var(--ink-muted)] hover:text-[color:var(--ink-accent)] transition-all duration-200"
        >
          {showCompleted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          Completed Tasks
        </button>

        {showCompleted && (
          <div className="space-y-2">
            {completedTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between border-b border-[color:var(--border-soft)] pb-2 rounded-md opacity-70">
                <span className="text-sm line-through text-green-500">{task.text}</span>
                <button onClick={() => handleDelete(task.id, true)} className="text-[color:var(--ink-muted)] hover:text-red-500 active:scale-90 transition-all duration-200" aria-label="Delete task">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {completedTasks.length === 0 && <p className="text-sm text-[color:var(--ink-muted)]">No completed tasks yet</p>}
          </div>
        )}
      </div>
    </div>
  );
}
