/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
const xml2js = require('xml2js');
/**
 * Internal Dependencies
 */
import Messenger from '../../components/messenger';

/**
 * Component
 */
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.fetchMessages();
    }
    
      fetchMessages = async() => {
          try {
          // Make a request to Twilio API to get messages
              const response = await axios.get('https://api.twilio.com/2010-04-01/Accounts/ACe79385ef5aff258d5b49a5b139c827c7/Messages', {
                  auth: {
                      username: "ACe79385ef5aff258d5b49a5b139c827c7",
                      password: "2500287e188644ab398eaebe413c705a",
                  },
                  'Content-Type': 'application/xml',
              });
              const xml = response.data;
              xml2js.parseString(xml, (err, result) => {
                  if (err) {
                      { /*eslint-disable*/ }
                  console.error('Error parsing XML:', err);
                } else {
                  const messages = result.TwilioResponse.Messages[0].Message;
                  console.log(messages);
                  // Now you can work with the 'messages' array containing individual message objects
                }
              });
              this.setState({ messages })
            } catch (error) {
              console.error('Error fetching messages:', error);
            }
          }

    render() {
        const { settings } = this.props;

        return (
            <Fragment>
                <Messenger settings={ settings } full />
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
