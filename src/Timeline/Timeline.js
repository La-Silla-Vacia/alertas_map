import { h, render, Component } from 'preact';

import s from './Timeline.css';

class Timeline extends Component {

  constructor() {
    super();

    this.state = {
      current: false,
      startDate: false,
      endDate: false,
      totalTime: false
    };
  }

  componentDidMount() {
    this.setDates();
  }

  componentWillReceiveProps(newprops) {
    this.setDates(newprops.items);
  }

  setDates(newItems) {
    const dates = [];
    let items = newItems;
    if (!newItems) items = this.props.items;

    items.map((item, index) => {
      const { date } = item;
      if (date) {
        dates.push(toTimestamp(date));
      }
    });
    dates.sort();
    this.setState({
      startDate: dates[0],
      endDate: dates[dates.length - 1],
      totalTime: dates[dates.length - 1] - dates[0]
    })
  }

  getItems() {
    const items = this.props.items;
    return items.map((item, index) => {
      const { title, date } = item;
      if (date) {
        const timestamp = toTimestamp(date);
        let left = (timestamp - this.state.startDate) / this.state.totalTime;
        const style = {
          left: `${left * 100}%`
        };
        return (
          <button className={s.item} style={style} key={index}>
            <div className={s.title}>
              {title}
            </div>
          </button>
        );
      }
    });
  }

  render(props, state) {
    const items = this.getItems();

    return (
      <div className={s.container}>
        {items}
      </div>
    )
  }
}

export default Timeline;
function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}