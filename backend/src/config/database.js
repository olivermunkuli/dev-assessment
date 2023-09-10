const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,        
  user: process.env.MYSQL_USERNAME,     
  password: process.env.MYSQL_PASSWORD, 
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,        
  connectionLimit: 10,            
}).promise();


const createContact = async (clientId, type, number) => {
  try {
    const [row] 
      = await pool.query('INSERT INTO contact_info (client_id, type, number) VALUES (?, ?, ?)', [clientId, type, number]);
    
    return await getClientsWithAddressesAndContacts(clientId);

  } catch (err) {
    throw err;
  }
}


const createAddress = async (clientId, type, street, city, province, postal_code) => {
  try {
    const [result] = await pool.query('INSERT INTO addresses (client_id, type, street, city, province, postal_code) VALUES (?, ?, ?, ?, ?, ?)',
       [clientId, type, street, city, province, postal_code]);

  
    return await getClientsWithAddressesAndContacts(clientId);

  } catch (err) {
    throw err;
  }
}


const getClientsWithAddresses = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        clients.id AS id,
        clients.name AS name,
        clients.surname AS surname,
        clients.email AS email,
        clients.gender AS gender,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'type', addresses.type,
            'street', addresses.street,
            'city', addresses.city,
            'province', addresses.province,
            'postal_code', addresses.postal_code
          )
        ) AS addresses
      FROM clients
      INNER JOIN addresses ON clients.id = addresses.client_id
      GROUP BY id, name, surname, email, gender;`
    );
   
   return rows;
   
  } catch (error) {
    throw error;
  }
}

const getClientsWithAddressesAndContacts = async (clientId) => {
  try {
    const [rows] = await pool.execute(
    `SELECT 
      clients.id AS id,
      clients.name AS name,
      clients.surname AS surname,
      clients.email AS email,
      clients.gender AS gender,

      ( SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'type', addresses.type,
              'street', addresses.street,
              'city', addresses.city,
              'province', addresses.province,
              'postal_code', addresses.postal_code
            )
          ) 
        FROM addresses WHERE client_id = ?
      ) AS addresses,

      ( SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'type', contact_info.type,
              'number', contact_info.number
            )
          ) 
        FROM contact_info WHERE client_id = ?
      ) AS contacts

    FROM clients
    WHERE clients.id = ?`, [clientId, clientId, clientId]);

   return rows[0];
   
  } catch (error) {
    throw error;
  }
}

const createClient = async (name, surname, email, gender, addresses, contacts) => {
  try {
    await pool.execute('CALL sp_CreateClient(?, ?, ?, ?, ?, ?, @p_client_id)', [
      name, surname, email, gender, JSON.stringify(addresses), JSON.stringify(contacts)
    ]);
    const [outParameters] = await pool.query('SELECT @p_client_id AS p_client_id');
    const clientId = outParameters[0].p_client_id;
    return await getClientsWithAddressesAndContacts(clientId);

  } catch (error) {
    throw error;
  }
}

const updateClient = async (clientId, name, surname, email, gender, addresses, contacts) => {
  try {

    await pool.execute('CALL sp_UpdateClient(?, ?, ?, ?, ?, ?, ?)', [
      clientId, name, surname, email, gender, JSON.stringify(addresses), JSON.stringify(contacts)
    ]);
  
    return await getClientsWithAddressesAndContacts(clientId);

  } catch (error) {
    throw error;
  }
}


const deleteClient = async (clientId) => {
  try {
    await pool.execute('CALL sp_DeleteClient(?)', [clientId]);
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createContact,
  createAddress,
  deleteClient,
  createClient,
  updateClient,
  getClientsWithAddresses
};