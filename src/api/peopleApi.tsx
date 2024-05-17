const people = [
  { name: "Joseph" },
  { name: "Ava" },
  { name: "Olivia" },
  { name: "Isabella" },
  { name: "Sophia" },
  { name: "Mia" },
  { name: "Charlotte" },
  { name: "Amelia" },
  { name: "Harper" },
  { name: "Evelyn" },
  { name: "Abigail" },
  { name: "Emily" },
  { name: "Elizabeth" },
  { name: "Avery" },
  { name: "Liam" },
  { name: "Noah" },
  { name: "Ethan" },
  { name: "Oliver" },
  { name: "William" },
  { name: "James" },
  { name: "Benjamin" },
  { name: "Lucas" },
  { name: "Mason" },
  { name: "Jacob" },
];

export function getAll(canReturnError = true) {
  return new Promise((resolve, reject) => {
    if (!canReturnError) {
      resolve(people);
    }

    const hasErrorOccurred = Math.round(Math.random() * 3) === 0;
    if (hasErrorOccurred) {
      reject(new Error("An error has occurred!"));
    }

    resolve(people);
  });
}
