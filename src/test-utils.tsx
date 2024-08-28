import { render } from "@testing-library/react";
import { type JSX, type ReactNode } from "react";

const AllTheProviders = ({ children }: { children: ReactNode }): JSX.Element | ReactNode => {
  return children;
};

export const renderWithProviders = (
  ui: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1]
): ReturnType<typeof render> => render(ui, { wrapper: AllTheProviders, ...options });
