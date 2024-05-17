import NameSearcher from "./components/NameSearcher";

function App() {
  return (
    <>
      <main className="flex justify-center">
        <div className="flex flex-col items-center mt-10 max-w-[500px]">
          <h2 className="text-[25px] mb-4 px-5">Is your name lucky?</h2>
          <p className="flex px-5">
            Welcome to the game where we find out whether your name is one of
            our lucky names of the day. All you have to do is type your name
            below and we will tell you!
          </p>
          <NameSearcher />
        </div>
      </main>
    </>
  );
}

export default App;
