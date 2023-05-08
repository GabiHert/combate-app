enum Event_ {
  Systematic = 'Systematic',
  TrackPoint = 'TrackPoint',
  StartTrackPoint = 'StartTrackPoint',
  EndTrackPoint = 'EndTrackPoint',
  Obstacle = 'Obstacle',
}

class EventEnum_ {
  readonly TrackPoint: Event = {
    name: Event_.TrackPoint,
  };

  readonly Systematic: Event = {
    name: Event_.Systematic,
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
      case EventEnum.StartTrackPoint.name:
        this.name = status;
        break;
      case EventEnum.Systematic.name:
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
