import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import {arrayCompare} from '@nju33/array-compare';
import '../styles/index.scss';

export default class Index extends React.Component {
  static async getInitialProps({query}) {
    return {query};
  }

  constructor(props) {
    super(props);

    this.state = {
      acc: [],
      // tables: [],
    };
  }

  get commithashes() {
    return this.props.query.diff.split('...');
  }

  splitXY(content) {
    const lines = content.split('\n');
    return lines.map(line => {
      return line.split(',');
    });
  }

  async componentDidMount() {
    await Promise.all(
      this.commithashes.map(commithash => {
        return ky
          .get(
            `/api/v1/table?pat=${this.props.query.pat}&filename=${
              this.props.query.filename
            }&ref=${commithash}`,
          )
          .json();
      }),
    )
      .then(result => {
        return result.map(file => this.splitXY(file.content));
      })
      .then(result => {
        const acc = [];
        const y = Math.max(result[0].length, result[1].length);

        let i = 0;
        while (i < y) {
          acc.push(arrayCompare(result[0][i], result[1][i]));
          i++;
        }

        const getMaxX = Math.max(...acc.map(line => line.length));
        acc.map(line => {
          if (line.length < getMaxX) {
            let i = line.length;
            while (i < getMaxX) {
              line.push({
                equal: true,
                a: '',
                b: ''
              });

              i++;
            }
          }
          return line;
        });

        this.setState({acc});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <table className="atom-Table">
          {/* <thead>
            <tr>
              <th>a</th>
              <th>b</th>
              <th>c</th>
              <th>d</th>
            </tr>
          </thead> */}
          <tbody>
            {this.state.acc.map((lines, i) => {
              return (
                <tr key={i}>
                  {lines.map((item, j) => {
                    return <td key={j} data-equal={item.equal}>{item.a}</td>;
                  })}
                </tr>
              );
            })}
            {/* <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}

Index.propTypes = {
  query: PropTypes.shape({
    pat: PropTypes.string,
    filename: PropTypes.string,
    diff: PropTypes.string,
  }),
};
