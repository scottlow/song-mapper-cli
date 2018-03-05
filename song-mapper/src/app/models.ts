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

export { User, Memory }