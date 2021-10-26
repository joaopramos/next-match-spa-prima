import type { MatchPlayer } from './NextMatch'

export interface PlayerDetails extends MatchPlayer{
    team: string
}
export interface AppState {
    selectedPlayer?: PlayerDetails
}