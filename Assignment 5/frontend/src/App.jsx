import './App.css'
import './styles/bootstrap.min.css';
import './styles/custom.css';
import NavBar from './components/NavBar.jsx'
import AllContacts from './components/AllContacts.jsx';
import ContactDetails from './components/ContactDetails.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm.jsx';
import { ContactsProvider } from './contexts/ContactsContext';

function App() {

  return (
    <Router>
      <ContactsProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<AllContacts />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/create" element={<ContactForm />} />
        </Routes>
      </ContactsProvider>
    </Router>
  )
}

export default App
