'use client';

import React, { FC } from 'react';
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

interface ListPatientsProps {
  data: Patient[];
  onEdit?: (item: string) => void;
}

export const ListPacients: FC<ListPatientsProps> = ({ data }) => {
  const theme = useTheme();
  // const theme = useTheme();
  // const modal = useModal();
  // const { toast } = useToast();

  // const onDelete = async (id: string) => {
  //   try {
  //     modal.updateModalButton({ index: 1, loading: true });
  //     refetch();
  //     toast({
  //       type: 'success',
  //       title: 'Campanha deletada com sucesso',
  //     });
  //     modal.close();
  //   } catch (error) {
  //     toast({
  //       type: 'error',
  //       title: `Erro ao deletar campanha ${error}`,
  //     });
  //   }
  // };

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
                      {item.dateOfBirth}
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
                        // onClick={() => onEdit(item)}
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
