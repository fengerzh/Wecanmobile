// @flow

import React, { PureComponent } from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';

class AboutScreen extends PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Text>
            关于微能
          </Text>
        </Content>
      </Container>
    );
  }
}

export default AboutScreen;
