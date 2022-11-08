// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
function deg2rad(deg) {
    return deg.times(Math.PI / 180);
}
function kmToStatueMile(km) {
    return km.div(1.609344);
}
function kmToNauticalMile(km) {
    return km.div(1.852);
}
// END EXTRA CODE

/**
 * @param {Big} lat1
 * @param {Big} lon1
 * @param {Big} lat2
 * @param {Big} lon2
 * @param {string} unit - Must be one of: "KILOMETER" | "STATUTE MILE" | "NAUTICAL MILE"
 * @returns {Promise.<Big>}
 */
export async function GetStraightLineDistance(lat1, lon1, lat2, lon2, unit) {
	// BEGIN USER CODE
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2.minus(lat1)).toNumber();
    const dLon = deg2rad(lon2.minus(lon1)).toNumber();
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1).toNumber()) *
            Math.cos(deg2rad(lat2).toNumber()) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = new Big(R * c); // Distance in km
    switch (unit) {
        case "KILOMETER": {
            return d;
        }
        case "STATUTE MILE": {
            return kmToStatueMile(d);
        }
        case "NAUTICAL MILE": {
            return kmToNauticalMile(d);
        }
        default:
            throw new Error(`Unknown unit: ${unit}`);
    }
	// END USER CODE
}
