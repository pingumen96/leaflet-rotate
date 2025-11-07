/**
 * @external L.GridLayer
 *
 * @see https://github.com/Leaflet/Leaflet/tree/v1.9.3/src/layer/tile/GridLayer.js
 */

export function installGridLayer(L) {
    if (!L.GridLayer || L.GridLayer.__leafletRotateInstalled) {
        return;
    }

    const gridLayerProto = L.extend({}, L.GridLayer.prototype);

    L.GridLayer.include({

        /**
         * Redraw L.TileLayer bounds after the map is
         * moved by just calling `map.setBearing(theta)`
         *
         * @listens L.Map~rotate
         */
        getEvents: function () {
            var events = gridLayerProto.getEvents.apply(this, arguments);
            if (this._map._rotate && !this.options.updateWhenIdle) {
                if (!this._onRotate) {
                    this._onRotate = L.Util.throttle(this._onMoveEnd, this.options.updateInterval, this);
                }
                events.rotate = this._onRotate;
            }
            return events;
        },

        _getTiledPixelBounds: function (center) {
            if (!this._map._rotate) {
                return gridLayerProto._getTiledPixelBounds.apply(this, arguments);
            }

            return this._map._getNewPixelBounds(center, this._tileZoom);
        },

    });

    L.GridLayer.__leafletRotateInstalled = true;
}
