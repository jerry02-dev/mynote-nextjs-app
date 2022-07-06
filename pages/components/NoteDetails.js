import styles from '../../styles/Mynote.module.css'
import { useState, useEffect } from 'react';
import { app, database } from '../../firebaseConfig';
import { doc, getDoc, getDocs, collection, updateDoc,deleteDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';
const dbInstance = collection(database, 'notes');
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast';

export default function NoteDetails({ID}) {

    const MySwal = withReactContent(Swal)
    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');

    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
      }

    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            console.log({ ...data.data(), id: data.id })
            setSingleNote({ ...data.data(), id: data.id })
        }
    
    }

    useEffect(() => {
        getSingleNote();
      }, [ID])

      const editNote = (id) => {
        const collectionById = doc(database, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
        .then(() => {
            toast.notify('Note is Successfully Updated', {
                duration: 3,
                type: "success"
              })
              getSingleNote();
              window.setTimeout(function(){location.reload()},3000)
        })
    }

    const deleteNote = (id) => {
        const collectionById = doc(database, 'notes', id)
        Swal.fire({
            title: 'Are you sure?',
            text: 'Note will be Deleted',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
         }).then((result) => {
            if(result.value){
                deleteDoc(collectionById)
                .then(() => {
                    toast.notify('Note is Successfully Deleted', {
                        duration: 3,
                        type: "success"
                      })
                      window.setTimeout(function(){location.reload()},3000)
                })
            }else{
                      window.location.reload()
            }
         })
    }

    return (
        <>
<ToastContainer />
       

            {isEdit ? (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={setNoteDesc}
                            value={noteDesc}
                        />
                    </div>
                    <br/>
                    <button
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}>
                        Save Changes
                    </button>
                </div>
            ) : (
                <></>
            )}
            
            <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">{singleNote.noteTitle}</h1>
            <div className="max-w-sm bg-white border-2 border-gray-300 m-3 p-3 rounded-md tracking-wide shadow-lg">
                
                <div className="indent-4 md:indent-8" dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
               
            </div>

            {/* <div>
                Actions:&nbsp; 
                   <button
                       className=""
                       onClick={getEditData}
                   >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                        <path  cap="round"  join="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>

                    <button
                        className=""
                        onClick={() => deleteNote(singleNote.id)}
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path cap="round" join="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    </button>
               </div>  */}

<div className="inline-flex rounded-md shadow-md mt-10" role="group">
                    <button type="button" onClick={getEditData} className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#3F83F8" viewBox="0 0 24 24" stroke="currentColor" >
                        <path  cap="round"  join="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <p className='text-blue-600'>&nbsp;Edit</p>
                    </button>
                    <button type="button" onClick={() => deleteNote(singleNote.id)} className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#F05252" viewBox="0 0 24 24" stroke="currentColor" >
                    <path cap="round" join="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                        <p className='text-red-600'>&nbsp;Delete</p>
                    </button>
               </div>

               
        </>
    )
}