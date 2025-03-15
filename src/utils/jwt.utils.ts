import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { StringValue } from "ms";

export class JwtService {
  private static readonly JWT_SECRET: Buffer = Buffer.from(process.env.JWT_SECRET || "", "utf-8");

  static generateToken(payload: object, expiresIn: StringValue = "5days"): string {
    if (!this.JWT_SECRET.length) {
      throw new Error("JWT_SECRET is not defined");
    }

    const options: SignOptions = {
      algorithm: "HS256",
      expiresIn,
    };

    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  static verifyToken(token: string): JwtPayload | null {
    if (!this.JWT_SECRET.length) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      return jwt.verify(token, this.JWT_SECRET, { algorithms: ["HS256"] }) as JwtPayload;
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return null;
    }
  }

  static decodeToken(token: string): JwtPayload | null {
    const decoded = jwt.decode(token);
    return typeof decoded === "object" && decoded !== null ? (decoded as JwtPayload) : null;
  }
}
