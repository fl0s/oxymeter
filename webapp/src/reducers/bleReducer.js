import initialState from './initialState';
import {BLE_CONNECT, BLE_DISCONNECT, BLE_DISCONNECTED} from '../actions/actionTypes';

export default function ble(state = initialState.ble, action) {
    switch (action.type) {
        case BLE_CONNECT:
            return {...state, ...action.ble};
        case BLE_DISCONNECT:
            return initialState.ble;
        case BLE_DISCONNECTED:
            return initialState.ble;
        default:
            return state;
    }
}
