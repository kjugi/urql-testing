import * as React from "react";
import { Provider } from "urql";
import { render, screen, waitFor } from "@testing-library/react";
import { App, PokemonsQuery } from "./App";
import { expect, jest } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { mockClient } from "./urqlMock";
import { fromValue, never, pipe, delay } from "wonka";

const customMock = {
  ...mockClient,
  executeQuery: jest.fn(({ query }) => {
    if (query === PokemonsQuery) {
      const response = {
        data: {
          pokemons: [
            {
              id: "1",
              name: "test",
            },
            {
              id: "2",
              name: "test",
            },
            {
              id: "3",
              name: "test",
            },
          ],
        },
      };
      // delay is required
      const value = pipe(fromValue(response), delay(500));

      return value;
    }

    return never;
  }),
};

const UrqlProvider = (props) => {
  return <Provider value={customMock}>{props.children}</Provider>;
};

describe("executeQuery", () => {
  const user = userEvent.setup();

  it('should set "fetching" to true when reexecuting', async () => {
    render(
      <UrqlProvider>
        <App />
      </UrqlProvider>
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(document.querySelectorAll("li").length).toEqual(0);
    expect(customMock.executeQuery).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument()
    );

    await user.click(screen.getByTestId("refetch"));

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument()
    );
    expect(customMock.executeQuery).toBeCalledTimes(2);
    expect(document.querySelectorAll("li").length).toEqual(3);
  });
});
