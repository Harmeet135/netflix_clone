import Billboard from './components/banner';
import InfoModal from './components/infocard';
import MovieCard from './components/moviescard';
import MovieList from './components/movieslist';
import MovieList2 from './components/movieslist2';
import Navbar from './components/navbar';
import UserList from './components/userlist';
import useInfoModalStore from './hooks/infocardmodel';

function App() {
  const {isOpen, closeModal} = useInfoModalStore();
  return (
    <div className="App">
      <InfoModal visible={isOpen} onClose={closeModal} />
    <Navbar />
    <Billboard />
    <MovieList />
    <MovieList2 />
    <UserList />
    </div>
  );
}

export default App;
