import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { centiToDisplayTime } from "../../timeUtils";
import AverageInfoCard from "./AverageInfoCard";

export default function SessionInfoPane(props) {
  const { name, event, rounds, roundStats } = useSelector((x) => x.session);
  const scrollDiv = useRef(null);
  useEffect(() => {
    scrollDiv.current.scrollTo(0, scrollDiv.current.scrollHeight);
  });

  return (
    <div className="h-100">
      <div className="h-25">
        <h1>{name}</h1>
        <h2>{event}</h2>
        <table>
          {Object.keys(roundStats).map(key => {
            if (isNaN(roundStats[key]))
              return null;
            return <tr>
              <td className="pr-4"><b>{key}</b></td>
              <td>{centiToDisplayTime(roundStats[key])}</td>
            </tr>
          })}
        </table>
      </div>
      <div ref={scrollDiv} className="h-75" style={{ overflowY: "scroll" }}>
        {rounds.map((round, i) => (
          <AverageInfoCard
            average={round.average}
            times={round.solves.map((x) => x.time)}
            isTrimmed
          />
        ))}
      </div>
    </div>
  );
}
