import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Team = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({
    Name: "",
    Assists: "",
    ASPG: "",
    ATON: "",
    GWG: "",
    gp: "",
    goals: "",
    headshot: "",
    otgoals: "",
    penaltymins: "",
    pm: "",
    points: "",
    ppg: "",
    shpct: "",
    shots: "",
    shgoals: "",
    position: "",
  });
  const { abbrev } = useParams();

  const nav = useNavigate();

  const statApi = async () => {
    const options = {
      method: "GET",
      url: "https://hockey1.p.rapidapi.com/v1/nhl/teams-stats",
      params: { teamAbbrev: `${abbrev}` },
      headers: {
        "x-rapidapi-key": "d5cf8df418msh2978ee768da2bf9p187715jsn7fa7ea70f5eb",
        "x-rapidapi-host": "hockey1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const players = response.data.body.skaters;
      setPlayers(players);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    statApi();
  }, []);

  return (
    
    <div className="h-full">
      <button onClick={() => nav("/")}>← Back</button>
      <h1 className="text-center font-bold text-3xl">Roster</h1>
      <div className="flex border-black border flex-wrap gap-2 justify-center items-center">
        
        {players.map((player, index) => (
          <div
            onClick={() =>
              setCurrentPlayer({
                Name: `${player.firstName.default} ${player.lastName.default}`,
                Assists: player.assists,
                ASPG: player.avgShiftsPerGame,
                GWG: player.gameWinningGoals,
                gp: player.gamesPlayed,
                goals: player.goals,
                headshot: player.headshot,
                otgoals: player.overtimeGoals,
                penaltymins: player.penaltyMinutes,
                pm: player.plusMinus,
                points: player.points,
                ppg: player.powerPlayGoals,
                shpct: player.shootingPctg,
                shgoals: player.shorthandedGoals,
                shots: player.shots,
                position: player.positionCode,
                ATON: player.avgTimeOnIcePerGame/60
              })
            }
            key={index}
            title={`${player.firstName.default} ${player.lastName.default}`}
            className="hover:bg-neutral-200"
          >
            <img src={player.headshot} className="h-40 w-40" />
          </div>
        ))}
      </div>
      {currentPlayer.Name.length > 0 && (
        <div className="flex-col my-14  flex justify-center items-center">
        <h1 className="text-3xl shadow-md font-extrabold">{currentPlayer.Name}</h1>
        <div className="">
          <img src={currentPlayer.headshot} alt="" />
        </div>
        <div className="flex px-2 py-2 font-extrabold text-2xl gap-2">
          <h2 className="text-white px-2 py-2 shadow-md">{currentPlayer.goals} G</h2>
          <h2 className="text-white  px-2 py-2 shadow-md">{currentPlayer.Assists} A</h2>
          <h2 className="text-white  px-2 py-2 shadow-md">{currentPlayer.points} P</h2>
          <h2 className="text-white  px-2 py-2 shadow-md">{currentPlayer.gp} GP</h2>
          <h2
            className={`${
              Number(currentPlayer.pm) > 0 ? "text-green-300" : "text-red-300"
            }  flex shadow-md items-center  px-2 py-2`}
          >
            {currentPlayer.pm}
            <p className="text-white text-sm">-/+</p>
          </h2>
          
        </div>
        <div className="flex  justify-center items-center text-2xl font-extrabold flex-wrap gap-1">
        <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{Number(currentPlayer.points/currentPlayer.gp).toFixed(2)}</h3>
            <small>Points Per Game</small>
          </div>
          <div className="flex justify-center items-center bg-neutral-800 rounded px-3 py-3 w-full flex-col">
            <h3>{Number(currentPlayer.ASPG).toFixed(2)}</h3>
            <small>Average Shifts a game</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{Number(currentPlayer.ATON).toFixed(2)} mins</h3>
            <small>Average Time On Ice</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3x w-full flex-col">
            <h3>{currentPlayer.penaltymins}</h3>
            <small>Penalty Mins</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.GWG}</h3>
            <small>Game Winning Goals</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.otgoals}</h3>
            <small>Overtime Goals</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.ppg}</h3>
            <small>PowerPlay Goals</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.shgoals}</h3>
            <small>Short-Handed Goals</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{Number(currentPlayer.shpct).toFixed(3)}%</h3>
            <small>Shooting pctg.</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.shots}</h3>
            <small>Shots</small>
          </div>

          <div className="flex bg-neutral-800 justify-center items-center rounded px-3 py-3 w-full flex-col">
            <h3>{currentPlayer.position}</h3>
            <small>Position</small>
          </div>
        </div>
      </div>
      )}
      
    </div>
  );
};

export default Team;
