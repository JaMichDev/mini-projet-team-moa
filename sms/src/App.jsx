 
import Header from './components/Header.jsx'
import ContentRouter from './components/ContentRouter.jsx'
import Footer from './components/Footer.jsx'
import './App.css'
import { useAuth } from './context/AuthContext'

 
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Header />
      <ContentRouter /> 
      {isAuthenticated && <Footer />}
    </div>
  )
};

export default App
