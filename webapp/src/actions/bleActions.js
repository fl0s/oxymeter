import * as types from './actionTypes';

export function connect() {
    const service_uuid = "65052f48-6410-40d9-901f-2a2077f4aada";
    const pulse_uuid = "bd0c8283-1ef4-40d5-a9cf-418913f3bc37";
    const sat_uuid = "6a840204-5b21-4866-a5a5-e349e2602d3e";

    const options = {
        filters: [
            {services: [service_uuid]},
            {name: 'Oxymetre Formation'}
        ],
    };

    return dispatch => {

        return navigator.bluetooth.requestDevice(options)
            .then((device) => {
                console.log('Name: ' + device.name);

                dispatch({type: types.BLE_CONNECT, ble: {isConnecting: true, device: device}});

                device.addEventListener('gattserverdisconnected', () => dispatch({type: types.BLE_DISCONNECTED}));

                return device.gatt.connect();
            })
            .then(server => {
                return server.getPrimaryService(service_uuid);
            })
            .then(service => {
                return Promise.all([
                    service.getCharacteristic(pulse_uuid),
                    service.getCharacteristic(sat_uuid)
                ])
            })
            .then(characteristics => {
                console.log('connected');
                dispatch({type: types.BLE_CONNECT, ble: {
                        pulseCharacteristic: characteristics[0],
                        satCharacteristic: characteristics[1],
                        connected: true,
                        isConnecting: false,
                    }});
            })
            .catch((error) => {
                dispatch({type: types.BLE_CONNECT, ble: {isConnecting: false}});
                console.log("Something went wrong. " + error);
            });
    };
}

export function disconnect() {
    return (dispatch, getState) => {
        const state = getState();

        console.log(state.ble);
        state.ble.device.gatt.disconnect();
        dispatch({type: types.BLE_DISCONNECT});
    }
}
