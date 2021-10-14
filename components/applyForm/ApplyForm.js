import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Form from '../../templates/ApplyTemplate/Form/Form';
import styles from './ApplyForm.module.scss'
import { formValidator } from '../../UTILS/validator';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInforModal } from '../../store/actions/popup';
import { toast } from 'react-toastify';

const ApplyForm = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const isUserInfoModal = useSelector(state => state.popup.isUserInfoModal)
  const dispatch = useDispatch()
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    description: '',
    city: '', 
    state: '', 
    zipCode: '', 
    country: '',
    errors: {}
  })

  const toggle = () => setModal(!modal);

  const handleChange = (value, name) => {
    const data = { ...state }
    data[name] = value
    setState(data)
  }

  const handleSubmit = async () => {
    let errors = formValidator(state)
    setState({ ...state, errors })

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      description,
      zipCode,
      country,
    } = state;

    let url = `https://api.airtable.com/v0/apprGy8I7xUg9pFUu/Lead%20Capture%20Data`;
    let x={
      fields:{
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      state:state.state,
      zipCode,
      streetAddress: description,
      country
    },
    typecast :true
    }
   
    const res = await fetch(url, {
      method: "post",
      headers: new Headers({
        Authorization: "Bearer keyybLhK60Knqwrh2",
        'Content-Type': 'application/json'
      }),
      body:JSON.stringify(x)
    });
      try {
        if(!Object.keys(errors).length){
          const data = { ...state }
          delete data.errors
          typeof window !== "undefined" && window.localStorage.setItem('USER_DETAILS', JSON.stringify(data))
          dispatch(setUserInforModal(false))
          toast('Your details are saved successfully.')
        }
      } catch (error) {
        
    }
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={isUserInfoModal} className={className}>
        <ModalBody className={styles.modalBody}>
            <Form
              formValues={state}
              handleChange={handleChange}
            />
        </ModalBody>
        <ModalFooter>
          <Button className={styles.submitButton} onClick={handleSubmit}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ApplyForm;