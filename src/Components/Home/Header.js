import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../utils/appState';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Header = () => {
  const { user, setUser } = useAppState();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = React.useState(isLargeScreen);

  React.useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="./images/logo4.png"
              className="mr-3 w-6 sm:w-9"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            {user ? (
              <>
                <span className="text-gray-800 dark:text-white mr-4">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/get-started"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Get started
                </Link>
              </>
            )}
            {!isLargeScreen && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 2,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </div>
      </nav>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant={isLargeScreen ? 'permanent' : 'temporary'}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          {!isLargeScreen && (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <List>
          {['Home', 'Company', 'Marketplace', 'Features', 'Team', 'Contact'].map((text) => (
            <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </header>
  );
};

export default Header;
