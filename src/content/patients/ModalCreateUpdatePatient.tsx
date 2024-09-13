import { DateInput } from '@/components/DateInput';
import { PhoneInput } from '@/components/PhoneInput';
import { Patient } from '@/models';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn;
  loading: boolean;
  editable: boolean;
  item: Patient;
  onSubmit: () => void;
  onClose: () => void;
}

export const ModalCreateUpdatePatient = ({
  form,
  loading,
  editable,
  item,
  onSubmit,
  onClose,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (editable) {
      setValue('name', item.name);
      setValue('email', item.email);
      setValue('dateOfBirth', item.dateOfBirth);
      setValue('phoneNumber', item.phoneNumber);
      setValue('address', item.address);
    } else {
      setValue('name', undefined);
      setValue('email', undefined);
      setValue('dateOfBirth', undefined);
      setValue('phoneNumber', undefined);
      setValue('address', undefined);
    }
  }, [editable, setValue]);

  return (
    <Dialog open fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>Formulário de Paciente</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Nome"
              fullWidth
              required
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Email"
              fullWidth
              required
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
          </Grid>
          <Grid size={6}>
            <DateInput
              control={control}
              label="Data de Nascimento"
              variant="outlined"
              name="dateOfBirth"
              error={!!errors.dateOfBirth}
            />
          </Grid>
          <Grid size={6}>
            <PhoneInput
              control={control}
              label="Telefone"
              name="phoneNumber"
              phoneType="mobileNumber"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message as string}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              {...register('address')}
              label="Endereço"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message as string}
            />
          </Grid>

          <Grid size={12}>
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={onSubmit}
            >
              {editable ? 'Salvar modificações' : 'Salvar'}
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
