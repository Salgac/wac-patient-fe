import { Component, Prop, Event, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-condition-dialog",
  styleUrl: "xsalgovic-condition-dialog.css",
  shadow: true,
})
export class XsalgovicConditionDialog {
  @Prop() apiBase: string;

  @Prop() dialogOpen: boolean;
  @Prop() patient: Patient;
  @Event() @Prop() close: () => void;

  render() {
    return (
      <div>
        <md-dialog open={this.dialogOpen} onClosed={() => this.close()}>
          <div slot="headline">Condition</div>
          <div slot="content">
            <p>TODO</p>
          </div>
          <div slot="actions">
            <md-filled-button slot="primaryAction" onClick={() => this.close()}>
              Close
            </md-filled-button>
          </div>
        </md-dialog>
      </div>
    );
  }
}
