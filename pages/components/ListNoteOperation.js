import styles from '../../styles/Mynote.module.css'
import { useState, useEffect } from 'react';
import { app, database } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc, onSnapshot, db } from 'firebase/firestore';
const dbInstance = collection(database, 'notes');

export default function ListNoteOperations({ getSingleNote }) {
    const [notesArray, setNotesArray] = useState([]);
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
            <div>
                {notesArray.map((note) => {
                    return (
                        <div
                            key={note.id}
                            className="max-w-sm bg-white border-2 border-gray-300 m-3 p-3 rounded-md tracking-wide shadow-lg"
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </div>
        </>
    )
}