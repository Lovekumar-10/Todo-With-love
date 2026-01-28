


// import './App.css'
// import AppLayout from "./components/layout/AppLayout";
// import Header from "./components/layout/Header";
// import Panels from "./components/layout/Panels";
// import TaskInputPanel from "./components/panels/TaskInputPanel";
// import TaskListPanel from "./components/panels/TaskListPanel";
// import { useState } from "react";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);

//   const addTask = (text) => {
//     const newTask = { id: Date.now(), text };
//     setTasks(prev => [...prev, newTask]);
//   };

//   const updateTask = (id, newText) => {
//     setTasks(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t));
//   };

//   const deleteTask = (id, isCompleted = false) => {
//     if (isCompleted) {
//       setCompletedTasks(prev => prev.filter(t => t.id !== id));
//     } else {
//       setTasks(prev => prev.filter(t => t.id !== id));
//     }
//   };

//   const markDone = (taskId) => {
//     const doneTask = tasks.find(t => t.id === taskId);
//     if (!doneTask) return;

//     // Remove from active tasks
//     setTasks(prev => prev.filter(t => t.id !== taskId));

//     // Add to completed
//     setCompletedTasks(prev => [...prev, doneTask]);
//   };

//   return (
//     <AppLayout>
//       <Header />
//       <Panels
//         left={<TaskInputPanel addTask={addTask} />}
//         right={
//           <TaskListPanel
//             tasks={tasks}
//             completedTasks={completedTasks}
//             deleteTask={deleteTask}
//             updateTask={updateTask}
//             markDone={markDone}
//           />
//         }
//       />
//     </AppLayout>
//   );
// }

// export default App;





import './App.css'
import AppLayout from "./components/layout/AppLayout";
import Header from "./components/layout/Header";
import Panels from "./components/layout/Panels";
import TaskInputPanel from "./components/panels/TaskInputPanel";
import TaskListPanel from "./components/panels/TaskListPanel";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const stored = localStorage.getItem("completedTasks");
    return stored ? JSON.parse(stored) : [];
  });

  const addTask = (text) => {
    const newTask = { id: Date.now(), text };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, newText) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, text: newText } : t)
    );
  };

  const deleteTask = (id, isCompleted = false) => {
    if (isCompleted) {
      setCompletedTasks(prev => prev.filter(t => t.id !== id));
    } else {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const markDone = (taskId) => {
    const doneTask = tasks.find(t => t.id === taskId);
    if (!doneTask) return;

    setTasks(prev => prev.filter(t => t.id !== taskId));
    setCompletedTasks(prev => [...prev, doneTask]);
  };

  // 🔥 localStorage sync
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  return (
    <AppLayout>
      <Header />
      <Panels
        left={<TaskInputPanel addTask={addTask} />}
        right={
          <TaskListPanel
            tasks={tasks}
            completedTasks={completedTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            markDone={markDone}
          />
        }
      />
    </AppLayout>
  );
}

export default App;
