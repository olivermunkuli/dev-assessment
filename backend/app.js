const cors = require('cors');
const express = require('express');
const app = express();


const { 
    getClientById, 
    deleteClientById, 
    createContactById,
    createNewClient, 
    createAddressById, 
    updateClientById,
    getAllClients,
    getClientsAndTheirAddresses
   } = require('./src/controllers/clientController')

   app.use(cors())
app.use(express.json());

app.get("/clients/:id", getClientById)

app.delete("/clients/:id", deleteClientById);

app.post("/clients/contacts/:id", createContactById);

app.post("/clients/addresses/:id", createAddressById);

app.patch("/clients/:id", updateClientById);

app.get("/clients", getAllClients);

app.get("/clients-with-addresses", getClientsAndTheirAddresses);

app.post("/clients", createNewClient);


module.exports = app;