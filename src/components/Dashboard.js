import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import Grid from '@mui/material/Grid';
import '../components/Navbar'

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' if you need a dark theme
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function Dashboard() {
  const router = useDemoRouter('/dashboard');

  return (
    
    <ThemeProvider theme={demoTheme}>
      <div>
        <h1>Dashboard</h1>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton height={14} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton height={100} />
          </Grid>
          <Grid item xs={8}>
            <Skeleton height={100} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={150} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={100} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={100} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={100} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton height={100} />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
