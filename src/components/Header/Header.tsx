import { useAuth } from '@/contexts/authContext';
import { Logout } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

export const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
      <Typography color="textDisabled" fontWeight="bold">
        {user?.email}
      </Typography>
      <IconButton color="secondary" onClick={signOut}>
        <Logout />
      </IconButton>
    </Box>
  );
};
