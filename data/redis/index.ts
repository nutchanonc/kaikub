import { createClient } from "redis";

class Redis {
  private client;
  constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
    });
    this.client.on("error", (err) => console.error("Redis | ", err));
    this.connect();
  }
  public async connect() {
    if (this.client.isOpen) {
      return;
    }
    await this.client.connect();
  }

  public async get(key: string) {
    await this.connect();
    return await this.client.get(key);
  }

  public async delete(key: string) {
    await this.connect();
    return await this.client.del(key);
  }

  public async set(key: string, value: string, expire?: number) {
    await this.connect();
    await this.client.set(key, value);
    if (expire) {
      this.client.expire(key, expire);
    }
    return;
  }

  public async disconnect() {
    await this.client.disconnect();
  }
}

export const redis = new Redis();
