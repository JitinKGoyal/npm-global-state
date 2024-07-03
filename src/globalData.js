import { useEffect, useState } from "react"
import { EventEmitter } from "fbemitter";
import { store } from "./store";

const emitter = new EventEmitter();

function useGlobalData() {
    const [_, setRerender] = useState(false);

    const rerender = () => setRerender(prev => !prev);

    useEffect(() => {
        // data should be an object.
        emitter.addListener("sendData", (data) => {
            store.data = { ...store.data, ...data };
            rerender();
        });

        emitter.addListener("resetStore", () => {
            store.data = {}
            rerender();
        })
    }, []);

    const setGlobalData = (text) => {
        emitter.emit("sendData", text)
    }

    const clearStore = () => {
        emitter.emit("resetStore")
    }

    return { data: store.data, setGlobalData, clearStore };
}

export { useGlobalData }