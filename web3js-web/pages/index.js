
import React from 'react';
import Head from 'next/head';
import web3 from '../ethereum/web3';

const Index = () =>
  <div>
    <Head>
      <title>Token transfer</title>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" charset="utf-8"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
      <script src="static/index.js"></script>
    </Head>

    <div className="navbar-fixed">
      <nav className="green">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo center"><i className="material-icons">cloud</i>Token Transfer</a>
        </div>
        <div id="progressbar" className="progress hide">
          <div className="indeterminate"></div>
        </div>
      </nav>
    </div>

    <div className="container">
      <div className="row">
        <div className="col s6 offset-s3">
          <img src="https://crypto-fox.ru/wp-content/uploads/2017/07/ETC.png" style={{ width: '100%' }} /><br />
        </div>
      </div>

      <div className="row">
        <div className="col s6 offset-s4">
          <blockquote>
            Your current balance: <span id="token"></span> tokens.
          </blockquote>
        </div>
      </div>

      <div className="row">
        <div className="col s6 center-align">
          <h3>Buy Tokens</h3>
          <p>current price: 0.01 ether = 10 tokens</p>
          <input type="text" id="inputEthers" /><br />
          <div className="waves-effect waves-light btn buyButton">
            Send ether
          </div>
        </div>
        <div className="col s6 center-align">
          <h3>Message</h3>
          <p>to setup new message you need 10 tokens</p>
          <input type="text" id="inputString" /><br />
          <div className="waves-effect waves-light btn setupButton">
            Setup
          </div>
        </div>
      </div>

      <div className="row">
        <table>
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Current Message</th>
              <th>Last Donator</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="msg"></td>
              <td id="donator"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>;

export default Index;
