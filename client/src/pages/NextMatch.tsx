import React from "react";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";

import { store } from "../store";

import * as MatchTypes from "../types/NextMatch";
import { PlayerDetails as PlayerDetailsType } from "../types/store";

import Loading from "../components/Loading";
import Team from "../components/Team";
import PlayerDetails from "../components/PlayerDetails";

import styles from "./NextMatch.module.css";

type NextMatchQuery = {
  nextMatch: MatchTypes.NextMatch;
};

export const GET_NEXT_MATCH = gql`
  query nextMatch {
    nextMatch {
      id
      date
      home {
        name
        stadium
        firstEleven {
          id
          firstname
          lastname
          height
          dateOfBirth
          position
          squadNumber
          nationality
        }
      }
      away {
        name
        stadium
        firstEleven {
          id
          firstname
          lastname
          height
          dateOfBirth
          position
          squadNumber
          nationality
        }
      }
    }
  }
`;

const NextMatch: React.FC = () => {
  const { setState, state } = React.useContext(store);
  const { selectedPlayer } = state;
  const selectPlayer = (player?: PlayerDetailsType) => setState({ selectedPlayer: player });

  const { data, loading, error } = useQuery<NextMatchQuery>(GET_NEXT_MATCH);

  if (loading) return <Loading />;
  if (!data || error) return <p>An error occurred</p>;

  return selectedPlayer ? (
    <PlayerDetails player={selectedPlayer} goBack={() => selectPlayer(undefined)} />
  ) : (
    <main className={styles.NextMatch}>
      <div>
        <h1>
          {data.nextMatch.home.stadium}
          <time>{format(new Date(data.nextMatch.date), "EEE, dd MMM  hh:mm")}</time>
        </h1>
        <h2>
          <span>{data.nextMatch.home.name}</span> VS <span>{data.nextMatch.away.name}</span>
        </h2>
      </div>
      <div className={styles.TeamSideBySide}>
        <Team data={data.nextMatch.home} selectPlayer={selectPlayer}></Team>
        <div className={styles.VS}>VS</div>
        <Team data={data.nextMatch.away} selectPlayer={selectPlayer}></Team>
      </div>
    </main>
  );
};

export default NextMatch;
