import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Color blindess simulation"
  }, []);
  
  return (
    <>
    <Home/>
    </>
  );
}

export default App;
