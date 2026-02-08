import React, { useState, useEffect } from "react";

const App = () => {
  const [note, setnote] = useState("");
  const [detail, setdetail] = useState("");

  // Load from localStorage first (important fix)
  const [task, settask] = useState(() => {
    const saved = localStorage.getItem("Task");
    return saved ? JSON.parse(saved) : [];
  });

  // Auto sync to localStorage
  useEffect(() => {
    localStorage.setItem("Task", JSON.stringify(task));
  }, [task]);

  function submithandler(e) {
    e.preventDefault();

    if (!note.trim() || !detail.trim()) return;

    settask([...task, { note, detail }]);
    setnote("");
    setdetail("");
  }

  let deletenote = (index) => {
    let copytask = [...task];
    copytask.splice(index, 1);
    settask(copytask);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col md:flex-row gap-6 md:gap-20 p-3 text-white">

      {/* FORM SECTION */}
      <form
        onSubmit={submithandler}
        className="flex w-full md:w-1/3 gap-5 p-4 md:p-10"
      >
        <div className="gap-5 flex flex-col w-full">
          <h1 className="text-2xl md:text-3xl font-bold">Add Notes</h1>

          <input
            value={note}
            onChange={(e) => setnote(e.target.value)}
            type="text"
            placeholder="Enter The Task"
            className="px-4 py-2 w-full rounded border bg-black text-white"
          />

          <textarea
            value={detail}
            onChange={(e) => setdetail(e.target.value)}
            placeholder="Enter The Detail"
            className="px-4 py-3 w-full rounded border bg-black text-white"
          />

          <button className="bg-white text-black font-bold text-lg px-5 py-2 rounded-2xl active:scale-95">
            Add Note
          </button>
        </div>
      </form>

      {/* NOTES SECTION */}
      <div className="w-full md:w-2/3 p-4 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold">Your Notes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">

          {task.map((ele, idx) => (
            <div
              key={idx}
              className="h-56 w-full relative flex flex-col bg-cover py-12 px-5 rounded-2xl text-black"
              style={{
                backgroundImage:
                  "url('https://static.vecteezy.com/system/resources/thumbnails/035/499/155/small/yellow-sticky-notes-png.png')",
              }}
            >
              <div>
                <h1 className="font-bold text-xl uppercase">{ele.note}</h1>
                <p className="leading-6 text-gray-700 capitalize mt-1">
                  {ele.detail}
                </p>
              </div>

              <button
                onClick={() => deletenote(idx)}
                className="bg-red-500 absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-semibold active:scale-95"
              >
                Delete
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default App;
