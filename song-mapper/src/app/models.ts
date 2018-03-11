class Memory {
    isAuthenticated: boolean;
    token: string;
    displayName: string;
    profileImageURI: string;
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

export { User, Memory, MapLocation }