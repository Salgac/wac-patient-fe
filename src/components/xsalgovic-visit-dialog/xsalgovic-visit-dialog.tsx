import { Component, Prop, Event, State, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-visit-dialog",
  styleUrl: "xsalgovic-visit-dialog.css",
  shadow: true,
})
export class XsalgovicVisitDialog {
  @Prop() apiBase: string;

  @Prop() dialogOpen: boolean;
  @Prop() patient: Patient;
  @Event() @Prop() close: () => void;

  @State() private ambulances: Ambulance[] = [];

  private getAmbulancesFromApi = async () => {
    const response = await fetch(this.apiBase + "/ambulances");
    const result = await response.json();

    this.ambulances = result as Ambulance[];
  };

  async componentWillLoad() {
    this.getAmbulancesFromApi();
  }

  render() {
    return (
      <div>
        <md-dialog open={this.dialogOpen} onClosed={() => this.close()}>
          <div slot="headline">Visit</div>
          <div slot="content">
            <p>TODO</p>
            <p>{JSON.stringify(this.ambulances)}</p>
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
