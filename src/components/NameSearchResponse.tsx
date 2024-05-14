const NameSearchResponse = (props: {
  result: {
    name: string;
    isLucky: boolean;
  };
  searchAgain: () => void;
}) => {
  const { result, searchAgain } = props;

  return (
    <>
      {result && result.isLucky && (
        <div className="mt-40">
          <h1>
            Congratulations, {result.name} is a lucky name! You've won a prize.
            Will you accept it?
          </h1>
          <button>Accept</button>
          <button>Reject</button>
        </div>
      )}
      {result && result.isLucky === false && (
        <div className="mt-40">
          <h1>
            I'm sorry, {result.name} is not in today's list of lucky names.
          </h1>
          <button onClick={searchAgain}>Ok</button>
        </div>
      )}
    </>
  );
};
export default NameSearchResponse;
