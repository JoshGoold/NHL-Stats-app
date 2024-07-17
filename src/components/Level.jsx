import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Standings from "./Standings";

const Level = () => {
  
  const [teams, setTeams] = useState([]);
  const [toggle, setToggle] = useState("Teams")

  const nav = useNavigate();

  const nhlTeams = [
    "ANA",
    "ARI",
    "BOS",
    "BUF",
    "CGY",
    "CHI",
    "COL",
    "CBJ",
    "DAL",
    "DET",
    "EDM",
    "FLA",
    "LAK",
    "MIN",
    "MTL",
    "NSH",
    "NJD",
    "NYI",
    "NYR",
    "PHI",
    "PIT",
    "SEA",
    "SJS",
    "STL",
    "TBL",
    "TOR",
    "VAN",
    "VGK",
    "WPG",
    "WSH",
  ];

  const hockeyCardSelector = () => {};

 
  useEffect(() => {
    teamApi();
  }, []);

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  const teamApi = async () => {
    const options = {
      method: "GET",
      url: "https://hockey1.p.rapidapi.com/v1/nhl/teams",
      headers: {
        "x-rapidapi-key": "d5cf8df418msh2978ee768da2bf9p187715jsn7fa7ea70f5eb",
        "x-rapidapi-host": "hockey1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const teams = response.data.body;
      setTeams(teams);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
    <div className="px-2 h-full py-2">
      <h1 className="text-3xl text-center font-extrabold">NHL STATS</h1>
      <div className=" flex gap-2 ">
        <button onClick={()=> setToggle("Teams")} className="shadow-md px-2 py-2 bg-neutral-800">Teams</button>
        <button onClick={()=> setToggle("Standings")} className="shadow-md px-2 py-2 bg-neutral-800">Standings</button>
      </div>
      {toggle === "Teams" && (
        <div className="flex justify-center my-4 items-center flex-wrap">
        {teams.map((team, index) => (
          <div
            key={index}
            onClick={() => {
              nav(`/team/${team.abbrev}`);
            }}
            title={team.name.default}
            className="shadow-md hover:bg-neutral-300 h-28 w-28 flex"
          >
            <img src={team.logo}></img>
          </div>
        ))}
      </div>
      )}
      {toggle === "Standings" && (
        <div className="">
          <Standings/>
        </div>
      )}
      
      
    </div>
    </div>
  );
};

export default Level;
