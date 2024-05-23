import { Component, Host, Prop, State, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-patient-card",
  styleUrl: "xsalgovic-patient-card.css",
  shadow: true,
})
export class XsalgovicPatientCard {
  @Prop() apiBase: string;

  @State() private responseData: string = "";

  //
  private getFromApi = async () => {
    const response = await fetch(this.apiBase + "/test");
    const result = await response.json();

    this.responseData = result;
  };

  //
  async componentWillLoad() {
    this.getFromApi();
  }

  //
  render() {
    console.log(this.responseData);

    return (
      <Host>
        <h1>Karta pacienta</h1>
        <md-circular-progress indeterminate></md-circular-progress>

        <p>Data: {JSON.stringify(this.responseData)}</p>
      </Host>
    );
  }
}
