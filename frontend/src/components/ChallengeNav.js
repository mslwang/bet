import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Feed from '../Feed';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Profile from '../Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Group from '../Group';
import Button from 'react-bootstrap/Button';
import Details from '../Details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Progress from './Progress';
import './ChallengeNav.css';
import Axios from 'axios';

export default function ChallengeNav(props) {
  let match = useRouteMatch();
  let { challengeId } = useParams();
  const [challenge, setChallenge] = useState([]);
  let fetchData = async () => {
    let data = await Axios.get(`/challenge/${challengeId}`);
    setChallenge(data.data);
  }
  useEffect(() => {
    fetchData();
  }, [challengeId, fetchData]);
  // if (!challenge) {
  //   fetchData();
  //   console.warn("fetching data because challenge is empty");
  // }
  return (
    <>
      <div style={{ paddingTop: "50px" }}>
        <div class='challenge_nav'>
          <Navbar>
            <Nav.Item>
              <Nav.Link as={Link} to={`${match.url}/progress`}> Progress </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={`${match.url}/details`}> Details </Nav.Link>
            </Nav.Item>
          </Navbar>
        </div>
        <div class="user">
          <Switch>
            <Route path={`${match.url}/progress`}>
              {challenge != [] ? <Progress challenge={challenge} members={props.members}/> :
              "404 No challenge found."}
            </Route>

            <Route path={`${match.url}/details`}>
              {challenge != [] ? <Details challenge={challenge} /> :
              "404 No challenge found."}
            </Route>
          </Switch>
        </div>
      </div>
    </>);
}
