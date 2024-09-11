import Image from 'next/image';

import logo from '../assets/logo.png';
import { SignIn } from '../content/auth/signIn/SignIn';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Conectar-se - Medcloud</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100vh',
          gap: 5,
        }}
      >
        <Image src={logo} alt="Next.js logo" width={150} height={80} priority />
        <SignIn />
      </Box>
    </>
  );
}
