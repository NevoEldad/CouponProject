export class ServerInfo {

    dbName: string;
    userName: string;
    password: string;
    port: string;

    constructor(dbName: string, userName: string, password: string, port: string) {
        this.dbName = dbName;
        this.userName = userName;
        this.password = password;
        this.port = port;
    }
}