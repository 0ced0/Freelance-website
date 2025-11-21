import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar'
import { JobPostings } from './components/JobPostings'
import home_group from './assets/home_group.jpg'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative space-y-4">
      <Navbar />
      <div className="flex w-[70%] m-auto justify-center">
        <div className="p-9 text-center bg-red-100 flex items-center border rounded-tr-[30px]">
          Come join the Community!
          <br />
          Learn Together
          <br />
          Grow Together
          <br />
          And be Succesful Together
        </div>
        <img
          src={home_group}
          alt='group_picture'
          className="w-[40%] h-auto bg-yellow-100 "
        />
      </div>
      <JobPostings />
      <Footer />
    </div>
  );
}

export default App;
