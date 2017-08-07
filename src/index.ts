export { default as Div } from './div';
export { default as Icon } from './icon';
export { default as Input } from './input';
export { default as Txt } from './txt';

export const injectCSS = () => {
  const div = document.createElement('div');
  div.innerHTML = `&shy;<style>

  .e1.e2.e3.e4.e5 {
    box-sizing: border-box;
  }
  .e1.e2.e3.e4.e5 *,
  .e1.e2.e3.e4.e5 *:before,
  .e1.e2.e3.e4.e5 *:after {
    box-sizing: inherit;
  }

  .e1.e2.e3.e4.e5,
  .e1.e2.e3.e4.e5 div,
  .e1.e2.e3.e4.e5 span,
  .e1.e2.e3.e4.e5 a,
  .e1.e2.e3.e4.e5 p,
  .e1.e2.e3.e4.e5 label,
  .e1.e2.e3.e4.e5 h1,
  .e1.e2.e3.e4.e5 h2,
  .e1.e2.e3.e4.e5 h3,
  .e1.e2.e3.e4.e5 h4,
  .e1.e2.e3.e4.e5 h5,
  .e1.e2.e3.e4.e5 h6,
  .e1.e2.e3.e4.e5 table,
  .e1.e2.e3.e4.e5 tbody,
  .e1.e2.e3.e4.e5 tfoot,
  .e1.e2.e3.e4.e5 thead,
  .e1.e2.e3.e4.e5 tr,
  .e1.e2.e3.e4.e5 th,
  .e1.e2.e3.e4.e5 td,
  .e1.e2.e3.e4.e5 input,
  .e1.e2.e3.e4.e5 textarea,
  .e1.e2.e3.e4.e5 select,
  .e1.e2.e3.e4.e5 optgroup,
  .e1.e2.e3.e4.e5 option,
  .e1.e2.e3.e4.e5 form {
    margin: 0;
    padding: 0;
    border: 0;
    width: auto;
    height: auto;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    outline: none;
    text-align: left;
  }

  </style>`;
  document.body.appendChild(div.childNodes[1]);
};
