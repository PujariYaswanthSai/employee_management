import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import EmployeeList from './components/EmployeeList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">Employee Management System</Typography>
        </Toolbar>
      </AppBar>
      <EmployeeList />
    </ThemeProvider>
  );
}

export default App;
