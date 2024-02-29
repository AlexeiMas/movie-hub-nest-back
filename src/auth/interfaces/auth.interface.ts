export type TAccessToken = {
	accessToken: string;
};

export interface ITokenPair extends TAccessToken {
	refreshToken: string;
}

export type TypeRole = 'admin' | 'user' | undefined;
