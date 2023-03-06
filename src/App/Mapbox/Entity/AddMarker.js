import mapboxgl from "mapbox-gl";
import {LocalStorageService} from "../../Service/LocalStorageService";
import {LocalEvent} from "./LocalEvent";

const STORAGE_KEY = 'my-events';


export class AddMarker {

    localEventStorage = null;
    arrLocalEvent = [];

    eventTitle = null;
    eventDescription = null;
    eventStartDate = null;
    eventFinishDate = null;
    eventLat = null;
    eventLng = null;
    eventSubmit = null;
    form = null;
    value;
    map;

    constructor(map) {
        this.map = map;
        this.eventLat = document.getElementById("lat");
        this.eventLng = document.getElementById("lng");
        this.eventTitle = document.getElementById("title");
        this.eventDescription = document.getElementById("description");
        this.eventStartDate = document.getElementById("start-date");
        this.eventFinishDate = document.getElementById("finish-date");
        this.eventSubmit = document.getElementById("submit");
        this.form = document.forms[0];
        this.form.addEventListener('submit', this.handlerNewEvent.bind(this));
        this.localEventStorage = new LocalStorageService(STORAGE_KEY);
    }

    // Récupération et affichage des données du localStorage
    start(){

        let dataJson = this.localEventStorage.getJSON();
        // console.log(dataJson);
        if (dataJson === null ){
            return;
        }
        for ( let i of dataJson ) this.arrLocalEvent.push( new LocalEvent(i) );
        this.render();
    }
    // Ajout d'un nouvel évènement dans le local storage
    handlerNewEvent(evt){

        let strTitle = this.eventTitle.value.trim();
        let strDescription = this.eventDescription.value.trim();
        let strEventLat = this.eventLat.value;
        let strEventLng = this.eventLng.value;
        let strEventStartDate = this.eventStartDate.value;
        let strEventFinishDate = this.eventFinishDate.value;

        evt.preventDefault();
        // console.log(evt);
        // console.log( this.eventLat.value );

        const newEventLocal = {};

        newEventLocal.title = strTitle;
        newEventLocal.description = strDescription;
        newEventLocal.latitude = strEventLat;
        newEventLocal.longitude = strEventLng;
        newEventLocal.dateStart = strEventStartDate;
        newEventLocal.dateFinish = strEventFinishDate;

        // console.log( newEventLocal );
        // console.log(new LocalEvent(newEventLocal));
        this.arrLocalEvent.push( new LocalEvent(newEventLocal));

       // console.log( this.arrLocalEvent );

        this.render();

        this.localEventStorage.setJSON( this.arrLocalEvent );
    }

    // Affichage du marqueurs sur la carte
    markerColor(localEvent) {
        let colorOfMarker = '';
        // console.log(localEvent);
        const startDate = new Date(localEvent.dateStart).getTime();
        const  endDate = new Date(localEvent.dateFinish).getTime();
        const dateNow = new Date().getTime();
        //console.log( dateNow );
        //console.log( startDate );

        if ( startDate > dateNow && startDate > dateNow + (3*24*60*60*1000)){
            // console.log( 'Tu as le temps' )
            colorOfMarker =  'green'

        }
        if ( startDate > dateNow  && startDate < dateNow + (3*24*60*60*1000)) {
            // console.log( 'Attention dans 3 jours' )
            colorOfMarker =  'orange'
        }
        if ( endDate < dateNow ){
            // console.log( 'too late' )
            colorOfMarker =  'red'
        }
        const marker = new mapboxgl.Marker({
            color: colorOfMarker
        });


        // Affichage des infos au survol
        let markerDiv = marker.getElement();
        markerDiv.title = `${localEvent.title} du ${localEvent.dateStart} au ${localEvent.dateFinish}`
        //  console.log(this.eventLat.value);

        marker.setLngLat({
            lon: localEvent.longitude,
            lat: localEvent.latitude
        });

        //console.log( this.eventTitle.value );

        const popup = new mapboxgl.Popup();
        popup.setHTML('' +
            `<h2>${localEvent.title}</h2>` +
            `<p>${localEvent.description}</p>` +
            `<p>${localEvent.dateStart}</p>` +
            `<p>${localEvent.dateFinish}</p>`
        );

        marker.setPopup( popup );
        marker.addTo( this.map.mainMap );

    }

    render()
    {
        for ( let i of this.arrLocalEvent ) {
            // console.log(i);
            this.markerColor(i);
        }
    }

}