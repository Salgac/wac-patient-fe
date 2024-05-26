import { Component, Prop, Event, h, State } from "@stencil/core";

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

  @State() description: string = "";

  handleDescriptionChange(event: Event) {
    this.description = (event.target as HTMLInputElement).value;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    if (event.type != "submit") {
      const newCondition: HealthCondition = {
        timestamp: new Date().toISOString(),
        description: this.description,
      };
      this.patient.healthConditions.push(newCondition);

      // send to api
      try {
        await fetch(
          this.apiBase + "/patients/" + this.patient.id + "/conditions",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify(newCondition),
          }
        );
      } catch (error) {
        console.error("Error:", error);
        return;
      }
    }

    // reset
    this.description = "";
    this.close();
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <md-dialog open={this.dialogOpen} onClosed={() => this.close()}>
            <div slot="headline">Condition</div>
            <div slot="content">
              <md-filled-text-field
                label="Description"
                value={this.description}
                onInput={(event: Event) => this.handleDescriptionChange(event)}
                required
              ></md-filled-text-field>
            </div>
            <div slot="actions">
              <md-filled-button onClick={() => this.close()}>
                Close
              </md-filled-button>
              <md-filled-button
                onClick={(e: Event) => this.handleSubmit(e)}
                type="submit"
              >
                Add Condition
              </md-filled-button>
            </div>
          </md-dialog>
        </form>
      </div>
    );
  }
}
