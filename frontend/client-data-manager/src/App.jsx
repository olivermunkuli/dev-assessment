import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ClientsProvider } from './contexts/ClientsContext';
import ClientList from './components/ClientList'

function App() {
  return (
    <ClientsProvider>
      <div className="container">
        <div>
          <ClientList />
        </div>
      </div>
    </ClientsProvider>
  )
}

export default App