import { Component, Host, Prop, State, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-patient-card",
  styleUrl: "xsalgovic-patient-card.css",
  shadow: true,
})
export class XsalgovicPatientCard {
  @Prop() apiBase: string;

  @State() private patients: Patient[] = [];
  @State() selectedPatient: Patient;

  @State() selectedVisit: Visit = {
    ambulance: { id: "", name: "" },
    timestamp: "",
    reason: "",
    status: "",
  };

  @State() visitDialogOpen: boolean = false;
  @State() conditionDialogOpen: boolean = false;

  //
  private getPatientsFromApi = async () => {
    const response = await fetch(this.apiBase + "/patients");
    const result = await response.json();

    this.patients = result as Patient[];
    this.selectedPatient = this.patients[0];
  };

  //
  async componentWillLoad() {
    this.getPatientsFromApi();
  }

  //
  handleSelectChange(event: Event) {
    this.selectedPatient = this.patients.find(
      (p) => p.id == (event.target as HTMLSelectElement).value,
      10
    );
  }

  //
  handleConditionAdd(_event: Event) {
    this.conditionDialogOpen = true;
  }

  handleVisitAdd(_event: Event) {
    this.visitDialogOpen = true;
  }

  openVisitForm(visit: Visit) {
    this.selectedVisit = visit;
    this.visitDialogOpen = true;
  }

  handleClose() {
    this.conditionDialogOpen = false;
    this.visitDialogOpen = false;
  }

  //
  render() {
    return (
      <Host>
        <div class="container">
          <md-outlined-card>
            <div class="card-content">
              <h1>Patient card</h1>
              {/* <md-circular-progress indeterminate></md-circular-progress> */}

              {this.patients.length == 0 && (
                <h2 id="error">No DB connection! :(</h2>
              )}

              {this.patients.length > 0 && (
              <label>
                Select Patient:
                <select onInput={(e) => this.handleSelectChange(e)}>
                  {this.patients.map((patient) => (
                    <option
                      value={patient.id.toString()}
                      key={patient.id}
                    >{`${patient.firstName} ${patient.lastName}`}</option>
                  ))}
                </select>
              </label>)}

              {this.selectedPatient && (
                <div>
                  <h2>Patient Details</h2>
                  <div>
                    <h3>Basic Information</h3>
                    {/* <p>
                      <strong>ID:</strong> {this.selectedPatient.id}
                    </p> */}
                    <p>
                      <strong>First Name:</strong>{" "}
                      {this.selectedPatient.firstName}
                    </p>
                    <p>
                      <strong>Last Name:</strong>{" "}
                      {this.selectedPatient.lastName}
                    </p>
                    <p>
                      <strong>Age:</strong> {this.selectedPatient.age}
                    </p>
                  </div>

                  <div>
                    <h3>Health Condition</h3>
                    <md-list>
                      {this.selectedPatient.healthConditions.map((status) => (
                        <md-item>
                          <p slot="headline">
                            <strong>Status:</strong> {status.description}
                          </p>
                          <p slot="supporting-text">
                            Timestamp:{" "}
                            {new Date(status.timestamp).toLocaleString()}
                          </p>
                          <md-icon slot="start">beenhere</md-icon>
                        </md-item>
                      ))}
                      <md-filled-icon-button
                        class="add-button"
                        onclick={(e: Event) => this.handleConditionAdd(e)}
                      >
                        <md-icon>add</md-icon>
                      </md-filled-icon-button>
                    </md-list>
                  </div>

                  <div>
                    <h3>Visits</h3>
                    <md-list>
                      {this.selectedPatient.visits.map((visit) => (
                        <md-list-item
                          type="button"
                          onClick={() => this.openVisitForm(visit)}
                        >
                          <p slot="headline">
                            <strong>Visit: {visit.reason}</strong>
                          </p>
                          <p slot="supporting-text">
                            Ambulance: {visit.ambulance.name}
                          </p>
                          <p slot="supporting-text">
                            Timestamp:{" "}
                            {new Date(visit.timestamp).toLocaleString()}
                          </p>
                          <md-icon slot="start">360</md-icon>
                        </md-list-item>
                      ))}
                      <md-filled-icon-button
                        class="add-button"
                        onclick={(e: Event) => this.handleVisitAdd(e)}
                      >
                        <md-icon>add</md-icon>
                      </md-filled-icon-button>
                    </md-list>
                  </div>
                </div>
              )}
            </div>
          </md-outlined-card>

          <xsalgovic-visit-dialog
            apiBase={this.apiBase}
            dialogOpen={this.visitDialogOpen}
            patient={this.selectedPatient}
            visit={this.selectedVisit}
            close={() => this.handleClose()}
          ></xsalgovic-visit-dialog>
          <xsalgovic-condition-dialog
            apiBase={this.apiBase}
            dialogOpen={this.conditionDialogOpen}
            patient={this.selectedPatient}
            close={() => this.handleClose()}
          ></xsalgovic-condition-dialog>
        </div>
      </Host>
    );
  }
}
