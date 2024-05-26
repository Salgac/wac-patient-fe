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
  @Prop() visit: Visit;
  @Event() @Prop() close: () => void;

  @State() private ambulances: Ambulance[] = [];

  private getAmbulancesFromApi = async () => {
    const response = await fetch(this.apiBase + "/ambulances");
    const result = await response.json();

    this.ambulances = result as Ambulance[];
  };

  async componentWillLoad() {
    this.getAmbulancesFromApi();

    this.visit.timestamp = this.getMinDateTime();
  }

  handleClose() {
    this.visit = {
      ambulance: { id: "", name: "" },
      timestamp: this.getMinDateTime(),
      reason: "",
      status: "",
    };
    this.close();
  }

  handleTimestampChange(event: Event) {
    this.visit.timestamp = (event.target as HTMLInputElement).value;
  }

  handleReasonChange(event: Event) {
    this.visit.reason = (event.target as HTMLInputElement).value;
  }

  handleAmbulanceChange(event: Event) {
    this.visit.ambulance = this.ambulances.find(
      (a) => a.id == (event.target as HTMLSelectElement).value
    );
  }

  async sendNew() {
    const newVisit: Visit = {
      ambulance: this.visit.ambulance ?? this.ambulances[0],
      timestamp: this.visit.timestamp,
      reason: this.visit.reason,
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

  async updateExisting() {
    // send to api
    try {
      await fetch(
        this.apiBase +
          "/patients/" +
          this.patient.id +
          "/visits/" +
          this.visit.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify(this.visit),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async handleSubmit(event: Event) {
    event.preventDefault();

    if (event.type != "submit" && this.visit.reason != "") {
      // handle update or post
      if (this.visit.status != "") {
        this.updateExisting();
      } else {
        this.sendNew();
      }
    }

    // reset
    this.visit.reason = "";
    this.handleClose();
  }

  async handleDelete(event: Event) {
    event.preventDefault();

    this.patient.visits = this.patient.visits.filter(
      (v) => v.id != this.visit.id
    );

    // send to api
    try {
      await fetch(
        this.apiBase +
          "/patients/" +
          this.patient.id +
          "/visits/" +
          this.visit.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify(this.visit),
        }
      );
    } catch (error) {
      console.error("Error:", error);
    }

    // reset
    this.visit.reason = "";
    this.handleClose();
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <md-dialog open={this.dialogOpen} onClosed={() => this.handleClose()}>
            <div slot="headline">Condition</div>
            <div slot="content">
              <md-filled-text-field
                label="Reason"
                required
                value={this.visit.reason}
                onInput={(event: Event) => this.handleReasonChange(event)}
              ></md-filled-text-field>

              <label>
                Date:
                <input
                  type="datetime-local"
                  min={this.getMinDateTime()}
                  max="2024-12-31T23:59"
                  value={this.visit.timestamp}
                  onInput={(event) => this.handleTimestampChange(event)}
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
              <md-filled-button onClick={() => this.handleClose()}>
                Close
              </md-filled-button>
              {this.visit.status != "" && (
                <md-filled-button onClick={(e: Event) => this.handleDelete(e)}>
                  Delete
                </md-filled-button>
              )}
              <md-filled-button
                onClick={(e: Event) => this.handleSubmit(e)}
                type="submit"
              >
                {this.visit.status == "" ? "Request Visit" : "Update Visit"}
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
