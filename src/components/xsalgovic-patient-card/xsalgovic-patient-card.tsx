import { Component, Host, Prop, State, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-patient-card",
  styleUrl: "xsalgovic-patient-card.css",
  shadow: true,
})
export class XsalgovicPatientCard {
  @Prop() apiBase: string;

  @State() private patients: Patient[] = [];
  @State() private ambulances: Ambulance[] = [];

  @State() selectedPatient: Patient;

  //
  private getPatientsFromApi = async () => {
    const response = await fetch(this.apiBase + "/patients");
    const result = await response.json();

    this.patients = result as Patient[];
    this.selectedPatient = this.patients[0];
  };

  private getAmbulancesFromApi = async () => {
    const response = await fetch(this.apiBase + "/ambulances");
    const result = await response.json();

    this.ambulances = result as Ambulance[];
  };

  //
  async componentWillLoad() {
    this.getPatientsFromApi();
    this.getAmbulancesFromApi();
  }

  handleSelectChange(event: Event) {
    this.selectedPatient = this.patients.find(
      (p) => p.id == (event.target as HTMLSelectElement).value,
      10
    );
  }

  handleConditionAdd(event: Event) {
    //todo
  }

  handleVisitAdd(event: Event) {
    //todo
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
              </label>

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
                            Timestamp: {status.timestamp}
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
                        <md-item>
                          <p slot="headline">
                            <strong>Visit: {visit.reason}</strong>
                          </p>
                          <p slot="supporting-text">
                            Ambulance: {visit.ambulance.name}
                          </p>
                          <p slot="supporting-text">
                            Timestamp: {visit.timestamp}
                          </p>
                          <md-icon slot="start">360</md-icon>
                        </md-item>
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
        </div>
      </Host>
    );
  }
}
