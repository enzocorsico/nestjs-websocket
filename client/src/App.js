import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/chat/:id' element={ <Chat/> } />
        <Route path='*' element={ <Home/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
