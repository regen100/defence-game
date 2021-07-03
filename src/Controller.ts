import { Action, COEController } from "@akashic-extension/coe";

export type Role = "student" | "professor";

export interface RoleAssign {
  type: "role_assign";
  id: string;
  role: Role;
}

export type Command = RoleAssign;

export interface RoleRequest {
  type: "role_request";
  role: Role;
}

export type ActionData = RoleRequest;

export class Controller extends COEController<Command, ActionData> {
  players: { [key: string]: Role } = {};

  constructor() {
    super();

    this.actionReceived.add((action: Action<ActionData>) => {
      switch (action.data.type) {
        case "role_request":
          if (!(action.player.id in this.players)) {
            this.players[action.player.id] = action.data.role;
            this.broadcast({
              type: "role_assign",
              id: action.player.id,
              role: this.players[action.player.id],
            });
          }
          break;
      }
    });
  }
}
