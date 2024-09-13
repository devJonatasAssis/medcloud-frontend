import { Logout } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

export const Header = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={1}>
      <Typography color="textDisabled" fontWeight="bold">
        Jonatas de Assis Silva
      </Typography>
      <IconButton color="secondary">
        <Logout />
      </IconButton>
    </Box>
  );
};
