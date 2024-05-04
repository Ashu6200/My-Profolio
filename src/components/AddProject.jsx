"use client";
import React, { useState } from "react";
import Highlight from "./Highlight";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";

const AddProject = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyPoints, setKeyPoints] = useState([
    { title: "Untitled Title", points: [""] },
  ]);
  const [projectImage, setProjectImage] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [rating, setRating] = useState();

  const handleTechnologiesChange = (skills) => {
    setTechnologies(skills);
  };

  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: "transparent",
      border: "none",
    }),
  };
  const [dragging, setDragging] = useState(false);
  const handleFileChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setProjectImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleDragOver = e => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = e => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.file?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setProjectImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  const reseTFields = () => {
    setTitle("");
    setDescription("");
    setKeyPoints([{ title: "Untitled Title", points: [""] }]);
    setProjectImage("");
    setGithubLink("");
    setLiveLink("");
    setTechnologies([]);
    setRating();
  };
  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: title,
      description: description,
      keyPoints: keyPoints,
      projectImage: projectImage,
      githubLink: githubLink,
      liveLink: liveLink,
      technologies: technologies.map((item) => item.value),
      rating: rating,
    };
    console.log(data);
    try {
      const res = await axios.post("/api/work", data);
      if (res.status === 200 && res.statusText === "OK") {
        toast.success("Project successfully posted");
        reseTFields();
      } else {
        toast.error("Failed to post Pproject");
      }
    } catch (error) {
      console.error("Error posting project", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>
          Project Title
        </label>
        <input
          type='text'
          name='title'
          placeholder='Enter the Project Title'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4  dark:text-[#fff] text-black'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>
          Project Description
        </label>
        <textarea
          rows={5}
          type='text'
          name='title'
          placeholder='Enter the Project Description'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4  dark:text-[#fff] text-black'
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className='w-full'>
        <label className='pb-2 dark:text-[#fff] text-black '>
          Project Image
        </label>
        <input
          type='file'
          accept='image/*'
          id='file'
          className='hidden'
          onChange={handleFileChange}
        />
        <label
          htmlFor='file'
          className={`w-full min-h-[10vh] border dark:border-[#755BB4] p-3 flex flex-col items-center justify-center rounded-[5px] mt-2 ${dragging ? "bg-blue-500" : "bg-transparent"
            }`}
          onDrag={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {projectImage ? (
            <>
              <Image
                src={projectImage}
                alt=''
                width={100}
                height={100}
                className='max-h-full w-full object-contain'
              />
              <button
                className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#755BB4] text-center text-[#fff] rounded mt-8'
                onClick={() => setProjectImage(null)}
              >
                Remove Image
              </button>
            </>
          ) : (
            <span className='text-black dark:text-white'>
              Drag and drop your thumbnail here clickk to browse
            </span>
          )}
        </label>
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>
          KeyPoints of Project
        </label>
        <Highlight
          setPoints={setKeyPoints}
          points={keyPoints}
          name={"keyPoints"}
          type={"Project"}
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>Github Link</label>
        <input
          type='url'
          name='title'
          placeholder='Enter the Project Title'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4  dark:text-[#fff] text-black'
          onChange={e => setGithubLink(e.target.value)}
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>Live Link</label>
        <input
          type='url'
          name='title'
          placeholder='Enter the Project Title'
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4  dark:text-[#fff] text-black'
          onChange={e => setLiveLink(e.target.value)}
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>Rating</label>
        <input
          type='number'
          name='rating'
          placeholder='Enter the rating of Project '
          className='bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 outline-none mb-4  dark:text-[#fff] text-black'
          onChange={e => setRating(e.target.value)}
        />
      </div>
      <div className='my-2 flex flex-col'>
        <label className='pb-2 dark:text-[#fff] text-black '>
          Technologies
        </label>
        <CreatableSelect
          isClearable
          isMulti
          classNamePrefix='select'
          options={technologies}
          styles={colourStyles}
          getOptionLabel={(option) => option.value}
          getOptionValue={(option) => option.value}
          onChange={handleTechnologiesChange}
          className='basic-multi-select bg-transparent border dark:border-[#755BB4] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-0 outline-none mb-4  dark:!text-[#fff] !text-black '
        />
      </div>
      <button
        disabled={loading}
        className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#755BB4] text-center text-[#fff] rounded mt-8'
        onClick={submit}
      >
        Create Project
      </button>
    </form>
  );
};

export default AddProject;
