/* eslint-disable react/style-prop-object */
/* @flow */
import React from 'react';
import { PROJECT_DESCRIPTION } from '../constants';

export class Logo extends React.Component {
  render() {
    return (
      <div
        data-svg-id="4fcabd17013d4c548c63b696bea42470.svg"
        data-svg-type="shape"
        data-display-mode="legacyFit"
        data-strokewidth={0}
        data-viewbox="0 0 49.03 38.52"
        data-preserve-viewbox="ignore"
        className="logo-container"
        id="comp-iovc9qit"
      >
        <a
          href="https://www.anymetrica.com"
          target="_self"
          style={{ cursor: 'pointer' }}
          id="comp-iovc9qitlink"
          className="style-jntz7b9clink"
        >
          <div
            style={{}}
            className="style-jntz7b9c_comp-iovc9qit style-jntz7b9c_non-scaling-stroke style-jntz7b9csvg"
            id="comp-iovc9qitsvg"
          >
            <svg
              preserveAspectRatio="xMidYMid meet"
              data-bbox="0 0 49.04 38.52"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 49.04 38.52"
              role="img"
              className="logo-large"
              strokeWidth={0}
              fillOpacity={1}
              strokeOpacity={0}
            >
              <g>
                <path d="M8.91 11.99v26.52H0V11.99h8.91z" />
                <path d="M49.04 21.15v17.37h-8.92V21.15h8.92z" />
                <path d="M22.28 0v38.52h-8.91V0h8.91z" />
                <path d="M35.66 9.2v29.32h-8.91V9.2h8.91z" />
              </g>
            </svg>
            <span style={{
              fontSize: 36,
              fontFamily: 'din-next-w01-light, din-next-w02-light, din-next-w10-light, sans-serif',
              color: 'white',
              letterSpacing: '0.15em',
              marginLeft: '0.5em',
            }}
            >
ANYMETRICA
            </span>
          </div>
        </a>
        <div className="logo-container-info">
          {PROJECT_DESCRIPTION}
        </div>

      </div>
    );
  }
}
