import styles from '../../styles/Mynote.module.css'
import { useState, useEffect } from 'react';
import { app, database } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc, onSnapshot, db } from 'firebase/firestore';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
const dbInstance = collection(database, 'notes');
import React from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';

export default function NoteOperations({ getSingleNote }) {
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const addDesc = (value) => {
        setNoteDesc(value) 
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                toast.notify('Note is Successfully Added', {
                    duration: 5,
                    type: "success"
                  })
                getNotes();
            })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
            
    }

    useEffect(  () => {
        onSnapshot(dbInstance, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                getNotes((prev) => [...prev, doc.data()])
                 console.log("onsnapshot", doc.data());
            })
        })

    }, [])

    return (
        <>
            <ToastContainer />
            <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
            <path  cap="round"  join="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
               &nbsp; <span>Create Note</span>
                </button>
          
        {/* 
            {isInputVisible ? ( */}
                <div className="mt-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                    </label>

                    <input
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />

                    <br/>
             
                    <div className={styles.ReactQuill}>
                        <br/>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Body
                        </label>
                        <ReactQuill 
                            placeholder='Enter the Body..'
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div>
                    <br/>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Add Note
                    </button>
                </div>
            {/* ) : (
                <></>
            )} */}
            {/* <div>
                {notesArray.map((note) => {
                    return (
                        <div
                            key={note.id}
                            className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </div> */}
        </>
    )
}