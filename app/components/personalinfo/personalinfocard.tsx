import React from "react";

type State =
  "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;


interface Props {
    stateSet: (state: State) => void;
    nameSet: (state: string) => void;
    emailSet: (state: string) => void;
    logname: string; 
    logemail: string
  }

export default function PersonalInfoCard({stateSet, nameSet, emailSet, logname, logemail}: Props) {


  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg bg-white relative">
  <h2 className="text-xl font-bold mb-4">Personal Information</h2>
  <form className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="w-full p-2 border rounded-md"
        value={logname}
        onChange={(e) => (nameSet(e.target.value))}
        placeholder="Enter your name"
        required
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full p-2 border rounded-md"
        value={logemail}
        onChange={(e) => emailSet(e.target.value)}
        placeholder="Enter your email"
        required
      />
    </div>
    <button
      type="button"
      className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      onClick={() => stateSet('image upload')}
    >
      Next
    </button>
  </form>
</div>

  );
}
