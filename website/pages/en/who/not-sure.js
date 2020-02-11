/**
 * Copyright 2019 Parity Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const React = require("react");

const HomeSplash = require(`${process.cwd()}` + `/core/HomeSplash`);
const { Timeline, Timespot } = require(`${process.cwd()}` +
  `/core/Timeline`);

const Container = require("../../../../../react-bootstrap/Container");
const Button = require("../../../../../react-bootstrap/Button");
const translate = require('../../../server/translate').translate;

class NotSure extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const NotSureTimeline = () => (
      <Timeline>
        <Timespot>
          <h3 className="mt-3">
            <translate>The Past, Present, and Future of Substrate</translate>
          </h3>
          <iframe
            src="https://www.youtube-nocookie.com/embed/X40Duo7kWOI"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            width="560"
            height="315"
            frameBorder="0"
          />
        </Timespot>
        <Timespot>
          <h3 className="mt-3">
            <translate>Substrate Runtime Module Library Overview</translate>
          </h3>
          <iframe
            src="https://www.youtube-nocookie.com/embed/kpUO8g_Ig0A?start=0&amp;end=2452"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            width="560"
            height="315"
            frameBorder="0"
          />
        </Timespot>
        <Timespot>
          <h3 className="mt-3">
            <translate>Getting Started with Substrate Smart Contracts</translate>
          </h3>
          <iframe
            src="https://www.youtube-nocookie.com/embed/-EJHu0u6hT8?start=0&amp;end=1059"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            width="560"
            height="315"
            frameBorder="0"
          />
        </Timespot>
        <Timespot>
          <h3 className="mt-3">
            <translate>Restart your journey through the Substrate Developer Hub</translate>
          </h3>
          <Button
            variant="secondary"
            href={baseUrl}
            className="m-1 primary-color"
            >
            <translate>Back to Home</translate>
          </Button>
        </Timespot>
      </Timeline>
    );

    return (
      <div>
        <HomeSplash
          siteConfig={siteConfig}
          language={language}
          title={<translate>Learn About Substrate</translate>}
          tagline={<translate>Watch these videos to get up to speed!</translate>}
          padding={0}
        />
        <Container>
          <NotSureTimeline />
        </Container>
      </div>
    );
  }
}

NotSure.title = 'Learn About Substrate';
NotSure.description = 'Start learning about Substrate from ground zero.';
module.exports = NotSure;
