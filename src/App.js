import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';

import { useEffect } from 'react';

import { GlobalStyle } from './GlobalStyles';

function App() {

  useEffect(() => {
    document.title = "Color blindess simulation"
  }, []);
  
  return (
    <>
    <Home/>
    <GlobalStyle></GlobalStyle>
    </>
  );
}

export default App;
