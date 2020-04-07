import styled from 'styled-components';
import { WebView } from 'react-native-webview';

export const BrowserView = styled(WebView)`
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#2c80ff',
  size: 48,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
