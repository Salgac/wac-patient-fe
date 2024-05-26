import { newSpecPage } from '@stencil/core/testing';
import { XsalgovicConditionDialog } from '../xsalgovic-condition-dialog';

describe('xsalgovic-condition-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XsalgovicConditionDialog],
      html: `<xsalgovic-condition-dialog></xsalgovic-condition-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <xsalgovic-condition-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xsalgovic-condition-dialog>
    `);
  });
});
