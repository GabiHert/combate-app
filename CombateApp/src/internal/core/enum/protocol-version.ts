enum ProtocolVersions {
  V4 = 'V4',
}

class ProtocolVersionEnum_ {
  readonly V4: { name: string } = {
    name: ProtocolVersions.V4,
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
      default:
        throw new Error(`Unknown protocol version ${version}`);
    }
  }
}
