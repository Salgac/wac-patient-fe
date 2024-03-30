import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "xsalgovic-patient-card",
  styleUrl: "xsalgovic-patient-card.css",
  shadow: true,
})
export class XsalgovicPatientCard {
  render() {
    return (
      <Host>
        <h1>Karta pacienta</h1>
        <md-circular-progress indeterminate></md-circular-progress>
      </Host>
    );
  }
}
