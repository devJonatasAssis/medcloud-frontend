import { format, parseISO } from 'date-fns';

export const maskDocument = (input?: string) => {
  let value = (input ?? '').replace(/\D/g, '');
  value = value.slice(0, 14);
  if (value.length > 11) {
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3}).(\/\d{4}).(\d{2})$/)) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  }
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return value;
};

export const maskPhone = (phone?: string) => {
  if (!phone) {
    return '';
  }
  return phone
    .replace('+55', '')
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2');
};

export function maskCepInput(cep?: string) {
  if (!cep) {
    return '';
  }
  return cep?.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
}

export function formatDateHour24H(date?: string) {
  try {
    return date ? format(parseISO(date), 'dd/MM/yyyy HH:mm') : '';
  } catch {
    return '';
  }
}
export function formatDate(date?: string) {
  try {
    return date ? format(parseISO(date), 'dd/MM/yyyy') : '';
  } catch {
    return '';
  }
}

export function formatHour(hour?: string) {
  if (!hour) {
    return '';
  }

  if (hour.length === 3) {
    return hour.replace(/\D/g, '').replace(/^(\d{1})(\d)/g, '0$1:$2');
  }

  return hour.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '$1:$2');
}
