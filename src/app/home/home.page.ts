import { Component, ElementRef, ViewChild } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter{
  @ViewChild('wave') wave: ElementRef;
  private wavesurfer: WaveSurfer;

  constructor() {}
  ionViewDidEnter(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.wave.nativeElement,
      barWidth: 1,
      barHeight: 1,
      barGap: null,
      backend: 'WebAudio'
    });
    this.wavesurfer.load('/assets/file_example_MP3_5MG.mp3');

    this.wavesurfer.on('ready', () => {
      // wavesurfer.play();
    });
  }


  stop(): void {
    this.wavesurfer.stop();
  }

  play(): void {
    this.wavesurfer.play();
  }
}
