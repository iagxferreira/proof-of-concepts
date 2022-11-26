export default abstract class Model {
    protected tableName: string

    protected connection

    constructor(connection, tableName: string) {
        this.connection = connection
        this.tableName = tableName
    }
}
