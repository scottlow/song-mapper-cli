export enum PlaybackState {
    Playing = 1,
    Paused,
    Stopped
}

export class Constants {
    public static get APP_TITLE(): string { return 'Song Mapper'; };

    public static get API_URL(): string { return 'http://localhost:3001/api' };

    public static get SPOTIFY_AUTH_URL(): string { return 'https://accounts.spotify.com/authorize' };
    public static get SPOTIFY_REDIRECT_URI(): string { return 'http://localhost:4200/callback/' };
    public static get SPOTIFY_CLIENT_ID(): string { return 'a397e6d590a042f7a5800c107c3cd939' };

    public static get SIDEBAR_NEW_MEMORY(): string { return "NEW_MEMORY" };
    public static get SIDEBAR_VIEW_MEMORIES(): string { return "VIEW_MEMORIES" };
}