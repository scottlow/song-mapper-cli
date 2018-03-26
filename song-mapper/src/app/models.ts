class Memory {
    song: Song;
    location: MemoryLocation
}

class User {
    token: string;
    displayName: string;
    profileImageURI: string;
    memories: [Memory];
}

class MapLocation {
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
    location: MapLocation

    constructor(name: String, gId: String, address: String, location: MapLocation) {
        this.name = name;
        this.gId = gId;
        this.address = address;
        this.location = location;
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

export { User, Memory, MapLocation, Song, MemoryLocation }