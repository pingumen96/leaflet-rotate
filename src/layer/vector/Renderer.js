/**
 * @external L.Renderer
 *
 * @see https://github.com/Leaflet/Leaflet/tree/v1.9.3/src/layer/vector/Renderer.js
 */

export function installRenderer(L) {
    if (!L.Renderer || L.Renderer.__leafletRotateInstalled) {
        return;
    }

    const rendererProto = L.extend({}, L.Renderer.prototype);

    L.Renderer.include({

        /**
         * Redraw L.Canvas and L.SVG renderer bounds after the
         * map is moved by just calling `map.setBearing(theta)`
         *
         * @listens L.Map~rotate
         */
        getEvents: function () {
            return L.extend(rendererProto.getEvents.apply(this, arguments), { rotate: this._update });
        },

        /**
         * Fix for `map.flyTo()` when `false === map.options.zoomAnimation`
         *
         * @see https://github.com/Leaflet/Leaflet/pull/8794
         */
        onAdd: function () {
            rendererProto.onAdd.apply(this, arguments);
            if (L.version <= "1.9.3") {
                // always keep transform-origin as 0 0
                this._container.classList.add('leaflet-zoom-animated');
            }
        },

        /**
         * @FIXME layer drifts on `map.setZoom()` (eg. zoom during animation)
         *
         * the main cause seems to be related to `this._updateTransform(path._center, path._zoom))`
         * and `this._topLeft = this._map.layerPointToLatLng(this._bounds.min);`
         *
         * @example
         *   map.setZoom(2);
         *   path._renderer._update();
         *   path._renderer._updateTransform(path._renderer._center, path._renderer._zoom);
         *
         * @see https://github.com/Leaflet/Leaflet/pull/8794
         * @see https://github.com/Leaflet/Leaflet/pull/8103
         * @see https://github.com/Leaflet/Leaflet/issues/7466
         *
         * @TODO rechek this changes from leaflet@v1.9.3
         *
         * @see https://github.com/Leaflet/Leaflet/compare/v1.7.0...v1.9.3
         */
        _updateTransform: function (center, zoom) {
            if (!this._map._rotate) {
                return rendererProto._updateTransform.apply(this, arguments);
            }
            /**
             * @FIXME see path._renderer._reset();
             */
            var scale = this._map.getZoomScale(zoom, this._zoom),
                offset = this._map._latLngToNewLayerPoint(this._topLeft, zoom, center);

            L.DomUtil.setTransform(this._container, offset, scale);

        },

        _update: function () {
            if (!this._map._rotate) {
                return rendererProto._update.apply(this, arguments);
            }
            // Update pixel bounds of renderer container (for positioning/sizing/clipping later)
            // Subclasses are responsible of firing the 'update' event.
            this._bounds = this._map._getPaddedPixelBounds(this.options.padding);
            this._topLeft = this._map.layerPointToLatLng(this._bounds.min);
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom();
        },

    });

    L.Renderer.__leafletRotateInstalled = true;
}
