import React, { ErrorInfo, PureComponent, ReactNode } from 'react';
import ky from 'ky';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

type StatusMessages = { [status: number]: string };
type Props = { statusMessages?: StatusMessages };
type State = { hasError: boolean; error: Error | null };
const DEFAULT_MESSAGES: StatusMessages = { 0: 'サーバエラーです' };

const Alert = (props: AlertProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError = (error: Error): State => ({
    hasError: true,
    error,
  });

  componentDidCatch = (error: Error, info: ErrorInfo): void => {
    console.error(error, info); // eslint-disable-line no-console
  };

  render = (): ReactNode => {
    const { children, statusMessages = {} } = this.props;
    const { hasError, error } = this.state;
    const messages = { ...DEFAULT_MESSAGES, ...statusMessages };

    if (hasError) {
      const statusCode = (error as ky.HTTPError)?.response?.status;

      if (statusCode && Object.keys(messages).includes(String(statusCode))) {
        return <Alert severity="error">{messages[statusCode]}</Alert>;
      }

      return <Alert severity="error">{messages[0]}</Alert>;
    }

    return children;
  };
}

export default ErrorBoundary;
