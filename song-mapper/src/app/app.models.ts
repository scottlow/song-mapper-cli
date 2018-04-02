class Memory {
    song: Song;
    location: MemoryLocation

    constructor(song: Song, location: MemoryLocation) {
        this.song = song;
        this.location = location;
    }
}

class User {
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

    constructor(title: String, id: String, artist: String, spotifyURI: String, albumArtURI: String) {
        this.title = title;
        this.id = id;
        this.artist = artist;
        this.spotifyURI = spotifyURI;
        this.albumArtURI = albumArtURI;
    }
}

export { User, Memory, PinLocation, Song, MemoryLocation }