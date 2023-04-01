import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EventModal = ({
    Heading,
    handleClose,
    show,
    TitleOnchange,
    TitleValue,
    EndDateOnchange,
    EndDateValue,
    StartDateValue,
    StartDateOnchange,
    DescriptionValue,
    DescriptionOnchange,
    SelectValue,
    SelectOnchange,
    Submit
}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Heading}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input
                        name="title"
                        className='form-control mb-2'
                        placeholder='Title'
                        onChange={TitleOnchange}
                        value={TitleValue} />

                    <input
                        name="description"
                        className='form-control mb-2'
                        placeholder='Description'
                        onChange={DescriptionOnchange}
                        value={DescriptionValue} />

                    <input
                        type="date"
                        name="date"
                        className='form-control mb-2'
                        placeholder='Start Date'
                        onChange={StartDateOnchange}
                        value={StartDateValue} />

                    <input
                        type="date"
                        name="endDate"
                        className='form-control mb-2'
                        placeholder='End Date'
                        onChange={EndDateOnchange}
                        value={EndDateValue} />

                    <select
                        name="priority"
                        className='form-select mb-2'
                        value={SelectValue}
                        onChange={SelectOnchange} >
                        <option hidden>Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={Submit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EventModal