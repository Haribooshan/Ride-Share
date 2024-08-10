import React, { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Map as MapLibreMap, NavigationControl, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const RideModal = ({ show, onHide, ride, user }) => {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!show || !mapContainerRef.current) return;

        if (mapInstanceRef.current) {
            mapInstanceRef.current.resize();
            return;
        }

        const sourceCoords = [ride.src_coords.lng, ride.src_coords.lat];
        const destinationCoords = [ride.dst_coords.lng, ride.dst_coords.lat];

        const map = new MapLibreMap({
            container: mapContainerRef.current,
            center: [(sourceCoords[0] + destinationCoords[0])/2, (sourceCoords[1] + destinationCoords[1])/2],
            zoom: 10,
            style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
            transformRequest: (url, resourceType) => {
                const apiKey = process.env.REACT_APP_OLA_MAPS_API_KEY;
                const newUrl = new URL(url);
                newUrl.searchParams.set('api_key', apiKey);
                return { url: newUrl.toString(), resourceType };
            },
        });

        const nav = new NavigationControl({
            visualizePitch: true,
        });
        map.addControl(nav, 'top-left');

        new Marker({ color: 'green', opacity: '0.65' })
            .setLngLat(sourceCoords)
            .addTo(map);

        new Marker({ color: 'red', opacity: '0.65' })
            .setLngLat(destinationCoords)
            .addTo(map);
        
        const geojson = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [sourceCoords, destinationCoords],
            },
        };

        map.on('load', () => {
            map.addSource('route', {
                type: 'geojson',
                data: geojson,
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#ff7f50',
                    'line-width': 5,
                },
            });
        });

        mapInstanceRef.current = map;

    });

    function onModalClose() {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }
        onHide();
    }

    return (
        <Modal show={show} fullscreen onHide={onModalClose} className='kanit-light'>
            <Modal.Header closeButton>
                <h3>Ride Details</h3>
            </Modal.Header>
            <Modal.Body>
            <div className='d-flex justify-content-between align-items-center p-2' style={{marginTop: "10vh"}}>
                <div style={{width: "50%"}}>
                    <p><span className='kanit-regular'>Name: </span>{user.name}</p>
                    <p><span className='kanit-regular'>Email ID: </span>{user.email}</p>
                    <p><span className='kanit-regular'>Phone: </span>{ride.phoneNo}</p>
                    <p><span className='kanit-regular'>Source (Green): </span>{ride.src}</p>
                    <p><span className='kanit-regular'>Destination (Red): </span>{ride.dst}</p>
                    <p><span className='kanit-regular'>Departure Date & Time: </span>{ride.dateOfDeparture}, {ride.departureTime}</p>
                    <p><span className='kanit-regular'>Time Flexibility: </span>{ride.timeFlexibility} minutes</p>
                    {ride.comments && <p><span className='kanit-regular'>Comments: </span>{ride.comments}</p>}
                </div>
                <div
                    ref={mapContainerRef}
                    style={{ width: '50%', height: '60vh' }}
                />
            </div>
            </Modal.Body>
        </Modal>
        );
    };

export default RideModal;
