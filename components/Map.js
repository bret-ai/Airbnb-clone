import { getCenter } from 'geolib';
import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({});

    // Transform the searchResults into long-lat object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/bretai/cks8klc0l35km17p4rebpkyct'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocation(result)}
                            aria-label='push-pin'
                            role='img'
                        >📌</p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
