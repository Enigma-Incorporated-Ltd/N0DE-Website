import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadButton = () => {
    const [downloadUrl, setDownloadUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const ORG = 'Enigma-Incorporated-Ltd';
    const REPO = 'EnigmaNet-N0DE-Binaries';

    useEffect(() => {
        const fetchLatestRelease = async () => {
        try {
            const response = await axios.get(`https://api.github.com/repos/${ORG}/${REPO}/releases/latest`);
            const assets = response.data.assets;
            const exeAsset = assets.find(asset => asset.name.endsWith('.exe'));
            
            if (exeAsset) {
            setDownloadUrl(exeAsset.browser_download_url);
            } else {
            setError('No executable found in latest release.');
            }
        } catch (err) {
            console.error('Failed to fetch release:', err);
            setError('Failed to fetch latest release.');
        } finally {
            setIsLoading(false);
        }
        };

        fetchLatestRelease();
    }, []);

    if (isLoading) return <button disabled>Loading...</button>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Download
        </button>
        </a>
    );
};

export default DownloadButton;