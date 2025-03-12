import localforage from "localforage";

const storage = localforage.createInstance({
  name: "ebuddy-rifky",
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

export { storage as default };
