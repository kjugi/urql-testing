import React from "react";

import { gql, useQuery } from "urql";

export const PokemonsQuery = gql`
  query {
    pokemons(limit: 10) {
      id
      name
    }
  }
`;

export const App = () => {
  const [result, excuteQuery] = useQuery({ query: PokemonsQuery });

  console.log(result.fetching);
  if (result.fetching) return <p data-testid="loading">Loading...</p>;

  return (
    <main>
      <ul id="pokemon-list">
        {result.data.pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.id}. {pokemon.name}
          </li>
        ))}
      </ul>
      <button
        data-testid="refetch"
        onClick={() => excuteQuery({ requestPolicy: "network-only" })}
      >
        Refetch
      </button>
    </main>
  );
};
