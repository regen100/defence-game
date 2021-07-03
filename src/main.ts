import { initialize } from "@akashic-extension/coe";
import { Controller } from "./Controller";
import { EntryScene } from "./EntryScene";

function main(args: g.GameMainParameterObject): void {
  const game = g.game;
  initialize({ game, args });

  const controller = new Controller();
  game.pushScene(new EntryScene({ game, controller }));
}

export = main;
