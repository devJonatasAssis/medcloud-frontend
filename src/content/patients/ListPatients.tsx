'use client';

import React, { FC, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';

import {
  DeleteTwoTone,
  EditTwoTone,
  VisibilityTwoTone,
} from '@mui/icons-material';
import { Patient } from '@/models';
import { format } from 'date-fns';
import { useModal, useToast } from '@/contexts';
import { ModalDelete } from '@/components/ModalDelete';
import { PatientsApi } from '@/services';

interface ListPatientsProps {
  data: Patient[];
  onEdit: (item: Patient) => void;
  onVisibility: (item: Patient) => void;
  onDelete: (id: string) => void;
}

export const ListPacients: FC<ListPatientsProps> = ({
  data,
  onVisibility,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  const modal = useModal();
  const { toast } = useToast();

  return (
    <>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Paciente</TableCell>
                <TableCell>Data de nascimento</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Endereço</TableCell>
                <TableCell align="right">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow hover key={item.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(item.dateOfBirth), 'dd/MM/yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.address}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Visualizar" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.secondary.lighter,
                          },
                          color: theme.palette.secondary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => onVisibility(item)}
                      >
                        <VisibilityTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => onEdit(item)}
                      >
                        <EditTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.error.lighter,
                          },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => onDelete(item.id)}
                      >
                        <DeleteTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
