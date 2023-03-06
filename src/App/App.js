import config from '../../app.config';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import {DummyControl} from "./Mapbox/Control/DummyControl";
import { Map } from './Mapbox/Entity/Map';
import {AddMarker} from "./Mapbox/Entity/AddMarker";

import '../../assets/css/reset.css';
import '../../assets/css/style.css';

const STORAGE_KEY = 'my-events';


class App {

    value;

    constructor() {
        this.map = new Map();
        this.addMarker = new AddMarker(this.map);

        mapboxgl.accessToken = config.apis.mapbox_gl.api_key;

    }

    /**
     * Démarre l'application
     */

    start() {

        console.info('Starting App...');

        // Initialisation de le map
        this.map.mapInit();

        // Ajout du contrôle de navigation (zoom, inclinaison, etc.)
        this.map.navigationControl();

        // Ajout du contrôle de Géolocalisation
        this.map.geolocalisationControl();

        // Ajout d'un controle personnalisé "DummyControl"
        this.map.DummyControl();

        //Ajout d'un control perso "ClearLocalStorage"
        this.map.ClearStorageControl();

        // Récupération des données de géolocalisation
        this.map.getCoordinates();

        //Récupération des data
        this.addMarker.start();
    }

}

const instance = new App();


export default instance;