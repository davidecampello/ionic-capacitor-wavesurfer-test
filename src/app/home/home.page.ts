import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, ViewDidEnter } from '@ionic/angular';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter{
  @ViewChild('wave') wave: ElementRef;
  private wavesurfer: WaveSurfer;

  constructor(private platform: Platform) {}
  ionViewDidEnter(): void {

  }


  stop(): void {
    this.wavesurfer.stop();
  }

  play(): void {
    this.wavesurfer.play();
  }

  load(): void {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log(navigator.userAgent);
    let context;
    let processor;
    if (isSafari || this.platform.is('ios')) {
      console.log('for ios');
      // Safari 11 or newer automatically suspends new AudioContext's that aren't
      // created in response to a user-gesture, like a click or tap, so create one
      // here (inc. the script processor)
      // @ts-ignore
      let AudioContext = window.AudioContext || window.webkitAudioContext;
      context = new AudioContext();
      processor = context.createScriptProcessor(1024, 1, 1);
    }

    this.wavesurfer = WaveSurfer.create({
      audioContext: context || null,
      audioScriptProcessor: processor || null,
      container: this.wave.nativeElement,
      barWidth: 1,
      barHeight: 1, // the height of the wave
      barGap: null,
      backend: 'WebAudio'
      // waveColor: 'blue'
    });
    this.wavesurfer.load('/assets/file_example_MP3_5MG.mp3');

    this.wavesurfer.on('ready', () => {
      // wavesurfer.play();
    });
  }
}
