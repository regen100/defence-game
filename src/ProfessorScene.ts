import { Scene, SceneParameters } from "@akashic-extension/coe";
import { ActionData, Command } from "./Controller";

export class ProfessorScene extends Scene<Command, ActionData> {
  constructor(param: SceneParameters<Command, ActionData>) {
    super(param);

    this.onLoad.addOnce(() => {
      const font = new g.DynamicFont({
        game: g.game,
        fontFamily: "sans-serif",
        size: 15,
      });

      this.append(
        new g.Label({
          scene: this,
          font: font,
          text: "Professor",
          x: 20,
          y: 20,
        })
      );
    });
  }
}
