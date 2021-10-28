import React from "react";
import { Link } from "react-router-dom";

import { store } from "../store";

import * as MatchTypes from "../types/NextMatch";

import styles from "./Team.module.css";

export enum OrderBy {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  POSITION = "position",
  SQUADNUMBER = "squadNumber",
}

export interface PlayerOrder {
  orderBy: OrderBy;
  orderASC: boolean;
}

interface TeamProps {
  data: MatchTypes.Team;
}

const headers: Array<[string, OrderBy?]> = [
  ["#", OrderBy.SQUADNUMBER],
  ["last name", OrderBy.LASTNAME],
  ["first name", undefined],
  ["position", OrderBy.POSITION],
];

function Team({ data }: TeamProps) {
  const [playerOrder, setPlayerOrder] = React.useState<PlayerOrder>({
    orderBy: OrderBy.SQUADNUMBER,
    orderASC: true,
  });
  const { setState, state } = React.useContext(store);
  const highlight = state.selectedPosition;
  const setHighlight = (position: MatchTypes.Position | undefined) => setState({ selectedPosition: position });

  const players = data.firstEleven.slice().sort(makeCompareFn(playerOrder));

  return (
    <section className={styles.Team}>
      <h3 className={styles.TeamHeader}>{data.name}</h3>
      <div className={styles.table}>
        <div className={styles.tableHeaderRow}>
          {headers.map(([label, field]) => {
            return (
              <div key={label}>
                {field ? (
                  <button
                    onClick={() =>
                      setPlayerOrder({
                        orderBy: field,
                        orderASC: field !== playerOrder.orderBy || !playerOrder.orderASC,
                      })
                    }
                  >
                    {label} {drawCaret(playerOrder, field)}
                  </button>
                ) : (
                  label
                )}
              </div>
            );
          })}
        </div>

        {players.map((player) => {
          const { id, lastname, firstname, position, squadNumber } = player;
          return (
            <Link
              to={`/player/${id}`}
              className={[styles.tableRow, highlight === position ? "active" : undefined].filter(Boolean).join(" ")}
              key={id}
              onMouseEnter={() => setHighlight(position)}
              onMouseLeave={() => setHighlight(undefined)}
            >
              <div> {squadNumber}</div>
              <div> {lastname}</div>
              <div> {firstname}</div>
              <div> {position}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Team;

function makeCompareFn(playerOrder: PlayerOrder) {
  return (a: MatchTypes.MatchPlayer, b: MatchTypes.MatchPlayer): number => {
    if (a[playerOrder.orderBy] < b[playerOrder.orderBy]) {
      return -1 * Number(playerOrder.orderASC);
    }
    if (a[playerOrder.orderBy] > b[playerOrder.orderBy]) {
      return 1 * Number(playerOrder.orderASC);
    }
    return 0;
  };
}

function drawCaret(playerOrder: PlayerOrder, field: OrderBy) {
  if (playerOrder.orderBy !== field) return null;

  if (playerOrder.orderASC) {
    return <span>&#9660;</span>;
  } else {
    return <span>&#9650;</span>;
  }
}
