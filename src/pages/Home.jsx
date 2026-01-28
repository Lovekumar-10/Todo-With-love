function Home() {
  return (
 <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
  <div className="grid grid-cols-12 gap-6">

    {/* LEFT PANEL */}
    <section className="col-span-12 md:col-span-5 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg p-5">
      <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
        ➕ Add Task
      </h2>

      <input
        type="text"
        placeholder="Enter task title..."
        className="w-full border dark:border-gray-700 rounded-md px-4 py-3 mb-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2">
        {/* Plus Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Task
      </button>
    </section>

    {/* RIGHT PANEL */}
    <section className="col-span-12 md:col-span-7 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg p-5">
      <h2 className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
        📋 Active Tasks
      </h2>

      <div className="space-y-3">
        {/* Task Row */}
        <div className="flex items-center justify-between border dark:border-gray-700 rounded-md px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Checkbox Icon */}
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" />
            </svg>

            <span className="text-gray-800 dark:text-gray-100">
              Example task item
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Done */}
            <button className="text-green-600 hover:text-green-700">
              ✔
            </button>

            {/* Delete */}
            <button className="text-red-500 hover:text-red-600">
              ✖
            </button>
          </div>
        </div>
      </div>
    </section>

  </div>
</main>

  )
}

export default Home
