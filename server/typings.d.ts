declare module "random-date-generator" {
  export function getRandomDate(start: Date, end: Date): Date;
}

declare module "node-random-name" {
  function random_name(
    _: { seed?: string } & (
      | { gender?: "male" | "female"; first?: boolean }
      | { last?: boolean }
    )
  ): string;

  export default random_name;
}
