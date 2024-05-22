interface BanManagerInterface {
  addBan(ip: string): void
  hasBan(ip: string): boolean
}

export class MemoryBanManager implements BanManagerInterface {
  private bans: Set<string>

  constructor() {
    this.bans = new Set()
  }

  public addBan(ip: string) {
    this.bans.add(ip)
  }

  public hasBan(ip: string) {
    return this.bans.has(ip)
  }
}
