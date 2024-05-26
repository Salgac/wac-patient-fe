import { newE2EPage } from '@stencil/core/testing';

describe('xsalgovic-condition-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xsalgovic-condition-dialog></xsalgovic-condition-dialog>');

    const element = await page.find('xsalgovic-condition-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
