/* eslint-disable no-unused-vars */
export interface IService {
    findById(id: any)
    findAll()
    insert(document: any)
    update(id: any, document: any)
    erase(id: any)
}
