const app_id = 'UdRH6PlISTlADYsW6mzl';
const app_code = 'lfrrTheP9nBedeJyy1NtIA';

const platform = new H.service.Platform({
    app_id  : app_id,
    app_code: app_code,
    useHTTPS: true
});

const mapGroups = [
    new H.map.Group()
] ;

const initMap = (
    blockId,
    defaultLatitude = 44.73,
    defaultLongitude = 37.76,
    defaultZoom = 8
) => {
    const pixelRatio    = window.devicePixelRatio || 1;
    const defaultLayers = platform.createDefaultLayers({
        lg      : 'rus',
        tileSize: pixelRatio === 1 ? 256      : 512,
        ppi     : pixelRatio === 1 ? undefined: 320
    });

    window.map = new H.Map(
        document.getElementById(blockId),
        defaultLayers.normal.map,
        {
            zoom  : 8,
            center: { lat: 44.73, lng: 37.76 }
        },
        {
            pixelRatio: pixelRatio
        });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers, 'ru-RU');

    const mapSettings = ui.getControl('mapsettings');
    const zoom        = ui.getControl('zoom');
    const scalebar    = ui.getControl('scalebar');
    const pano        = ui.getControl('panorama');

    window.addEventListener('resize', () => {
        map.getViewPort().resize()
    });
    
    mapGroups.forEach(group => {
        window.map.addObject(group);
    });
};

const initMapListener = (eventListeners) => {
    window.map.addEventListener('tap', function (event) {
        const coords = window.map.screenToGeo(event.currentPointer.viewportX,
            event.currentPointer.viewportY);
        eventListeners.forEach(fun => {
            fun(coords);
        });
    });
};

const addPlaceToMap = (html, coords, minZoom = 0, maxZoom = 0) => {
    const icon = new H.map.DomIcon(html);

    const marker = new H.map.DomMarker(coords, {icon: icon,
        min: minZoom,
        max: maxZoom
    });
    mapGroups[0].addObject(marker);
};