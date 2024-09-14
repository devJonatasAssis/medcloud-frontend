'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Card,
  CardContent,
  Grid2 as Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { validationSchemaSignIn } from './validation.schema';
import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components';

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
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
    setLoading(true);
    const data = getValues();

    try {
      await trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        return;
      }

      await signIn(data.email, data.password);

      router.replace('/pacientes');
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            <PasswordInput
              register={register}
              name="password"
              label="Senha"
              error={!!errors.password}
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
              variant="contained"
              startIcon={<Lock />}
              size="large"
              onClick={handleLogin}
              loading={loading}
              fullWidth
            >
              Entrar
            </LoadingButton>
          </Grid>

          <Grid size={12} mt={2}>
            <Alert severity="warning">
              Use o email <strong>devjonatasassis@gmail.com</strong> e a senha{' '}
              <strong>@Teste1234</strong> para acessar.
            </Alert>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
