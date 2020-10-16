import "fontsource-roboto";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: '#f06292',
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
