import { newE2EPage } from '@stencil/core/testing';

describe('xsalgovic-visit-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsalgovic-visit-dialog></xsalgovic-visit-dialog>');

    const element = await page.find('xsalgovic-visit-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
