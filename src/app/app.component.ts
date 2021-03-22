import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pixi-v6';
  constructor() {}

  ngOnInit() {
    // get the element by the id
    const el = document.getElementById('pixi-container');

    // verify that we found an element
    if (el === null) {
      throw new Error(`No element found with id "container"`);
    }

    // make the stage yo and merge with our default options
    const app = new PIXI.Application({
      antialias: true,
      resizeTo: el,
      backgroundColor: 0x4e4e52,
      width: el.clientWidth,
      height: el.clientHeight,
    });

    // add the stage to our container
    el.appendChild(app.view);

    const container = new PIXI.Container();

    app.stage.addChild(container);

    // Create a new texture
    const texture = PIXI.Texture.from(
      'https://pixijs.io/examples/examples/assets/bunny.png'
    );

    // Create a 5x5 grid of bunnies
    for (let i = 0; i < 25; i++) {
      const bunny = new PIXI.Sprite(texture);
      bunny.anchor.set(0.5);
      bunny.x = (i % 5) * 40;
      bunny.y = Math.floor(i / 5) * 40;
      container.addChild(bunny);
    }

    // Move container to the center
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    // Listen for animate update
    app.ticker.add((delta) => {
      // rotate the container!
      // use delta to create frame-independent transform
      container.rotation -= 0.01 * delta;
    });
  }
}
