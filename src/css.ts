const css = `

.e0.e1.e2.e3.e4,
.e0.e1.e2.e3.e4:before,
.e0.e1.e2.e3.e4:after,
.e5.e6.e7.e8.e9,
.e5.e6.e7.e8.e9:before,
.e5.e6.e7.e8.e9:after {
  box-sizing: border-box;
}
.e5.e6.e7.e8.e9 *,
.e5.e6.e7.e8.e9 *:before,
.e5.e6.e7.e8.e9 *:after {
  box-sizing: inherit;
}

.e0.e1.e2.e3.e4,
.e0.e1.e2.e3.e4:before,
.e0.e1.e2.e3.e4:after,
.e5.e6.e7.e8.e9,
.e5.e6.e7.e8.e9:before,
.e5.e6.e7.e8.e9:after,
.e5.e6.e7.e8.e9 *,
.e5.e6.e7.e8.e9 *:before,
.e5.e6.e7.e8.e9 *:after {
  margin: 0;
  padding: 0;
  border: 0;
  width: auto;
  height: auto;
  font-family: inherit;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: 1.5;
  color: black;
  text-decoration: none;
  vertical-align: baseline;
  outline: none;
  text-align: left;
}

`;

if (typeof document !== 'undefined') {
  const div = document.createElement('div');
  div.innerHTML = `&shy;<style>${css}</style>`;
  document.body.appendChild(div.childNodes[1]);
}

export default css;
