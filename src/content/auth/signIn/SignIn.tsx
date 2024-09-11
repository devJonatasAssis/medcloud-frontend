'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  CardContent,
  Grid2 as Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { validationSchemaSignIn } from './validation.schema';

export const SignIn = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(validationSchemaSignIn),
  });

  const handleLogin = async () => {
    const data = getValues();
    try {
      console.log(data);

      await trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        return;
      }

      router.replace('/pacientes');
    } catch (error) {}
  };

  return (
    <Card sx={{ maxWidth: 500, p: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={12} my={2}>
            <Typography
              variant="h5"
              style={{
                color: '#333',
                fontSize: '1.8rem',
              }}
            >
              Faça seu login
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: '#777',
                fontWeight: '300',
                fontSize: '1rem',
                marginTop: '2px',
              }}
            >
              Informe seus dados de acesso para acessar a aplicação.
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              {...register('email')}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              {...register('password')}
              label="Senha"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid
            size={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <LoadingButton
              variant="outlined"
              startIcon={<Lock />}
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={handleLogin}
            >
              Entrar
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
