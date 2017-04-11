import { h, render, Component } from 'preact';
import L from 'leaflet';

import s from './Map.css';

const icon = require('./images/marker-icon-2x.png');

class Map extends Component {

  componentDidMount() {
    this.map = L.map('map').setView([6.018849, -76.744995], 7);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // L.marker([51.5, -0.09]).addTo(map)
    //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //   .openPopup();

    this.getItems();
  }

  componentWillReceiveProps(newprops) {
    this.getItems(newprops.items);
  }

  getItems(newItems) {
    var greenIcon = L.icon({
      iconUrl: icon,
      iconSize:     [25, 41]
    });

    let items = newItems;
    if (!newItems) items = this.props.items;
    items.map((item, index) => {
      const {latitude, longitude, title} = item;
      if (latitude && longitude) {
        L.marker([latitude, longitude], {icon: greenIcon}).addTo(this.map)
          .bindPopup(title)
          .openPopup();
      }
    });
  }

  render() {
    return (
      <div className={s.map} id="map" />
    )
  }
}
export default Map;