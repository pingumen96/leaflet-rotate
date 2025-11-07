import { installPoint } from './geometry/Point';
import { installDomUtil } from './dom/DomUtil';
import { installDraggable } from './dom/Draggable';
import { installDivOverlay } from './layer/DivOverlay';
import { installPopup } from './layer/Popup';
import { installTooltip } from './layer/Tooltip';
import { installMarkerIcon } from './layer/marker/Icon';
import { installMarker } from './layer/marker/Marker';
import { installGridLayer } from './layer/tile/GridLayer';
import { installRenderer } from './layer/vector/Renderer';
import { installMap } from './map/Map';
import { installCompassBearing } from './map/handler/CompassBearing';
import { installContainerMutation } from './map/handler/ContainerMutation';
import { installTouchGestures } from './map/handler/TouchGestures';
import { installTouchRotate } from './map/handler/TouchRotate';
import { installShiftKeyRotate } from './map/handler/ShiftKeyRotate';
import { installTouchZoom } from './map/handler/TouchZoom';
import { installRotateControl } from './control/Rotate';

/**
 * Apply the Leaflet-Rotate extensions to a provided Leaflet namespace.
 * The function returns the same namespace to enable chaining.
 *
 * @param {typeof L} L Leaflet namespace to extend.
 * @returns {typeof L}
 */
export function install(L) {
    if (!L || typeof L !== 'object') {
        throw new Error('Leaflet namespace required');
    }

    installPoint(L);
    installDomUtil(L);
    installDraggable(L);
    installMap(L);
    installDivOverlay(L);
    installPopup(L);
    installTooltip(L);
    installMarkerIcon(L);
    installMarker(L);
    installGridLayer(L);
    installRenderer(L);
    installCompassBearing(L);
    installContainerMutation(L);
    installTouchGestures(L);
    installTouchRotate(L);
    installShiftKeyRotate(L);
    installTouchZoom(L);
    installRotateControl(L);

    return L;
}

export default { install };
