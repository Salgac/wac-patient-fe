import { newSpecPage } from '@stencil/core/testing';
import { XsalgovicVisitDialog } from '../xsalgovic-visit-dialog';

describe('xsalgovic-visit-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsalgovicVisitDialog],
      html: `<xsalgovic-visit-dialog></xsalgovic-visit-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <xsalgovic-visit-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xsalgovic-visit-dialog>
    `);
  });
});
