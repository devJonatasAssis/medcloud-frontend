import { Patient } from '@/models';
import { maskPhone } from '@/utils';
import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';

interface Props {
  item: Patient;
  onClose: () => void;
}

export const ModalVisibility = ({ item, onClose }: Props) => {
  return (
    <Dialog open fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>Dados do Paciente</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Typography variant="caption">Nome do paciente</Typography>
            <Typography>{item.name}</Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="caption">Email do paciente</Typography>
            <Typography>{item.email}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="caption">
              Data de nascimento do paciente
            </Typography>
            <Typography>
              {format(new Date(item.dateOfBirth), 'dd/MM/yyyy')}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="caption">Telefone do paciente</Typography>
            <Typography>{maskPhone(item.phoneNumber)}</Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="caption">Endereço do paciente</Typography>
            <Typography>{item.address}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
