'use client';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import { HeaderPatienties, ListPacients } from '@/content/patients';
import { ModalCreateUpdatePatient } from '@/content/patients/ModalCreateUpdatePatient';
import { getPatients } from '@/mock/patients';
import { Patient } from '@/models';
import { Box } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function PatientsPage() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  // const {} = useQuery()
  const data = getPatients;

  const form = useForm<Patient>();

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  return (
    <>
      <Head>
        <title>Pacientes - Medcloud</title>
      </Head>

      <Box padding={20}>
        <PageTitleWrapper>
          <HeaderPatienties onClick={handleOpenModalCreate} />
        </PageTitleWrapper>
        <ListPacients data={data.patients} />
      </Box>

      {openModalCreate && <ModalCreateUpdatePatient form={form} />}
    </>
  );
}
