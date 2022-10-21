import { Component, Input, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { isPlatform } from '@ionic/core';

@Component({
  selector: 'app-button-push',
  templateUrl: './button-push.component.html',
  styleUrls: ['./button-push.component.scss'],
})
export class ButtonPushComponent implements OnInit {

  public isRequesting: boolean;
  public canRequestPermission: boolean;

  @Input() buttonSize: string = 'default';
  @Input() buttonFill: string = 'solid';
  @Input() buttonColor: string = 'primary';

  async onRequestPushPermission() {

    try {
      this.isRequesting = true;

      const result = await PushNotifications.requestPermissions();

      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      }

      this.isRequesting = false;
      this.canRequestPermission = false;
    } catch {
      this.isRequesting = false;
    }
  }

  constructor() { }

  ngOnInit() {
    this.checkPushPermissions();
  }

  async checkPushPermissions() {

    if (Capacitor.isNativePlatform() && isPlatform('ios')) {
      const promptPermissionState: PermissionState = 'prompt';
      const status = await PushNotifications.checkPermissions();
      this.canRequestPermission = status.receive === promptPermissionState;
    }
  }

}
