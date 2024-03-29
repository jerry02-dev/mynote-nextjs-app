import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NoteOperations from './components/NoteOperations';
import ListNoteOperation from './components/ListNoteOperation';
import NoteDetails from './components/NoteDetails';
import { useState } from 'react';

export default function Home() {


  const [ID, setID] = useState(null);

  const getSingleNote = (id) => {
    setID(id)
 }

  return (

    <div className="container mx-auto">
      <Head>
        <title>Mynote App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <div className="container">
          <div className={styles.left}>
            <NoteOperations getSingleNote={getSingleNote} />
          </div>
          <div className={styles.right}>
            <NoteDetails ID={ID} />
          </div>
        </div> */}

        <section className="pt-10 lg:pt-[30px] pb-10 lg:pb-20">
          <div className="container">
            <div className="flex flex-wrap justify-center -mx-4">
              <div className="w-full px-4">
                  <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                    <span className="font-semibold text-lg text-primary mb-2 block">
                    Mynote App ⚡
                    </span>
                    <h2
                        className="
                        font-bold
                        text-3xl
                        sm:text-4xl
                        md:text-[40px]
                        text-dark
                        mb-4
                        "
                        >
                        Mynote App v.1 🚀 
                    </h2>
                    <p className="text-base text-body-color">
                     Powered by:  Next.js, Tailwind CSS & Firebase
                    </p>
                  </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="max-w-[370px] mx-auto mb-10">
                    <div>
                    <NoteOperations />
                    </div>
                  </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="max-w-[370px] mx-auto mb-10">
                    <div>
                    <ListNoteOperation getSingleNote={getSingleNote} />
                    </div>
                  </div>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="max-w-[370px] mx-auto mb-10">
                    <div>
                    <NoteDetails ID={ID} />
                    </div>
                  </div>
              </div>
              
            </div>


          </div>        
        </section>
      </main>
    </div>
  )
}
