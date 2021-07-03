import { Scene, SceneParameters } from "@akashic-extension/coe";
import { ActionData, Command } from "./Controller";
import { ProfessorScene } from "./ProfessorScene";
import { StudentScene } from "./StudentScene";

export class EntryScene extends Scene<Command, ActionData> {
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
          text: "Select role:",
          x: 20,
          y: 20,
        })
      );
      {
        const label = new g.Label({
          scene: this,
          font: font,
          text: "Student",
          x: 20,
          y: 50,
          touchable: true,
        });
        label.onPointDown.addOnce(() => {
          this.send({ type: "role_request", role: "student" });
        });
        this.append(label);
      }
      {
        const label = new g.Label({
          scene: this,
          font: font,
          text: "Professor",
          x: 100,
          y: 50,
          touchable: true,
        });
        label.onPointDown.addOnce(() => {
          this.send({ type: "role_request", role: "professor" });
        });
        this.append(label);
      }
    });

    this.commandReceived.add((command: Command) => {
      switch (command.type) {
        case "role_assign":
          if (command.id == g.game.selfId) {
            if (command.role == "student") {
              g.game.replaceScene(
                new StudentScene({ game: g.game, controller: this._controller })
              );
            } else if (command.role == "professor") {
              g.game.replaceScene(
                new ProfessorScene({
                  game: g.game,
                  controller: this._controller,
                })
              );
            }
          }
          break;
      }
    });
  }
}
