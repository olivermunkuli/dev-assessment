import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useClients } from '../contexts/ClientsContext';
import Spinner from '../components/Spinner';

const EditClientForm = ({ onClose }) => {
  const { updateClient, currentClient } = useClients();
  const [formData, setFormData] = useState(); 


  useEffect(() => {
    setFormData({ ...currentClient });
  }, [currentClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index][name] = value;
    setFormData({
      ...formData,
      addresses: updatedAddresses,
    });
  };

  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.contacts];
    updatedContacts[index][name] = value;
    setFormData({
      ...formData,
      contacts: updatedContacts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(formData.id, formData);
      onClose();
    } catch (err) {
      alert(err.message);
      console.error('Error updating client:', err);
    }
  };

  if (formData.contacts == undefined) 
  {
    console.log(currentClient)
    return <Spinner />;
   
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Client</h2>
      <br />
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
  
      <Form.Group controlId="surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="gender">
  <Form.Label>Gender</Form.Label>
  <Form.Select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </Form.Select>
</Form.Group>

<br />
<br />
<h3>Addresses</h3>

<Row key="residential">     
        <Col>
            <Form.Group controlId="residential">
            <Form.Label>Address Type</Form.Label>
            <Form.Control
                type="text"
                name="residential"
                value={formData.addresses[0].type}
                onChange={(e) => handleAddressChange(e, 0)}
                disabled
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
                type="text"
                name="street"
                value={formData.addresses[0].street}
                onChange={(e) => handleAddressChange(e, 0)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                name="city"
                value={formData.addresses[0].city}
                onChange={(e) => handleAddressChange(e, 0)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control
                type="text"
                name="province"
                value={formData.addresses[0].province}
                onChange={(e) => handleAddressChange(e, 0)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                name="postal_code"
                value={formData.addresses[0].postal_code}
                onChange={(e) => handleAddressChange(e, 0)}
                required
            />
            </Form.Group>
        </Col>
    </Row>


    <Row key="work">     
        <Col>
            <Form.Group controlId="work">
            <Form.Label>Address Type</Form.Label>
            <Form.Control
                type="text"
                name="work"
                value={formData.addresses[1].type}
                onChange={(e) => handleAddressChange(e, 1)}
                disabled
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
                type="text"
                name="street"
                value={formData.addresses[1].street}
                onChange={(e) => handleAddressChange(e, 1)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                name="city"
                value={formData.addresses[1].city}
                onChange={(e) => handleAddressChange(e, 1)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control
                type="text"
                name="province"
                value={formData.addresses[1].province}
                onChange={(e) => handleAddressChange(e, 1)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                name="postal_code"
                value={formData.addresses[1].postal_code}
                onChange={(e) => handleAddressChange(e, 1)}
                required
            />
            </Form.Group>
        </Col>
    </Row>


    <Row key="postal">     
        <Col>
            <Form.Group controlId="postal">
            <Form.Label>Address Type</Form.Label>
            <Form.Control
                type="text"
                name="postal"
                value={formData.addresses[2].type}
                onChange={(e) => handleAddressChange(e, 2)}
                disabled
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
                type="text"
                name="street"
                value={formData.addresses[2].street}
                onChange={(e) => handleAddressChange(e, 2)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                name="city"
                value={formData.addresses[2].city}
                onChange={(e) => handleAddressChange(e, 2)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="province">
            <Form.Label>Province</Form.Label>
            <Form.Control
                type="text"
                name="province"
                value={formData.addresses[2].province}
                onChange={(e) => handleAddressChange(e, 2)}
                required
            />
            </Form.Group>
        </Col>
        <Col>
            <Form.Group controlId="postal_code">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                name="postal_code"
                value={formData.addresses[2].postal_code}
                onChange={(e) => handleAddressChange(e, 2)}
                required
            />
            </Form.Group>
        </Col>
    </Row>



<br />
<br />
{/* Contact Information */}
<h3>Contact Details</h3>
<Row key="work_contact">
    <Col>
      <Form.Group controlId="work_contact">
        <Form.Label>Contact Type</Form.Label>
        <Form.Control
          type="text"
          name="work_contact"
          value={formData.contacts[0].type}
          onChange={(e) => handleContactChange(e, 0)}
          required
          disabled
        />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group controlId="number">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="text"
          name="number"
          value={formData.contacts[0].number}
          onChange={(e) => handleContactChange(e, 0)}
          required
        />
      </Form.Group>
    </Col>
  </Row>

  <Row key="cell_contact">
    <Col>
      <Form.Group controlId="cell">
        <Form.Label>Contact Type</Form.Label>
        <Form.Control
          type="text"
          name="cell"
          value={formData.contacts[1].type}
          onChange={(e) => handleContactChange(e, 1)}
          required
          disabled
        />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group controlId="number">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="text"
          name="number"
          value={formData.contacts[1].number}
          onChange={(e) => handleContactChange(e, 1)}
          required
        />
      </Form.Group>
    </Col>
  </Row>

<div className="mt-4 d-flex justify-content-end">
  <Button variant="primary" type="submit" className="me-2">
    Save
  </Button>
  
  <Button variant="secondary" onClick={() => onClose(false)} >
    Cancel
  </Button>
</div>

    </Form>
  );
}

export default EditClientForm;
