import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { Box, CircularProgress } from '@mui/material';

const withAuth = (Component: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (user !== null) {
        setIsLoading(false);
      }

      if (!isAuthenticated && !isLoading) {
        router.replace('/');
      }
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      );
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
