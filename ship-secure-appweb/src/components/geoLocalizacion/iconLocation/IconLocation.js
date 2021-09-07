import L from 'leaflet'

/*Definimos la apariencia y el tamaño del icono*/
export const IconLocation = L.icon({
    iconUrl: require('./icon.svg'),
    iconRetinaUrl: require ('./icon.svg'),
    iconSize: [60,60],
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,


});
