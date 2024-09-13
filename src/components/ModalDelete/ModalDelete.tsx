'use client';

import { Close } from '@mui/icons-material';
import { Alert, Box, Typography, useTheme } from '@mui/material';

export const ModalDelete = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          background: theme.palette.error.main,
          borderRadius: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Close sx={{ color: '#f5dede' }} fontSize="large" />
      </Box>
      <Typography fontSize={30} mt={3} textAlign="center">
        Deseja realmente excluir essa informação?
      </Typography>
      <Alert severity="warning" sx={{ mt: 3 }}>
        Atenção! Essa ação será irreversível.
      </Alert>
    </Box>
  );
};
