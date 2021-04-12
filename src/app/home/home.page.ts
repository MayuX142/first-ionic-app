import { Component } from '@angular/core';
import { LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  discordMessageTitle: string;
  discordMessageBody: string;

  constructor(public loadingController : LoadingController) {}

  async submitProcess() {
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: 'Envoi du message',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await loading.present();

    this.sendDiscordMessage(this.discordMessageTitle, this.discordMessageBody);
    this.discordMessageTitle = "";
    this.discordMessageBody = "";

    await loading.dismiss();
  }

  sendDiscordMessage(title, body) {
    let request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/831264753364107274/CB8uBu44bcUJKQLI3CL4mxh8TR3vDGpKhZL9xZrAPtvLY_u6iosMZXAkDfyV5pkSuO0l");
    request.setRequestHeader("Content-type", "application/json");

    var embedMessage = {
      author: {
        name: "📱 Envoyé depuis l'application mobile"
      },
      title: title,
      description: body,
      color: this.hexToDecimal("#a98e8e")
    }

    var message = {
      embeds: [ embedMessage ]
    }

    request.send(JSON.stringify(message));
  }

  hexToDecimal(hex){
    return parseInt(hex.replace("#", ""), 16);
  }




}
