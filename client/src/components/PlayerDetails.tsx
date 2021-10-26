import { format } from "date-fns";

import { PlayerDetails as PlayerDetailsType } from "../types/store";

import styles from "./PlayerDetails.module.css";

interface PlayerDetailsProps {
  player: PlayerDetailsType;
  goBack: () => void;
}

function PlayerDetails({ player, goBack }: PlayerDetailsProps) {
  return (
    <section className={styles.PlayerDetails}>
      <nav>
        <button onClick={goBack}>Back to next match</button>
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
          <dt>Team:</dt>
          <dd>{player.team}</dd>
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
