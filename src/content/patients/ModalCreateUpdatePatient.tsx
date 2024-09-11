import { DateInput } from '@/components/DateInput';
import { PhoneInput } from '@/components/PhoneInput';
import { Patient } from '@/models';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<Patient>;
}

export const ModalCreateUpdatePatient = ({ form }: Props) => {
  const { register, control } = form;

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
        <IconButton>
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Nome"
                fullWidth
                required
                {...register('name')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Email"
                fullWidth
                required
                type="email"
                {...register('email')}
              />
            </Grid>
            <Grid size={6}>
              <DateInput
                control={control}
                label="Data de Nascimento"
                variant="outlined"
                name="dateOfBirth"
              />
            </Grid>
            <Grid size={6}>
              <PhoneInput
                control={control}
                label="Telefone"
                name="phoneNumber"
                phoneType="mobileNumber"
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField {...register('address')} label="Endereço" fullWidth />
            </Grid>

            <Grid size={12}>
              <LoadingButton variant="contained">Cadastrar</LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
