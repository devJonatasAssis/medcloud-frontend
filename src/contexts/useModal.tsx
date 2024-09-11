'use client';

import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type ColorType =
  | 'error'
  | 'info'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';

interface ButtonProps {
  text: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: ColorType;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface UpdateButtonProps extends Partial<ButtonProps> {
  index: number;
}

export interface ModalProps {
  title?: React.ReactNode;
  description: React.ReactNode;
  buttons?: ButtonProps[];
  showButtonTopCloseModal?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface Context {
  open: (modal: ModalProps) => void;
  updateModalButton: (props: UpdateButtonProps) => void;
  close: () => void;
}

interface Props {
  message: Omit<ModalProps, 'buttons'> & {
    buttons?: Array<Omit<UpdateButtonProps, 'index'>>;
  };
  open: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  handleClose: () => void;
}

const ModalContainer = ({ message, open, handleClose }: Props) => {
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={message.maxWidth}
        fullWidth
      >
        <Box>
          <DialogTitle
            style={{
              flex: 1,
              display: 'flex',
              // alignItems: 'center'
            }}
          >
            {message.title}
            {message.showButtonTopCloseModal ? (
              <IconButton
                aria-label="fechar"
                onClick={handleClose}
                style={{ marginLeft: 'auto' }}
              >
                <Close />
              </IconButton>
            ) : null}
          </DialogTitle>
        </Box>

        <Divider />

        <Box display="flex" flexDirection="column">
          <DialogContent>{message.description}</DialogContent>

          <DialogActions>
            {message.buttons?.map((item) => {
              const {
                text,
                variant = 'text',
                color = 'primary',
                onClick,
                loading,
                disabled,
              } = item;

              return (
                <Button
                  key={text}
                  color={color}
                  onClick={onClick}
                  variant={variant}
                  disabled={disabled ?? loading}
                  startIcon={loading ? <CircularProgress size={15} /> : null}
                  classes={{ disabled: 'primary' }}
                  sx={{ mx: 1, mb: 2, mt: 1 }}
                >
                  {text}
                </Button>
              );
            })}
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

const ModalContext = createContext<Context | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalProps>({} as ModalProps);

  const updateModalButton = useCallback(
    ({ index, ...rest }: UpdateButtonProps) => {
      setConfig((currentConfigs) => {
        const buttons = currentConfigs.buttons;
        if (buttons?.length) {
          buttons[index] = { ...buttons?.[index], ...rest };
        }
        return { ...currentConfigs, buttons };
      });
    },
    [],
  );

  const open = useCallback((props: ModalProps) => {
    setIsOpen(true);
    setConfig(props);
  }, []);

  const close = () => setIsOpen(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({ open, close, updateModalButton }),
    [open, updateModalButton],
  );

  return (
    <ModalContext.Provider value={value}>
      <ModalContainer
        message={config}
        open={isOpen}
        handleClose={handleClose}
        maxWidth={config.maxWidth ?? 'md'}
      />
      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): Context {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('O useModal precisa estar em ModalProvider');
  }
  return context;
}
