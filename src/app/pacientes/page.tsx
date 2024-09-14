'use client';

import { Header } from '@/components/Header';
import Loader from '@/components/Loader/Loader';
import { ModalDelete } from '@/components/ModalDelete';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { HeaderPatienties, ListPacients } from '@/content/patients';
import { ModalCreateUpdatePatient } from '@/content/patients/ModalCreateUpdatePatient';
import { ModalVisibility } from '@/content/patients/ModalVisibilityPatient';
import { validationSchemaPatient } from '@/content/patients/validation.schema';
import { useModal, useToast } from '@/contexts';
import { Patient } from '@/models';
import { PatientsApi } from '@/services';
import { removeNotNumbers } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Pagination, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

export default function PatientsPage() {
  const [page, setPage] = useState(1);
  const [startLinkHistory, setStartLinkHistory] = useState([]);
  const [currentStartLink, setCurrentStartLink] = useState(null);
  const [openModalCreateUpdate, setOpenModalCreateUpdate] = useState(false);
  const [openModalVisibility, setOpenModalVisibility] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const modal = useModal();

  const {
    data: patients,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['getPatients', currentStartLink],
    queryFn: () => PatientsApi.getPatients(currentStartLink),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(validationSchemaPatient),
  });

  const {
    trigger,
    formState: { isValid },
  } = form;

  const handleOpenModalCreate = () => {
    setOpenModalCreateUpdate(true);
    setIsEditable(false);
  };

  const handleOpenModalUpdate = (e: Patient) => {
    setOpenModalCreateUpdate(true);
    setPatient(e);
    setIsEditable(true);
  };

  const handleOpenModalVisibility = (e: Patient) => {
    setOpenModalVisibility(true);
    setPatient(e);
  };

  const handleSubmit = async () => {
    const data = form.getValues();
    try {
      setLoading(true);

      await trigger(undefined, { shouldFocus: true });

      if (!isValid) {
        return;
      }

      const createPayload = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: removeNotNumbers(data.phoneNumber),
      };

      if (isEditable) {
        await PatientsApi.update({ ...createPayload, id: patient.id });
      } else {
        await PatientsApi.save(createPayload);
      }

      refetch();
      setOpenModalCreateUpdate(false);

      toast({
        type: 'success',
        title: 'Paciente cadastrado com sucesso',
      });
    } catch (error) {
      console.log(error);
      toast({
        type: 'error',
        title: 'Ocorreu um erro ao cadastrar o paciente',
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      modal.updateModalButton({ index: 1, loading: true });
      await PatientsApi.remove(id);
      refetch();
      toast({
        type: 'success',
        title: 'Entidade deletada com sucesso',
      });
      modal.close();
    } catch (error) {
      toast({
        type: 'error',
        title: `Erro ao deletar entidade ${error}`,
      });
    }
  };

  const renderModalDelete = (id: string) => {
    modal.open({
      title: 'Deletar paciente',
      description: <ModalDelete />,
      buttons: [
        {
          text: 'Cancelar',
          variant: 'text',
          color: 'error',
          onClick: modal.close,
        },
        {
          text: 'Confirmar',
          variant: 'contained',
          color: 'success',
          onClick: () => onDelete(id),
        },
      ],
    });
  };

  const onPagination = (_, value: number) => {
    if (value > page) {
      if (patients?.lastEvaluatedKey) {
        setStartLinkHistory((prev) => [...prev, currentStartLink]);
        setCurrentStartLink(patients.lastEvaluatedKey);
        setPage(value);
      }
    } else if (value < page && startLinkHistory.length > 0) {
      const previousStartLink = startLinkHistory[startLinkHistory.length - 1];
      setCurrentStartLink(previousStartLink);
      setStartLinkHistory((prev) => prev.slice(0, -1));
      setPage(value);
    }
  };

  let content = <Loader />;

  if (isError)
    content = <Typography>Não foi possível buscar os dados</Typography>;

  if (isSuccess)
    content = (
      <Box>
        <ListPacients
          data={patients.items}
          onEdit={(e) => handleOpenModalUpdate(e)}
          onVisibility={(e) => handleOpenModalVisibility(e)}
          onDelete={(e) => renderModalDelete(e)}
        />

        <Box p={3} display="flex" justifyContent="center">
          <Pagination
            shape="rounded"
            size="large"
            variant="outlined"
            color="primary"
            count={Math.ceil(patients.total / 5)} // Número total de páginas
            page={page}
            onChange={onPagination}
          />
        </Box>
      </Box>
    );

  return (
    <>
      <Head>
        <title>Pacientes - Medcloud</title>
      </Head>

      <Box paddingX={10} marginTop={10}>
        <Header />
      </Box>

      <Box padding={10}>
        <PageTitleWrapper>
          <HeaderPatienties onClick={handleOpenModalCreate} />
        </PageTitleWrapper>

        {content}
      </Box>

      {openModalCreateUpdate && (
        <ModalCreateUpdatePatient
          form={form}
          loading={loading}
          onSubmit={handleSubmit}
          editable={isEditable}
          item={patient}
          onClose={() => {
            setOpenModalCreateUpdate(false);
            setIsEditable(false);
          }}
        />
      )}

      {openModalVisibility && (
        <ModalVisibility
          item={patient}
          onClose={() => setOpenModalVisibility(false)}
        />
      )}
    </>
  );
}
