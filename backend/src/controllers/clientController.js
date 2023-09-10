const {
    createContact,
    createAddress,
    createClient, 
    getClientsWithAddresses, 
    deleteClient,
    updateClient
  } = require('../config/database') 


const getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await getClient(clientId);
        
    if (!client) return res.status(404).json({ error: 'Client not found' });
    
    res.status(200).json(client);
  } catch (err) {
    console.error("Error retrieving client:\n", err);
    res.status(500).json({error: err.message });
  }
}

const deleteClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    await deleteClient(clientId);
    res.status(204).send(); 
  } catch (err) {
    console.error("Error deleting client:\n", err);
    res.status(500).json({error: err.message });
  }
}

const createContactById = async(req, res) => {
  try {
    const clientId = req.params.id;
    const { type, number } = req.body;
    const contacts = await createContact(clientId, type, number);
    res.status(201).send(contacts); 
  } catch (err) {
    console.error("Error creating contact details:\n", err);
    res.status(500).json({error: err.message });
  }
}

const createAddressById = async(req, res) => {
  try {
    const clientId = req.params.id;
    const { type, street, city, province, postal_code } = req.body;
    const addesses = await createAddress(clientId, type, street, city, province, postal_code);
    res.status(201).send(addesses); 
  } catch (err) {
    console.error("Error creating address:\n", err);
    res.status(500).json({ error: err.message });
  }
}

const updateClientById = async(req, res) => {
  try {
    const clientId = req.params.id;
    const { name, surname, email, gender, addresses, contacts } = req.body;  
    const client = await updateClient(clientId, name, surname, email, gender, addresses, contacts);
    res.status(200).json(client);
  } catch (err) {
    console.error('Error updating client:\n', err);
    res.status(500).json({ error: err.message });
  }
}

const getAllClients = async(_, res) => {
  try {
    const clients = await getClients();
    res.status(200).json({data: clients});
  } catch (err) {
    console.error('Error retrieving clients:\n', err);
    res.status(500).json({ error: err.message });
  }
}

const getClientsAndTheirAddresses = async(_, res) => {
  try {
    const clients = await getClientsWithAddresses();
    res.status(200).json({data: clients});
  } catch (err) {
    console.error('Error retrieving clients:\n', err);
    res.status(500).json({ error: err.message });
  }
}

const createNewClient = async (req, res) => {
  try {
    const { name, surname, email, gender, addresses, contacts } = req.body;  
    const client = await createClient(name, surname, email, gender, addresses, contacts);
    res.status(201).json(client);
  } catch (err) {
    console.error('Error creating client:\n', err);
    res.status(500).json({ error: err.message });
  }
}


module.exports = {
  getClientById, 
  deleteClientById,
  createContactById,
  createAddressById,
  createNewClient,
  updateClientById,
  getAllClients,
  getClientsAndTheirAddresses
}