import React, { useEffect, useState } from "react";
import book from "../Assets/book.svg";
import line from "../Assets/Line 3.svg";
import plus from "../Assets/Group 2.svg";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import AddNotes from "../components/AddNotes";
import Notes from "../components/Notes";
// import {AiOutlineLoading3Quarters} from "react-icons/ai";
import Swal from 'sweetalert2';
import axios from "axios";

export default function Home() {
  const [notes, setNotes] = useState([]); // Task State
  const [loading, setloading] = useState(true);
  const [modal, setModal] = useState(false);
  

  const [filteredNotes, setFilteredNotes] = useState([]);

  
  // const filterNotes = e => { 
  //   const search = e.target.value.toLowerCase()
  //   const filteredNotes = setNotes.filter(notes => notes.id.toLowerCase().includes(search))
  //   setNotes(filteredNotes)
  // }
  

 

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3500);
  }, []);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };


  const handleSearch = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = filteredNotes?.filter((data) => {
        return (
          data.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          data.description?.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      setNotes(results);
    } else {
      setNotes(filteredNotes);
    }
  };

  // const addNote = (note) => {
  //   const id = uuidv4();
  //   const newNotes = { id, ...note };
  //   setNotes([...notes, newNotes]);
    // alert("You have successfully added a new note!");
    const addNote = async (note) => {
      const newNotes = { ...note};
      try{
        await axios
        .post("http://localhost:8000/api/createform", newNotes)
        .then((res) => {
          console.log(res.data);
          alert("You have successfully added a new note!");
          setModal(false);
      });
      } catch(err) {}
    };
    // addNote();
    // alert("You have successfully added a new note!");
    // useEffect(() => {
    //   const addNote = async () => {
    //     try{
    //       await axios.get("http://localhost:8000/api/getform")
    //       .then((res) => {
    //         setNotes(res.data);
    //         setFilteredNotes(res.data);
    //     });
    //     } catch(err) {}
    //   };
    //   addNote();
    // }, []);
  //   Swal.fire({
  //     title: 'Success!!!',
  //     text: 'You have successfully added a new note!',
  //     icon: 'Oops',
  //     confirmButtonText: 'Cool'
  //   })
  // //   setModal(false);
  //   localStorage.setItem("noteAdded", JSON.stringify([...notes, newNotes]));
  // };

   // Fetching from Local Storage
  //  const getNotes = JSON.parse(localStorage.getItem("noteAdded"));  
  //    if (getNotes == null) {
  //      setNotes([]);
  //      setFilteredNotes([]);
  //    } else {
  //      setNotes(getNotes);
  //      setFilteredNotes(getNotes);
  //    }
  //  }, []);

        
          const getForm = () => {
            try{
               axios.get("http://localhost:8000/api/getform")
              .then((res) => {
                setNotes(res.data.form);
                setFilteredNotes(res.data.form);
                console.log(res.data);
            });
            } catch(err) {}
          };

          useEffect( getForm , []);
  // const deleteNotes = (id) => {
  //   const deleteNote = notes.filter((note) => note.id !== id);
  //   setNotes(deleteNote);
  //   alert("You have successfully deleted a note!");
  //   Swal.fire({
  //     title: 'Success!!!',
  //     text: 'You have successfully deleted a note!',
  //     icon: 'Oops',
  //     confirmButtonText: 'Cool'
  //   })
  //   localStorage.setItem("noteAdded", JSON.stringify(deleteNote));
  // };
          
  const deleteNotes = async (id) => {
    const deleteNote = notes.filter((note) => note.id !== id);
    setNotes(deleteNote);
    try{
      await axios.delete(`http://localhost:8000/api/deleteform/${id}`)
      .then((res) => {
        console.log(res.data);
        alert("You have successfully deleted a note!");
        setModal(false);
    });
    } catch(err) {}
  };
  useEffect( getForm , []);

  // Edit Task
  const editTask = (id) => {
    const title = prompt("Title");
    const description = prompt("Description");
    const data = JSON.parse(localStorage.getItem("noteAdded"));
    const myData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
          description: description,
          id: uuidv4(),
        };
      }
      return item;
    }); 

    


     


  // const editTask = async (id) => {
  //   const {title, description} = id.body;
  //   try{  
  //     await axios.put(`http://localhost:8000/api/updateform/${id}`, {title, description})
  //     .then((res) => {
  //       console.log(res.data);
  //       alert("You have successfully edited an existing note!");
  //       setModal(false);
  //   });
  //   } catch(err) {
  //     console.log(err);
  //   }
    
          
          


    alert("You have successfully edited an existing note!");
    Swal.fire({
      title: 'Success!!!',
      text: 'You have successfully edited an existing note!',
      icon: 'Oops',
      confirmButtonText: 'Cool'
    })
    localStorage.setItem("noteAdded", JSON.stringify(myData));
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <div className="spinnerContainer flex justify-center mt-[450px] animate-ping">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center bg-[#E5E5E5]">
          <main className="flex flex-col h-screen justify-between w-[500px] bg-white">
            <header>
              <span className="flex items-center gap-4 mt-8 pl-6">
                <img src={book} alt="book" className="w-7 h-7" />
                <p>Notes by Skillz By Emmy</p>
              </span>

              <img src={line} alt="" className="mb-2 mt-3 w-full" />
              <img src={line} alt="" className=" mb-2 mt-2 w-full" />
            </header>

            {/* <section>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search"
                // onChange= { (e) => filterNotes(e)}

                onChange= { (event) => handleSearch(event)}
                className="border border-[#FA9F5E] rounded-[45px] w-[85%] h-[75px] mx-10 text-lg font-[roboto] pl-8 leading-5 box-border "
              />
            </section> */}

            <div className="px-6 mt-4">
          <input
            className="border border-[#FA9F5E] rounded-full h-14 w-full px-6 outline-none"
            placeholder="Search..."
            onChange={(event) => handleSearch(event)}
          />
        </div>
            <section className="px-6">
              {notes.length > 0 ? (
                <Notes notes={notes} onDelete={deleteNotes} onEdit={editTask} />
              ) : (
                <p className="text-center">No items to display</p>
              )}
            </section>

            <footer className="w-full flex justify-end mb-12 pr-6">
              <button
                className="rounded-full bg-[#FB6900] text-white w-12 h-12 flex justify-center items-center"
                onClick={openModal}
              >
                <img src={plus} alt="" />
              </button>
            </footer>
          </main>

          <Modal
            style={{
              overlay: {
                position: "fixed",
                top: "0%",
                left: "0%",
                right: "0%",
                bottom: "0%",
                backgroundColor: "#00000078",
                zIndex: 100,
              },
            }}
            className="absolute top-[100px] mx-4 rounded-[5px] lg:top-auto mt-[30vh] left-0 lg:left-[35%] lg:right-[35%] right-0 h-auto pb-12 overflow-y-auto overflow-auto bg-[#FFFDFD] z-50 outline-none border-0 flex flex-col justify-between shadow-[5px_5px_30px_0px_#00000040]"
            isOpen={modal}
            shouldCloseOnOverlayclick={true}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <AddNotes onSave={addNote} />
          </Modal>
        </div>
      )}
    </>
  );
}
