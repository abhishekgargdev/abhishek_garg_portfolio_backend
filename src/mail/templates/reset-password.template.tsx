import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
  Hr,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  userName: string;
  resetLink: string;
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  userName,
  resetLink,
}) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={heading}>Password Reset Request</Text>
            <Text style={paragraph}>Hello {userName},</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Click the button below to create a new password:
            </Text>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
            <Text style={paragraph}>
              Or copy and paste this link into your browser:
            </Text>
            <Link href={resetLink} style={link}>
              {resetLink}
            </Link>
            <Hr style={hr} />
            <Text style={footer}>
              This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#484848',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
};

const link = {
  color: '#5469d4',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export default ResetPasswordEmail;