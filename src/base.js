import { h, render, Component } from 'preact';
import L from 'leaflet';

import Map from './Map/Map';
import Timeline from './Timeline/Timeline';
import Description from './Description/Description';

import s from './base.css';

class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      current: 0,
      currentDate: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('https://lsv-data-visualizations.firebaseio.com/alertas.json')
      .then((response) => {
        return response.json()
      }).then((json) => {
      const data = [];
      json.map((event, index) => {
        const eventData = {
          department: event.departamento,
          description: event.descripcion,
          date: event.fecha,
          latitude: event.latitud,
          longitude: event.longitud,
          media: event['linkMedia(Foto-Audio-Video)'],
          village: event.municipio,
          title: event.titulo
        };
        data.push(eventData);
      });

      this.setState({ data });
    }).catch((ex) => {
      console.log('parsing failed', ex)
    });
  }

  render(props, state) {
    return (
      <div className={s.container}>
        <div className={s.sectionLeft}>
          <Map items={this.state.data} />
          <Timeline items={this.state.data} />
        </div>
        <div className={s.sectionRight}>
          <Description index={state.current + 1} {...state.data[state.current]} />
        </div>
      </div>
    )
  }
}
export default Base;