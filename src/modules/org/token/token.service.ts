import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigurationService } from "src/shared/configuration/configuration.service";

import { sign, SignOptions, verify } from 'jsonwebtoken';
import { JwtPayload } from "./jwt-payload.interface";
import { uuid } from "uuidv4";
import { randomBytes } from "crypto";
import moment from "moment";
import { LoginResponseDto } from "../dto/login-response.dto";

@Injectable()
export class TokenService {
    private readonly logger = new Logger(TokenService.name);

    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;
    private refreshTokenTtl: number;
    private expiresInDefault:  number;

    // @todo: should be put in redis cache
    private readonly usersExpired: number[] = [];

    constructor(
      
        private readonly configurationService: ConfigurationService,
    ) {
        this.expiresInDefault = this.configurationService.JWT.AccessTokenTtl;
        this.jwtOptions = { expiresIn: this.expiresInDefault };
        this.jwtKey = this.configurationService.JWT.Key;
        this.refreshTokenTtl = this.configurationService.JWT.RefreshTokenTtl;
    }

    async decodeAndValidateJWT(token: string): Promise<any> {
        if (token) {
            try {
                const payload = await this.validateToken(token);
                return await this.validatePayload(payload);
            } catch (error) {
                return null;
            }
        }
    }

    async validatePayload(payload: JwtPayload): Promise<any> {
        const tokenBlacklisted = await this.isBlackListed(payload.sub, payload.exp);
        if (!tokenBlacklisted) {
            return {
                id: payload.sub,
            };
        }
        return null;
    }

    

    private async isBlackListed(id: string, expire: number): Promise<boolean> {
        return this.usersExpired[id] && expire < this.usersExpired[id];
    }


    async createAccessToken(
        payload: JwtPayload,
        expires = this.expiresInDefault,
    ): Promise<LoginResponseDto> {
        // If expires is negative it means that token should not expire
        const options = this.jwtOptions;
        expires > 0 ? (options.expiresIn = expires) : delete options.expiresIn;
        // Generate unique id for this token
        options.jwtid = uuid();
        const signedPayload = sign(payload, this.jwtKey, options);
        const token = new LoginResponseDto();
        token.accessToken = signedPayload;
        token.expiresIn = expires;
        return token;
    }

    async createRefreshToken(tokenContent: {
        userId: string;
        ipAddress: string;
    }): Promise<string> {
        const refreshToken = randomBytes(64).toString('hex'); 
        return refreshToken;
    }


    

    private async validateToken(
        token: string,
        ignoreExpiration: boolean = false,
    ): Promise<JwtPayload> {
        return verify(token, this.configurationService.JWT.Key, {
            ignoreExpiration,
        }) as JwtPayload;
    }

    async logoutUserDetails(userId){
        // return await this.tokenModel.deleteOne({userId: userId})
    }

 
    
}