import { createStorePackages } from "./db-stores";
var db;


const create = async () => {
    const request = indexedDB.open('xvba', 1);
    new Promise(
        (resolve) => {
            request.onupgradeneeded = () => {
                db = request.result;
                createStorePackages(db)
                resolve(db)

            }
        })

}




const open = async () => {
    const request = indexedDB.open('xvba', 1);
    return new Promise(

        (resolve, reject) => {

            request.onsuccess = () => {
                db = request.result;
                console.log('db onsuccess')
                resolve(db)
            }


        }
    )




}


const update = async (data, store, db) => {

    new Promise(
        (resolve, reject) => {
            let packagesStore = db.transaction(store, 'readwrite').objectStore(store)
            data.forEach(pack => {
                packagesStore.put(pack.package);
            })

        })
    console.log(data)

}

function getObjectStore(store_name, mode,) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

const clear = async (name, db) => {

    return new Promise(
        (resolve, reject) => {
            var store = getObjectStore(name, 'readwrite');
            var req = store.clear();
            req.onsuccess = function (evt) {
                console.log()
                resolve('clear')
            };
            req.onerror = function (evt) {
                console.error("Delete Object Store:", evt.target.errorCode);

            };
        }
    )

}


export const DBServices = { create, open, update, clear } 