import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';
import { ParseFile } from 'src/app/services/parse-file';

@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  @Input() text: string;

  @Output('onFileUploaded')

  private eventFileUpload: EventEmitter<ParseFile> = new EventEmitter<ParseFile>();

  public parseFile: any;
  public isUploading: boolean = false;

  constructor(private platform: Platform,
    private parseFileService: ParseFile,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  onBoxTouched() {
    if (this.platform.is('cordova')) {
      this.presentActionSheet();
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  onFileChanged(event: any = null) {
    this.doUpload(event.target.files[0], false);
  }

  async chooseImage(source: CameraSource) {

    try {

      const image = await Camera.getPhoto({
        quality: 70,
        width: 800,
        height: 600,
        preserveAspectRatio: true,
        allowEditing: true,
        correctOrientation: true,
        source: source,
        resultType: CameraResultType.Base64,
      });

      this.doUpload(image.base64String);

    } catch (error) {
      console.warn(error);
    }

  }

  async presentActionSheet() {

    const trans = await this.translate.get([
      'PHOTO_LIBRARY',
      'CAMERA',
      'CANCEL',
      'CHOOSE_AN_OPTION']
    ).toPromise();

    const actionSheet = await this.actionSheetCtrl.create({
      header: trans.CHOOSE_AN_OPTION,
      buttons: [{
        text: trans.PHOTO_LIBRARY,
        handler: () => {
          this.chooseImage(CameraSource.Photos);
        }
      }, {
        text: trans.CAMERA,
        handler: () => {
          this.chooseImage(CameraSource.Camera);
        }
      }, {
        text: trans.CANCEL,
        role: 'cancel'
      }]
    });

    return actionSheet.present();

  }

  async doUpload(fileOrBase64: string, isBase64: boolean = true) {

    try {
      this.isUploading = true;
      this.parseFile = await this.parseFileService.upload(fileOrBase64, isBase64);
      this.isUploading = false;
      this.eventFileUpload.emit(this.parseFile);
    } catch (error) {
      this.isUploading = false;
      console.warn(error.message);
    }

  }


}
