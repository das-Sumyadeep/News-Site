import './App.css';
import Search from './Component/Search'
import Pagination from './Component/Pagination'
import Stories from './Component/Stories';

function App() {

  // context consumer
  return (
    <>
    <Search/>
    <Pagination/>
    <Stories/>
    </>
  );
}

export default App;
