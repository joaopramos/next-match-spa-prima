export enum Position {
    GOALKEEPER = 'Goalkeeper',
    DEFENDER = 'Defender',
    MIDFIELDER = 'Midfielder',
    STRIKER = 'Striker'
}

export interface MatchPlayer {
    id: string,
    firstname: string,
    lastname: string,
    height: number,
    dateOfBirth: Date,
    position: Position
    squadNumber: number,
    nationality: string
}

export interface Team {
    id: string,
    name: string,
    stadium: string,
    firstEleven: [MatchPlayer]
}

export interface NextMatch {
    id: string,
    date: Date,
    home: Team,
    away: Team
}

