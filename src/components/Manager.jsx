import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editGifId, seteditGifId] = useState(null);
  const [deleteGifId, setdeleteGifId] = useState(null);
  const [copyGifId, setCopyGifId] = useState(null);
  const passRef = useRef();
  const eyeRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    if (eyeRef.current.src.includes("icons/eyecross.png")) {
      eyeRef.current.src = "icons/eye.png";
      passRef.current.type = "password";
    } else {
      eyeRef.current.src = "icons/eyecross.png";
      passRef.current.type = "text";
    }
  };

  const savePassword = () => {
    const updatedPasswordArray = [...passwordArray, {...form, id: uuidv4()}];
    setPasswordArray(updatedPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete the password?");
    if (c) {
      const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
    }
  };

  const editPassword = (id) => {
    const itemToEdit = passwordArray.find(i => i.id === id);
    setForm(itemToEdit);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditHover = (index) => {
    seteditGifId(index);
    setTimeout(() => seteditGifId(null), 3000); // Adjust the duration according to your GIF length
  };

  const handleDeleteHover = (index) => {
    setdeleteGifId(index);
    setTimeout(() => setdeleteGifId(null), 3000); // Adjust the duration according to your GIF length
  };


  const handleCopyClick = (index, column) => {
    setCopyGifId({ index, column });
    let textToCopy = "";
    switch (column) {
      case "site":
        textToCopy = passwordArray[index].site;
        break;
      case "username":
        textToCopy = passwordArray[index].username;
        break;
      case "password":
        textToCopy = passwordArray[index].password;
        break;
      default:
        break;
    }
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        console.log(`Copied to clipboard: ${textToCopy}`);
        setTimeout(() => setCopyGifId(null), 3000); // Adjust the duration according to your GIF length
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center">
            <span className="text-teal-500">&lt;</span>
            Pass
            <span className="text-teal-500">OP/&gt;</span>
          </h1>

          <p className="text-teal-900 text-center mb-8">Your own password manager</p>
          <div className="text-black flex flex-col p-4 gap-8 items-center">
            <input
              placeholder="Enter URL"
              className="rounded-full border border-teal-500 w-full text-black p-4 py-1"
              type="text"
              value={form.site}
              onChange={handleChange}
              name="site"
            />
            <div className="flex w-full flex-col md:flex-row justify-between gap-8">
              <input
                placeholder="Enter username"
                className="rounded-full border border-teal-500 w-full text-black p-4 py-1"
                type="text"
                value={form.username}
                onChange={handleChange}
                name="username"
              />
              <div className="relative w-full md:w-auto">
                <input
                  ref={passRef}
                  placeholder="Enter password"
                  className="rounded-full border border-teal-500 w-full text-black p-4 py-1"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                />
                <span className="absolute right-[3px] top-[3px] cursor-pointer">
                  <img
                    ref={eyeRef}
                    className="p-1"
                    width={30}
                    src="icons/eye.png" 
                    alt="show"
                    onClick={showPassword}
                  />
                </span>
              </div>
            </div>
            <button
              className="flex justify-center items-center bg-teal-500 hover:bg-teal-300 rounded-full px-4 py-2 w-fit border-2 border-teal-900"
              onClick={savePassword}
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="click"
              ></lord-icon>
              Add Password
            </button>
          </div>

          <div className="passwords mt-8">
            <h2 className="font-bold text-2xl py-4 text-center">Your Passwords</h2>
            {passwordArray.length === 0 && <div className="text-center">No passwords to show</div>}
            {passwordArray.length !== 0 && (
              <div className="overflow-x-auto">
                <table className="table-auto w-full rounded-md overflow-hidden">
                  <thead className="bg-teal-800 text-white">
                    <tr>
                      <th className="py-2">Site</th>
                      <th className="py-2">Username</th>
                      <th className="py-2">Password</th>
                      <th className="py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-teal-100">
                    {passwordArray.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center w-32 py-2 border-2 border-white break-words">
                          <div className="flex items-center justify-center gap-3 relative">
                            
                            <div className="w-[400px] mx-[5px]"><a href={item.site} target="_blank" rel="noopener noreferrer">
                              {item.site}
                            </a></div>
                            <div className="w-[25px] mx-[5px]">
                              <img
                                className=" right-[3px] top-[3px] cursor-pointer"
                                src={
                                  copyGifId && copyGifId.index === index && copyGifId.column === 'site'
                                    ? "icons/copy.gif"
                                    : "icons/copy.png"
                                }
                                width={25}
                                alt="copy"
                                onClick={() => handleCopyClick(index, 'site')}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            
                          </div>
                        </td>
                        <td className="text-center w-32 py-2 border-2 border-white break-words">
                          <div className="flex items-center justify-center gap-3 relative">
                            
                            <div className="w-[400px] mx-[5px]">{item.username}</div>
                            <div className="w-[25px] mx-[5px]">
                              <img
                                className=" right-[3px] top-[3px] cursor-pointer"
                                src={
                                  copyGifId && copyGifId.index === index && copyGifId.column === 'username'
                                    ? "icons/copy.gif"
                                    : "icons/copy.png"
                                }
                                width={25}
                                alt="copy"
                                onClick={() => handleCopyClick(index, 'username')}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            
                          </div>
                        </td>
                        <td className="text-center w-32 py-2 border-2 border-white break-words">
                          <div className="flex items-center justify-center gap-3 relative">
                          
                            <div className="w-[400px] mx-[5px]">{"*".repeat(item.password.length)}</div>
                            <div className="w-[25px] mx-[5px]">
                              <img
                                className=" right-[3px] top-[3px] cursor-pointer"
                                src={
                                  copyGifId && copyGifId.index === index && copyGifId.column === 'password'
                                    ? "icons/copy.gif"
                                    : "icons/copy.png"
                                }
                                width={25}
                                alt="copy"
                                onClick={() => handleCopyClick(index, 'password')}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            
                          </div>
                        </td>
                        <td className="w-fit text-center py-2 border-2 border-white">
                          <div className="flex w-[100px] items-center justify-center gap-5 ">
                            <span onClick={() => editPassword(item.id)}>
                              <img
                                src={
                                  editGifId === index
                                    ? "icons/edit.gif"
                                    : "icons/edit.png"
                                }
                                width={25}
                                alt="edit"
                                style={{ cursor: "pointer" }}
                                onMouseEnter={() => handleEditHover(index)}
                              />
                            </span>
                            <span onClick={() => deletePassword(item.id)}>
                              <img
                                src={
                                  deleteGifId === index
                                    ? "icons/bin.gif"
                                    : "icons/bin.png"
                                }
                                width={25}
                                alt="delete"
                                style={{ cursor: "pointer" }}
                                onMouseEnter={() => handleDeleteHover(index)}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default Manager;
