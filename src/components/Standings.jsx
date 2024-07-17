import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  let rank = 0;

  useEffect(()=>{
    api()
  },[])
  const api = async () => {
    const options = {
      method: "GET",
      url: "https://hockey1.p.rapidapi.com/v1/nhl/standings",
      params: { date: "2024-04-18" },
      headers: {
        "x-rapidapi-key": "d5cf8df418msh2978ee768da2bf9p187715jsn7fa7ea70f5eb",
        "x-rapidapi-host": "hockey1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTeams(response.data.body)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div className="flex h-full flex-col gap-2">
            {teams.map((team, index)=>(
                <div key={index} className="shadow-sm flex">
                    <div className="w-1/5">
                    <img src={team.teamLogo} className="h-20 w-20 rounded-lg" />
                    <h1>{team.teamName.default}</h1>
                    </div>
                    <div className="flex items-center gap-2 justify-center font-bold">
                        <h2 className=" px-2 shadow-md bg-neutral-800 bg-opacity-30  py-2">#{++rank}</h2>
                        <h2 className="px-2 shadow-md bg-neutral-800 bg-opacity-30 py-2">{team.wins} W </h2>
                        <h2 className=" px-2 shadow-md bg-neutral-800  bg-opacity-30 py-2">{team.losses} L </h2>
                        <h2 className=" px-2 shadow-md bg-neutral-800 bg-opacity-30   py-2">{team.otLosses} OT/L </h2>
                        <h2 className=" px-2 shadow-md bg-neutral-800  bg-opacity-30 py-2">{team.points} P </h2>
                        
                    </div>
                </div>
            ))}
        </div>

    </div>
  );
};

export default Standings;
