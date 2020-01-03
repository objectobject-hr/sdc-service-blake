import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import OverviewNav from './components/OverviewNav.jsx'
import './style.css'

ReactDOM.render(<App />, document.getElementById('kat-service'))
ReactDOM.render(<OverviewNav />, document.getElementById('overview-sticky-nav'))
