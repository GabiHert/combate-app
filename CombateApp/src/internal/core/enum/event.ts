enum Event_ {
  Local = "Local",
  TrackPoint = "Track",
  StartTrackPoint = "StartTrack",
  EndTrackPoint = "EndTrack",
  Obstacle = "Obstacle",
  Systematic = "Systematic",
}

class EventEnum_ {
  readonly TrackPoint: Event = {
    name: Event_.TrackPoint,
  };

  readonly Local: Event = {
    name: Event_.Local,
  };

  readonly StartTrackPoint: Event = {
    name: Event_.StartTrackPoint,
  };
  readonly EndTrackPoint: Event = {
    name: Event_.EndTrackPoint,
  };
  readonly Obstacle: Event = {
    name: Event_.Obstacle,
  };
  readonly Systematic: Event = {
    name: Event_.Systematic,
  };
}

export const EventEnum = new EventEnum_();

export class Event {
  readonly name: string;
  constructor(status: string) {
    switch (status) {
      case EventEnum.EndTrackPoint.name:
        this.name = status;
        break;
      case EventEnum.Obstacle.name:
        this.name = status;
        break;
      case EventEnum.Systematic.name:
        this.name = status;
        break;
      case EventEnum.StartTrackPoint.name:
        this.name = status;
        break;
      case EventEnum.Local.name:
        this.name = status;
        break;
      case EventEnum.TrackPoint.name:
        this.name = status;
        break;
      default:
        throw new Error(`Unknown Event ${status}`);
    }
  }
}
