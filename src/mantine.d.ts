import "@mantine/core";

declare module "@mantine/core" {
  export interface MantineThemeOther {
    fontWeight: {
      light: 300;
      normal: 400;
      medium: 500;
      semiBold: 600;
      bold: 700;
    };
  }
}
