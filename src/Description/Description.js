import { h, render, Component } from 'preact';
import dateFormat from 'dateformat';

dateFormat.i18n = {
  dayNames: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
};

const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import s from './Description.css';

class Description extends Component {

  render(props, state) {
    const { index, title, description, date } = props;
    let content = description;
    if (typeof description === 'string') {
      content = md.render(content);
    }

    return (
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.number}>{index}</span>
          <h2 className={s.title}>
            {title}
            <span className={s.date}>{dateFormat(date, "fullDate")}</span>
          </h2>
        </header>
        <div className={s.description} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}

export default Description;

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = new Date(date).getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}