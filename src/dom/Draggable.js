/**
 * @external L.Draggable
 *
 * @see https://github.com/Leaflet/Leaflet/tree/v1.9.3/src/dom/Draggable.js
 */

/**
 * A class for making DOM elements draggable (including touch support).
 * Used internally for map and marker dragging. Only works for elements
 * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
 */

export function installDraggable(L) {
    if (!L.Draggable || L.Draggable.__leafletRotateInstalled) {
        return;
    }

    L.Draggable.include({

        /** @TODO */
        // updateMapBearing: function(mapBearing) {
        //     this._mapBearing = mapBearing;
        // },

    });

    L.Draggable.__leafletRotateInstalled = true;
}