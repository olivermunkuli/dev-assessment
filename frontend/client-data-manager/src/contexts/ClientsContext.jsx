import {
    createContext,
    useContext,
    useEffect,
    useReducer,
  } from 'react';
  
  const BASE_URL = 'http://localhost:8080';
  const ClientsContext = createContext();
  
  const initialState = {
    clients: [],
    currentClient: {},
    isLoading: false,
    error: '',
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'loading':
        return {
          ...state,
          isLoading: true,
        };
      case 'client/set':
        const value = action.payload > 0 ? state.clients.filter((client) => client.id === action.payload)[0] : {}
        return {
          ...state,
          isLoading: false,
          currentClient: value
        };
      case 'client/loaded':
        return {
          ...state,
          isLoading: false,
          currentClient: action.payload,
        };
      case 'clients/loaded':
        return {
          ...state,
          isLoading: false,
          clients: action.payload,
        };
      case 'client/created':
        return {
          ...state,
          isLoading: false,
          clients: [...state.clients, action.payload],
        };
      case 'client/updated':
        return {
          ...state,
          isLoading: false,
          clients: [...state.clients, action.payload],
        };
      case 'client/deleted':
        return {
          ...state,
          isLoading: false,
          clients: state.clients.filter((client) => client.id !== action.payload),
          currentClient: {},
        };
      case 'rejected':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        throw new Error('Unkown action type');
    }
  }
  
  const ClientsProvider = ({ children }) => {
    const [{ clients, currentClient, isLoading, error }, dispatch] = useReducer(
      reducer,
      initialState
    );
  
    useEffect( () => {
      const fetchClients = async () => {
        dispatch({ type: 'loading' });
        try {
          const res = await fetch(`${BASE_URL}/clients-with-addresses`);
          const data = await res.json();
          console.log("fetching...");
          dispatch({ type: 'clients/loaded', payload: data.data });
        } catch (err) {
          dispatch({
            type: 'rejected',
            payload: 'There was an error loading the clients...',
          });
        }
      }
  
      fetchClients();
    }, []);
  
    const createClient = async (newClient) => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/clients`, {
          method: 'POST',
          body: JSON.stringify(newClient),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
  
        dispatch({ type: 'client/created', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error creating the client',
        });
      }
    }

    const updateClient = async (newClient, id) => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/clients/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(newClient),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
  
        dispatch({ type: 'client/updated', payload: data });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error updating the client',
        });
      }
    }


    const setCurrentClient = (id) => {
      dispatch({ type: 'client/set', payload: id });
    }

    const deleteClient = async (id) => {
      dispatch({ type: 'loading' });
      try {
        await fetch(`${BASE_URL}/clients/${id}`, {
          method: 'DELETE',
        });
  
        dispatch({ type: 'client/deleted', payload: id });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error deleting the client',
        });
      }
    }
  
    
    return (
      <ClientsContext.Provider
        value={{
          error,
          clients,
          isLoading,
          createClient,
          deleteClient,
          currentClient,
          setCurrentClient
        }}
      >
        {children}
      </ClientsContext.Provider>
    );
  }
  
  const useClients = () => {
    const context = useContext(ClientsContext);
  
    if (context === undefined || context === null) {
        throw new Error('ClientsContext was created outside of ClientsProvider');
    }

    return context;
  }
  
  export { ClientsProvider, useClients };