class Memory {
    _id: String;
    song: Song;
    location: MemoryLocation;
    createdAt: Date;

    constructor(song: Song, location: MemoryLocation) {
        this.song = song;
        this.location = location;
        this.createdAt = new Date(Date.now());
    }
}

class User {
    _id: String;
    token: string;
    displayName: string;
    profileImageURI: string;
    memories: [Memory];
}

class PinLocation {
    lat: Number;
    long: Number;
    showPin: Boolean;

    constructor(lat: Number, long: Number) {
        this.lat = lat;
        this.long = long;
        this.showPin = false;
    }
}

class MemoryLocation {
    name: String;
    gId: String;
    address: String
    pinLocation: PinLocation

    constructor(name: String, gId: String, address: String, location: PinLocation) {
        this.name = name;
        this.gId = gId;
        this.address = address;
        this.pinLocation = location;
    }
}

class Song {
    title: String;
    id: String;
    artist: String;
    spotifyURI: String;
    albumArtURI: String;
    isSavedByCurrentUser: Boolean;

    constructor(title: String, id: String, artist: String, spotifyURI: String, albumArtURI: String, isSavedByCurrentUser: Boolean = false) {
        this.title = title;
        this.id = id;
        this.artist = artist;
        this.spotifyURI = spotifyURI;
        this.albumArtURI = albumArtURI;
        this.isSavedByCurrentUser = isSavedByCurrentUser
    }
}

export { User, Memory, PinLocation, Song, MemoryLocation }