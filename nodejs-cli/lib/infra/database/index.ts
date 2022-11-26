import pgp from 'pg-promise'
import connectionObject from "./connection";

export default pgp()(connectionObject)
