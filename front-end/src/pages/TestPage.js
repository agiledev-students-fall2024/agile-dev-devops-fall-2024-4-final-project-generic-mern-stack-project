import React, { useState } from 'react';
import Button from '../components/button'
import {Form, Dropdown, InputField} from '../components/form'
import {Notif, NotifContainer} from '../components/notif';
import Card from '../components/card';
import Modal from '../components/modal';

/**
 * A React component that represents a single page of the app.
 * Use this file to create new pages as needed
 * Don't forget to add the new route to App.js
 */
const TestPage = props => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted');
      };

  // nesscessary for notif component
  const [notifs, setNotitfs] = useState([]);

  const addNotif = (message, type) => {
    setNotitfs((prev) => [...prev, { message, type }]);
  };

  // nesscessary for modal component
  const [isModalOpen, setModalOpen] = useState(false);


    return (
      <div>
         <h1 className="text-2xl font-bold mb-4">Component Playground</h1>

        {/* Example Button */}
        <Button>Test Button</Button>


        {/* Example Form with InputField and Dropdown */}
        <Form onSubmit={handleSubmit}>
                {/* InputField without state management */}
                <InputField type="text" placeholder="Test Input" label="Name" />

                {/* Dropdown without state management */}
                <Dropdown
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' }
                ]}
                />
        </Form>


      {/* Example notif trigger workflow */}
      <div>
        <Button onClick={() => addNotif('I am a bad notification!!!!!!!!!!!!! Oh nnoooooooooooooooooooooooooooooo', 'error')} >Add Bad Notification </Button>
      </div>
      <div>
        <Button onClick={() => addNotif('I am a notification!!!!!!!!!!!!! Yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay', 'success')} >Add Notification </Button>
      </div>
      <NotifContainer notifs={notifs} setNotifs={setNotitfs} />

       {/* Example card */}

      <Card title="Optional Title">
        <p>This is some content inside the card.</p>
      </Card>

      {/* Example modal */}
      <Button onClick={() => setModalOpen(true)}>  Open Modal </Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
        <p>This is the modal content. You can add buttons and stuff</p>
        <br></br>
        <Button> Hii  </Button> 
      </Modal>




      </div>
    )
  }
  
  // make this component available to be imported into any other file
  export default TestPage