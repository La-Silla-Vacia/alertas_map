import { h, render, Component } from 'preact';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import s from './Description.css';

class Description extends Component {

  render(props, state) {
    const { index, title, description } = props;
    let content = description;
    if (typeof description === 'string') {
      content = md.render(content);
    }

    return (
      <div className={s.container}>
        <header className={s.header}>
          <span className={s.number}>{index}</span>
          <h2 className={s.title}>{title}</h2>
        </header>
        <div className={s.description} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}

export default Description;
