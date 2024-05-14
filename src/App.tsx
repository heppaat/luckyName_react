import NameSearcher from "./components/NameSearcher";

function App() {
  return (
    <>
      <div className="home-container">
        <h2>Is your name lucky?</h2>
        <p>
          Welcome to the game where we find out whether your name is one of our
          lucky names of the day. All you have to do is type your name below and
          we will tell you!
        </p>
        <NameSearcher />
      </div>
    </>
  );
}

export default App;
