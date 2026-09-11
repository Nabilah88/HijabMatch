import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Text,
  Form,
  FormField,
  MaskedInput,
  TextArea,
  TextInput,
  Heading,
} from "grommet";
import { MailOption, Location, Phone, Chat } from "grommet-icons";

const defaultValue = {
  name: "",
  email: "",
  comments: "",
};

const Contact = () => {
  const [value, setValue] = useState(defaultValue);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  return (
    <Box
      fill
      align="center"
      justify="center"
      pad="large"
      background="linear-gradient(135deg, #f7d4e8 0%, #d8b4fe 100%)"
      style={{ minHeight: "calc(100vh - 80px)" }}
      id="contactus"
    >
      <Grid
        columns={["1/2", "1/2"]}
        gap="large"
        width="xlarge"
        pad="medium"
      >
        
        <Box
          background="rgba(255,255,255,0.35)"
          round="large"
          pad="large"
          elevation="medium"
          style={{
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
          gap="medium"
        >
          <Heading size="medium" textAlign="center" margin="none">
            Contact Us
          </Heading>

          <Text size="medium" textAlign="center" color="dark-2">
            We’d love to hear from you. Reach out anytime.
          </Text>

          <Box gap="medium" margin={{ top: "medium" }}>
            <Box direction="row" align="center" gap="small">
              <MailOption color="brand" />
              <Text size="medium">HijabMatch@gmail.com</Text>
            </Box>

            <Box direction="row" align="center" gap="small">
              <Phone color="brand" />
              <Text size="medium">+1 (267) 555‑0192</Text>
            </Box>

            <Box direction="row" align="center" gap="small">
              <Location color="brand" />
              <Text size="medium">332 Sugartown Road, Devon PA</Text>
            </Box>

            <Box direction="row" align="center" gap="small">
              <Chat color="brand" />
              <Text size="medium">Live Chat Coming Soon</Text>
            </Box>
          </Box>
        </Box>

    
        <Box
          background="white"
          round="large"
          pad="large"
          elevation="large"
          style={{ border: "1px solid #f3e8ff" }}
          gap="medium"
        >
          <Heading size="small" textAlign="center" margin="none">
            Send Us a Message
          </Heading>

          <Form
            value={value}
            onChange={(nextValue) => setValue(nextValue)}
            onReset={() => setValue(defaultValue)}
            onSubmit={async ({ value: formValue }) => {
              setSending(true);
              setError(null);
              setSuccess(null);
              try {
                const API_BASE =
                import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
                const res = await fetch(`${API_BASE}/api/contact/`, {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(formValue),
               });
                const data = await res.json();
                if (res.ok) {
                  setSuccess(data.message || 'Message sent');
                  setValue(defaultValue);
                } else {
                  setError(data.error || 'Could not send message');
                }
              } catch (err) {
                setError('Network error — try again');
              } finally {
                setSending(false);
              }
            }}
          >
            <FormField label="Name" name="name">
              <TextInput name="name" placeholder="Your full name" />
            </FormField>

           <FormField
           label="Email"
           name="email"
           required
           validate={(email) =>
           /\S+@\S+\.\S+/.test(email)
          ? undefined
           : "Enter a valid email address."
          }
        >
         <TextInput
         name="email"
         type="email"
          placeholder="example@email.com"
         />
</FormField>

            <FormField label="Message" name="comments" required>
          <TextArea
           name="comments"
           placeholder="How can we help you?"
           maxLength={2000}
          />
         </FormField>
            <Box
              direction="row"
              justify="center"
              margin={{ top: "large" }}
              gap="medium"
            >
              <Button label="Reset" type="reset" />
              <Button
                label={sending ? 'Sending...' : 'Submit'}
                type="submit"
                primary
                disabled={sending}
                style={{
                  borderRadius: "12px",
                  padding: "8px 24px",
                }}
              />
            </Box>
            {success && (
              <Text color="status-ok" margin={{ top: 'small' }}>{success}</Text>
            )}
            {error && (
              <Text color="status-error" margin={{ top: 'small' }}>{error}</Text>
            )}
          </Form>
        </Box>
      </Grid>
    </Box>
  );
};

export default Contact;
