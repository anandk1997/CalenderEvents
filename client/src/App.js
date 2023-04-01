import './App.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Button } from 'react-bootstrap';
import { useReducer, useRef, useState } from 'react';
import EventModal from './Components/EventModal';

function App() {
  const FormDetails = {
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    priority: ""
  }
  const [addModal, setAddModal] = useReducer((show) => !show, false)
  const [addForm, setAddForm] = useState(FormDetails)
  const eventRef = useRef(null)

  const addFormOnchange = (e) => {
    const { name, value } = e.target
    setAddForm({ ...addForm, [name]: value })
  }

  const addEvent = (e) => {
    e.preventDefault()
    let eventApi = eventRef.current.getApi()
    eventApi.addEvent(e)
    // const newEvent = { title: 'New Event', startDate: '2023-04-10' };
    // eventApi.addEvent(newEvent);
    setAddModal()

    console.log(eventApi)
  }



  return (
    <>

      <EventModal
        show={addModal}
        handleClose={setAddModal}
        Heading={"Create Event"}
        TitleOnchange={(e) => addFormOnchange(e)}
        TitleValue={addForm?.title}
        EndDateOnchange={(e) => addFormOnchange(e)}
        EndDateValue={addForm?.endDate}
        StartDateValue={addForm?.startDate}
        StartDateOnchange={(e) => addFormOnchange(e)}
        DescriptionValue={addForm?.description}
        DescriptionOnchange={(e) => addFormOnchange(e)}
        SelectValue={addForm?.priority}
        SelectOnchange={(e) => addFormOnchange(e)}
        Submit={(e) => addEvent(e)}
      />
      {
        /**
         * 
        // <Button variant="" onClick={setAddModal}>Add Event</Button>
         */
      }

      <Button variant="" onClick={addEvent}>Add Event</Button>

      <FullCalendar
        ref={eventRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </>
  );
}

export default App;
