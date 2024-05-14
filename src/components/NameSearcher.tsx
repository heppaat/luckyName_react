import { useState } from "react";
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

  const isLucky = (input: string, array: People) => {
    const lowerCaseInputname = input.toLowerCase().trim();
    return array.some(
      (person) => person.name.toLowerCase() === lowerCaseInputname
    );
  };

  const checkName = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getAll();
      const result = PeopleSchema.safeParse(response);
      if (!result.success) {
        setError("Failed to parse response");
        return;
      }
      const peopleArray = result.data;

      const luckyOrNot = isLucky(inputName, peopleArray);

      setResult({
        name:
          inputName.trim().charAt(0).toUpperCase() +
          inputName.trim().slice(1).toLowerCase(),
        isLucky: luckyOrNot,
      });
    } catch (error) {
      setError("An error occured while fetching data");
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {!result && (
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
            />
            <button className="border-2" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
      {error && <p>Error: {error}</p>}
      <NameSearchResponse
        result={result!}
        searchAgain={() => setResult(null)}
      />
    </>
  );
};

export default NameSearcher;
