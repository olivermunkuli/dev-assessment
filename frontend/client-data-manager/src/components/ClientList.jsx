import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useClients } from '../contexts/ClientsContext';
import Spinner from '../components/Spinner';
import NewClientForm from '../components/NewClientForm'; 
import EditClientForm from '../components/EditClientForm'; 

const ClientList = () => {
  const { isLoading, clients, setCurrentClient, currentClient, deleteClient } = useClients();
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  const toggleAddClientForm = (flag) => {
    setShowAddClientForm(flag);
  };


  if (isLoading) return <Spinner />;


  return (
    <div className="container mt-4">
      {showAddClientForm ? (
        <NewClientForm onClose={toggleAddClientForm} />
      ) : currentClient.id > 0 ? ( 
        <EditClientForm
          onClose={toggleAddClientForm} 
          clientData={clients.find((client) => client.id === currentClient.id)} 
        />
      ) : (
        <div>
          <h2>Client List</h2>
          <Table striped bordered hover>
            <thead>
              <tr key="heading">
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.name}</td>
                    <td>{client.surname}</td>
                    <td>{client.email}</td>
                    <td>{client.gender}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => toggleAddClientForm(false)} 
                      >
                        View
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteClient(client.id)}
                      >
                        Delete
                      </Button>{' '}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="notavailable">
                  <td colSpan="5">No clients available.</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Button variant="success" onClick={() => toggleAddClientForm(true)}>
             Add New Client
</Button>

        </div>
      )}
    </div>
  );
};

export default ClientList;
