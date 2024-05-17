import { useEffect, useState } from "react";
import { getAll } from "../api/peopleApi";
import { People, PeopleSchema } from "../modell";
import NameSearchResponse from "./NameSearchResponse";

const NameSearcher = () => {
  const [inputName, setInputName] = useState<string>("");
  const [result, setResult] = useState<{
    name: string;
    isLucky: boolean;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [winnersArray, setWinnersArray] = useState<string[]>([]);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);

  const isLucky = (input: string, array: People) => {
    const lowerCaseInputname = input.toLowerCase().trim();
    return array.some(
      (person) => person.name.toLowerCase() === lowerCaseInputname
    );
  };

  const checkName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await getAll();
      const result = PeopleSchema.safeParse(response);
      if (!result.success) {
        setError("Failed to parse response");
        return;
      }
      const peopleArray = result.data;

      const luckyOrNot = isLucky(inputName, peopleArray);
      const formattedInputName =
        inputName.trim().charAt(0).toUpperCase() +
        inputName.trim().slice(1).toLowerCase();

      setResult({
        name: formattedInputName,
        isLucky: luckyOrNot,
      });

      setIsDuplicate(winnersArray.includes(formattedInputName));
    } catch (error) {
      setError("An error occured while fetching data");
      console.error(error);
    }
  };

  const reject = () => {
    setResult(null);
  };

  const handleAccept = () => {
    setAccepted(true);
    if (result && !isDuplicate) {
      setWinnersArray([...winnersArray, result.name]);
    }
    setResult(null);
  };

  useEffect(() => {
    if (accepted) {
      setInputName("");
      setAccepted(false);
    }
  }, [accepted]);

  return (
    <>
      <div>
        <form
          className="flex flex-col items-center gap-4 mt-10"
          onSubmit={checkName}
        >
          <input
            className="border-2"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter name..."
            pattern="[A-Za-z]{2,}"
            title="Please enter at least two letters"
          />
          <button className="border-2 px-2 py-1" type="submit">
            Submit
          </button>
        </form>
        {error && <p className="flex mt-10">Error: {error}</p>}

        {result && (
          <div>
            <NameSearchResponse
              result={result!}
              reject={reject}
              accept={handleAccept}
              isDuplicate={isDuplicate}
            />
          </div>
        )}

        <div className="flex flex-col bg-[#f4f4f5] p-4 rounded-lg max-w-[350px] mt-10 mx-5">
          <h1 className="text-[20px] mb-5">Today`s winners:</h1>
          {winnersArray.map((name, index) => (
            <p key={index}>{name}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default NameSearcher;
