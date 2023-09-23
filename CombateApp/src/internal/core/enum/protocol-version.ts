enum ProtocolVersions {
  V5 = "5",
}

class ProtocolVersionEnum_ {
  readonly V5: { name: string } = {
    name: ProtocolVersions.V5,
  };
}

export const ProtocolVersionEnum = new ProtocolVersionEnum_();

export class ProtocolVersion {
  readonly name: string;
  constructor(version: string) {
    switch (version) {
      case ProtocolVersionEnum.V5.name:
        this.name = ProtocolVersionEnum.V5.name;
        break;
      default:
        throw new Error(`Unknown protocol version ${version}`);
    }
  }
}
