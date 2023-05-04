export interface IGpsData {
  status: string;
  latitude: number;
  longitude: number;
  speedKnots: number;
  timeUTC: string;
  dateUTC: Date;
}
