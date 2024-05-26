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

  @State() private timestamp: string;
  @State() private reason: string;
  @State() private ambulance: Ambulance;

  private getAmbulancesFromApi = async () => {
    const response = await fetch(this.apiBase + "/ambulances");
    const result = await response.json();

    this.ambulances = result as Ambulance[];
  };

  async componentWillLoad() {
    this.getAmbulancesFromApi();
    this.ambulance = this.ambulances[0];
    this.timestamp = this.getMinDateTime()
  }

  handleTimestampChange(event: Event) {
    this.timestamp = (event.target as HTMLInputElement).value;
  }

  handleReasonChange(event: Event) {
    this.reason = (event.target as HTMLInputElement).value;
  }

  handleAmbulanceChange(event: Event) {
    this.ambulance = this.ambulances.find(
      (a) => a.id == (event.target as HTMLSelectElement).value
    );
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    if (event.type != "submit" && this.reason != "") {
      const newVisit: Visit = {
        ambulance: this.ambulance ?? this.ambulances[0],
        timestamp: this.timestamp,
        reason: this.reason,
        status: "requested",
      };
      this.patient.visits.push(newVisit);

      // send to api
      try {
        await fetch(this.apiBase + "/patients/" + this.patient.id + "/visits", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify(newVisit),
        });
      } catch (error) {
        console.error("Error:", error);
        return;
      }
    }

    // reset
    this.reason = "";
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
                label="Reason"
                required
                value={this.reason}
                onInput={(event) => this.handleReasonChange(event)}
              ></md-filled-text-field>

              <label>
                Date:
                <input
                  type="datetime-local"
                  min={this.getMinDateTime()}
                  max="2024-12-31T23:59"
                  value={this.timestamp}
                  onInput={(event) => this.handleTimestampChange(event)}
                  required
                ></input>
              </label>

              <label>
                Ambulance:
                <select onInput={(event) => this.handleAmbulanceChange(event)}>
                  {this.ambulances.map((ambulance) => (
                    <option value={ambulance.id}>{ambulance.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div slot="actions">
              <md-filled-button onClick={() => this.close()}>
                Close
              </md-filled-button>
              <md-filled-button
                onClick={(e: Event) => this.handleSubmit(e)}
                type="submit"
              >
                Request Visit
              </md-filled-button>
            </div>
          </md-dialog>
        </form>
      </div>
    );
  }

  getMinDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = (today.getDate() + 1).toString().padStart(2, "0");
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = "".padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
