enum ProtocolVersions {
  V4 = 'V4',
  V5 = 'V5',
}

class ProtocolVersionEnum_ {
  readonly V4: { name: string } = {
    name: ProtocolVersions.V4,
  };
  readonly V5: { name: string } = {
    name: ProtocolVersions.V5,
  };
}

export const ProtocolVersionEnum = new ProtocolVersionEnum_();

export class ProtocolVersion {
  readonly name: string;
  constructor(version: string) {
    switch (version) {
      case ProtocolVersionEnum.V4.name:
        this.name = ProtocolVersionEnum.V4.name;
        break;
        case ProtocolVersionEnum.V5.name:
          this.name = ProtocolVersionEnum.V5.name;
          break;
      default:
        throw new Error(`Unknown protocol version ${version}`);
    }
  }
}
