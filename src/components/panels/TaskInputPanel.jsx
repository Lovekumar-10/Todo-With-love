
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export default function TaskInputPanel({ addTask, maxChars = 100 }) {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  // Update input but enforce max chars
  const handleChange = (e) => {
    let value = e.target.value;

    // Enforce character limit
    if (value.length > maxChars) {
      value = value.slice(0, maxChars);
    }

    setText(value);
  };

  // Add task
  const addTaskHandler = () => {
    const trimmedText = text.trim();
    if (!trimmedText || clicked) return;

    addTask(trimmedText);
    setText("");

    // Play sound
    const audio = new Audio(
      "https://orangefreesounds.com/wp-content/uploads/2025/12/Soft-ui-notification-sound-effect.mp3"
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});

    // Button feedback
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  // Enter key trigger
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-sm font-medium mb-2 text-[color:var(--ink-muted)]">
        Add Task
      </h2>

      <div className="space-y-2">
        <input
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Write your task… every little thing matters"
          className="
            w-full bg-transparent
            border-b border-[color:var(--border-soft)]
            focus:outline-none py-2
            text-main
          "
        />

        {/* Live character counter */}
        <div className="text-xs text-[color:var(--ink-muted)] flex justify-end">
          {text.length}/{maxChars} chars
        </div>

        <button
          onClick={addTaskHandler}
          className={`
            inline-flex items-center gap-2
            text-sm px-3 py-1.5 rounded-md
            border border-[color:var(--border-soft)]
            transition-all duration-300
            ${clicked
              ? "bg-green-500 text-white"
              : "text-[color:var(--ink-accent)] hover:bg-black/5 dark:hover:bg-white/5"
            }
          `}
        >
          {clicked ? <Check size={16} /> : <Plus size={16} />}
          {clicked ? "Added!" : "Add Task"}
        </button>
      </div>
    </div>
  );
}
