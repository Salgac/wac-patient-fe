import { newE2EPage } from '@stencil/core/testing';

describe('xsalgovic-patient-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsalgovic-patient-card></xsalgovic-patient-card>');

    const element = await page.find('xsalgovic-patient-card');
    expect(element).toHaveClass('hydrated');
  });
});
