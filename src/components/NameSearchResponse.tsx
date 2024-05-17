const NameSearchResponse = (props: {
  result: {
    name: string;
    isLucky: boolean;
  };
  reject: () => void;
  accept: () => void;
  isDuplicate: boolean;
}) => {
  const { result, reject, accept, isDuplicate } = props;

  return (
    <>
      {result.isLucky === true && !isDuplicate && (
        <div className="flex flex-col items-center gap-4 mt-10 px-5">
          <h1>
            Congratulations, {result.name} is a lucky name! You've won a prize.
            Will you accept it?
          </h1>
          <button onClick={accept} className="border-2 px-2 py-1">
            Accept
          </button>
          <button onClick={reject} className="border-2 px-2 py-1">
            Reject
          </button>
        </div>
      )}

      {isDuplicate && (
        <div className="flex flex-col items-center gap-4 mt-10 px-5">
          <h1>
            I'm sorry, {result.name} has already received their prize today!
          </h1>
        </div>
      )}

      {result.isLucky === false && (
        <div className="flex flex-col items-center gap-4 mt-10 px-5">
          <h1>
            I'm sorry, {result.name} is not in today's list of lucky names.
          </h1>
          <button onClick={reject} className="border-2 px-2 py-1">
            Ok
          </button>
        </div>
      )}
    </>
  );
};
export default NameSearchResponse;
