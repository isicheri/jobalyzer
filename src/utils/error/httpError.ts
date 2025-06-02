export class HttpErrorMain extends Error {
    statusCode: number
    name: string
    constructor(message:string,statusCode: number,name: string) {
        super(message);
        console.log(this.stack)
       this.statusCode = statusCode
       this.name = name
    }
}