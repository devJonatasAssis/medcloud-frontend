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
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { poolData } from '@/config/cognito';
import { useToast } from '@/contexts';
import { useState } from 'react';

const userPool = new CognitoUserPool(poolData);

export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

      const userData = {
        Username: data.email,
        Pool: userPool,
      };

      const authenticationDetails = new AuthenticationDetails({
        Username: data.email,
        Password: data.password,
      });

      const cognitoUser = new CognitoUser(userData);

      const startTime = Date.now();

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          localStorage.setItem('accessToken', accessToken);
          toast({
            type: 'success',
            title: 'Autenticação realizada com sucesso',
          });
          const elapsedTime = Date.now() - startTime; // Calcula o tempo que levou
          const delay = Math.max(0, 1000 - elapsedTime); // Garante pelo menos 1 segundo de loading
          setTimeout(() => {
            setLoading(false); // Espera o delay para desligar o loading
            router.replace('/pacientes');
          }, delay);
        },
        onFailure: (err) => {
          toast({
            type: 'error',
            title: 'Email ou senha incorretos.',
          });
        },
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  console.log('Loading state:', loading);

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
              loading={loading}
            >
              Entrar
            </LoadingButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
