import { test, expect } from '@playwright/test';

test('Flow Login - Medcloud Pacientes', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('devjonatasassis@gmail.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Senha').fill('@');
  await page.getByLabel('Senha').press('CapsLock');
  await page.getByLabel('Senha').fill('@Teste1234');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByRole('heading', { name: 'Pacientes' })).toBeVisible();

  //Fluxo de Adicionar paciente
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByLabel('Nome *').click();
  await page.getByLabel('Nome *').fill('Jonatas de Assis Silva');
  await page.getByLabel('Nome *').press('Tab');
  await page.getByLabel('Email *').fill('jonatassilva9090@gmail.com');
  await page.getByLabel('Email *').press('Tab');
  await page.getByPlaceholder('DD/MM/YYYY').fill('17/03/1978');
  await page.getByPlaceholder('DD/MM/YYYY').press('Tab');
  await page.getByLabel('Telefone').fill('(44) 9983-30366');
  await page.getByLabel('Telefone').press('Tab');
  await page
    .getByLabel('Endereço')
    .fill('Rua Mitsuzo Tagushi, 75 - Vila Nova, Maring');
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByRole('heading', { name: 'Pacientes' })).toBeVisible();

  // Fluxo de visualiazar
  await page.getByLabel('Visualizar').click();
  await expect(
    page.getByLabel('Dados do Paciente').getByText('Jonatas de Assis Silva'),
  ).toBeVisible();
  await page.getByRole('button').click();
  await expect(page.getByRole('heading', { name: 'Pacientes' })).toBeVisible();

  // Fluxo de Editar
  await page.getByLabel('Editar').click();
  await page.getByRole('button', { name: 'Salvar modificações' }).click();
  await expect(page.getByRole('heading', { name: 'Pacientes' })).toBeVisible();

  // Fluxo de Excluir
  await page.getByLabel('Excluir').click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await expect(page.getByRole('heading', { name: 'Pacientes' })).toBeVisible();
});
