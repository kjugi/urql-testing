import { createClient, cacheExchange, fetchExchange } from 'urql'

export const client = createClient({
    url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
    suspense: false,
    exchanges: [cacheExchange, fetchExchange],
});