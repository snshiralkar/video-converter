import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const onSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    setFile(formData.get("video"));
    const response = await axios.post(
      "http://localhost:3001/convert",
      formData,
      {
        onUploadProgress: (e) => {
          const p = (e.loaded * 100) / e.total;
          setProgress(p);
        },
      }
    );
    console.log(response.data);
  };
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <div className="bg-white md:p-16 rounded-lg  shadow-lg md:w-6/12 p-10">
        <h1 className="text-5xl font-bold mb-8">Video Converter</h1>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <div className="flex">
            <input
              required
              type="file"
              name="video"
              accept="video/*"
              className="flex-1 bg-gray-200 p-3 rounded"
            />
            <select
              required
              name="format"
              className="bg-blue-500 p-3 rounded text-white text-md"
            >
              <option value=".mp3">.mp3</option>
              <option value=".mp4">.mp4</option>
              <option value=".3gp">.3gp</option>
            </select>
          </div>
          <button className="bg-blue-500 text-white  w-fit py-2 px-5 text-lg font-semibold rounded">
            Submit
          </button>
        </form>
        {file && (
          <>
            <div className="flex justify-between my-3">
              <label className="capitalize font-semibold">{file.name} </label>
              <label className="text-zinc-600">
                {(file.size / 1000 / 1000).toFixed(1)}MB
              </label>
            </div>
            <div className="bg-gray-200 h-8">
              <div
                className="bg-green-500  h-full"
                style={{
                  width: progress + "%",
                }}
              ></div>
              <label className="text-zinc-600 font-semibold">
                Progress - {Math.floor(progress) + "%"}
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
