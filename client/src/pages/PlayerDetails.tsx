import { format } from "date-fns";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import * as NextMatchTypes from "../types/NextMatch";

import Loading from "../components/Loading";

import styles from "./PlayerDetails.module.css";

export const GET_NEXT_PLAYER = gql`
  query player($playerId: ID!) {
    player(playerId: $playerId) {
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
`;

type PlayerQuery = {
  player: NextMatchTypes.MatchPlayer;
};

interface PlayerParams {
  playerId: string;
}

function PlayerDetails() {
  const { playerId } = useParams<PlayerParams>();
  const { data, loading, error } = useQuery<PlayerQuery>(GET_NEXT_PLAYER, { variables: { playerId } });

  if (loading) return <Loading />;
  if (!data || error) return <p>An error occurred</p>;

  const player = data.player;

  return (
    <section className={styles.PlayerDetails}>
      <nav>
        <Link to="/">Back to next match</Link>
      </nav>
      <article>
        <h1> Player details </h1>
        <h2>
          {player.lastname}, {player.firstname}
        </h2>
        <dl>
          <dt>First name:</dt>
          <dd>{player.firstname}</dd>
          <dt>Last name:</dt>
          <dd>{player.lastname}</dd>
          <dt>Position:</dt>
          <dd>{player.position}</dd>
          <dt>Squad number:</dt>
          <dd>{player.squadNumber}</dd>
          <dt>Date of birth:</dt>
          <dd>{format(new Date(player.dateOfBirth), "dd/MMM/yyyy")}</dd>
          <dt>Height:</dt>
          <dd>{(player.height / 100).toFixed(2)}m</dd>

          <dt>Nationality:</dt>
          <dd>{player.nationality}</dd>
        </dl>
      </article>
    </section>
  );
}

export default PlayerDetails;
