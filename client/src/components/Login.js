import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import '../style/Login.css';

export default function Login({ onIdSubmit }) {
  const idRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
     <Container className="containerStyle">
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group className="formGroup">
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <div className="buttonGroup">
          <Button type="submit" className="mr-2">Login</Button>
          <Button onClick={createNewId} variant="secondary">Create a New Id</Button>
        </div>
      </Form>
    </Container>
  )
}
