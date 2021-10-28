import React from "react";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";

import * as MatchTypes from "../types/NextMatch";

import Loading from "../components/Loading";
import Team from "../components/Team";

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
  const { data, loading, error } = useQuery<NextMatchQuery>(GET_NEXT_MATCH);

  if (loading) return <Loading />;
  if (!data || error) return <p>An error occurred</p>;

  return (
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
        <Team data={data.nextMatch.home}></Team>
        <div className={styles.VS}>VS</div>
        <Team data={data.nextMatch.away}></Team>
      </div>
    </main>
  );
};

export default NextMatch;
