'use client';

import Loader from '@/components/Loader/Loader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { HeaderPatienties, ListPacients } from '@/content/patients';
import { ModalCreateUpdatePatient } from '@/content/patients/ModalCreateUpdatePatient';
import { getPatients } from '@/mock/patients';
import { Patient } from '@/models';
import { PatientsApi } from '@/services';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function PatientsPage() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const {
    data: patients,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['getPatients'],
    queryFn: () => PatientsApi.getPatients(),
  });

  const form = useForm<Patient>();

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  let content = <Loader />;

  if (isError)
    content = <Typography>Não foi possível buscar os dados</Typography>;

  if (isSuccess) content = <ListPacients data={patients.Items} />;

  return (
    <>
      <Head>
        <title>Pacientes - Medcloud</title>
      </Head>

      <Box padding={10}>
        <PageTitleWrapper>
          <HeaderPatienties onClick={handleOpenModalCreate} />
        </PageTitleWrapper>

        {content}
      </Box>

      {openModalCreate && <ModalCreateUpdatePatient form={form} />}
    </>
  );
}
