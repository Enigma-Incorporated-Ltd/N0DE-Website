import React, { useEffect, useState, Suspense, lazy } from "react";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import mockCountries from "./mock-countries.json";

const GlobeComponent = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [globeTexture, setGlobeTexture] = useState<string | null>(null);

    useEffect(() => {
        import('./earth-dark.jpg').then(texture => {
            setGlobeTexture(texture.default);
        });

        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then(res => res.json())
            .then(data => setCountries(data.features));

        setCountries(mockCountries.features);
    }, []);


    return (
        <div style={{ width: '100%', height: '600px', background: '#000' }}>
            {globeTexture && (
                <Globe
                    globeImageUrl={globeTexture}
                    backgroundColor="#000000"
                    polygonsData={countries}
                    polygonAltitude={d => 0.01}
                    polygonCapColor={() => 'rgba(0, 200, 255, 0.7)'}
                    polygonSideColor={() => 'rgba(0, 100, 150, 0.5)'}
                    polygonStrokeColor={() => '#111'}
                    polygonLabel={({ properties }) => `${properties.ADMIN}`}
                    width={window.innerWidth}
                    height={600}
                />
            )}
        </div>
    )
}

export default GlobeComponent;