// HowItWorks.jsx
import { Box, Text, Grid, Button } from 'grommet';
import { Sparkles, Palette, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import photoStep from '../../assets/iconPhoto.png';
import userStep from '../../assets/iconUser.jpg';
import hijabsStep from '../../assets/iconHijabs.png';

import { Link } from "react-router-dom";


const STEPS = [
  {
    num: '01',
    title: 'Upload Your Photo',
    desc: 'Take a clear selfie in natural lighting or upload a photo from your device.',
    visual: (
      <Box round="small" overflow="hidden" height="140px">
        <img
          src={photoStep}
          alt="Upload a selfie for analysis"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    ),
    tip: 'Use natural light and avoid heavy makeup for best results.',
  },
  {
    num: '02',
    title: 'AI Skin Tone Analysis',
    desc: 'Our AI detects your skin tone, undertone, and seasonal profile in seconds.',
    visual: (
      <Box round="small" overflow="hidden" height="140px">
        <img
          src={userStep}
          alt="AI analyzing skin tone"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    ),
  },
  {
    num: '03',
    title: 'Get Your Perfect Hijab Colors',
    desc: 'Receive personalized hijab color recommendations that complement your complexion.',
    visual: (
      <Box round="small" overflow="hidden" height="140px">
        <img
          src={hijabsStep}
          alt="Recommended hijab colors"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
    ),
  },
];

const WHAT_YOU_GET = [
  { icon: <Palette size={20} />, label: 'Personalized color palette' },
  { icon: <Sparkles size={20} />, label: 'Seasonal analysis' },
  { icon: <BookOpen size={20} />, label: 'Hijab guide & tips' },
];

const TRUST = ['No signup required', 'Instant results', '100% private & secure'];

export default function Steps() {
  return (
    <Box
      style={{
        background: 'linear-gradient(135deg, #C56BC8 0%, #8B3FA8 45%, #6B2D8B 100%)',
        borderRadius: '16px',
      }}
      pad="large"
      id='how-it-works'
    >
      {/* Header */}
      <Box align="center" margin={{ bottom: 'large' }}>
        <Box
          direction="row"
          align="center"
          gap="10px"
          pad={{ vertical: '12px', horizontal: '18px' }}
          style={{
            background: 'rgba(80, 20, 60, 0.55)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            userSelect: 'none',
          }}
        >
          <Sparkles size={14} />
          <Text size="small" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }} color="white">
            How it works
          </Text>
        </Box>
        <Text size="xlarge" weight={400} color="white" textAlign="center" style={{ lineHeight: 1.2 }}>
          Find Your{' '}
          <span style={{ color: '#EEB8EE' }}>Most Flattering</span>{' '}
          Hijab Colors
        </Text>
        <Text
          size="medium"
          color="rgba(255,255,255,0.75)"
          textAlign="center"
          margin={{ top: 'small' }}
          style={{ maxWidth: 480 }}
        >
          Our AI analyzes your skin tone and suggests hijab colors that naturally enhance your beauty.
        </Text>
      </Box>

      {/* Step Cards */}
      <Grid columns={{ count: 'fit', size: 'small' }} gap="medium" margin={{ bottom: 'medium' }}>
        {STEPS.map(({ num, title, desc, visual, tip }) => (
          <Box
            key={num}
            background="rgba(255,255,255,0.12)"
            border={{ color: 'rgba(255,255,255,0.2)' }}
            round="medium"
            pad="medium"
          >
            <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
              <Box
                width="36px"
                height="36px"
                round="full"
                background="rgba(255,255,255,0.2)"
                align="center"
                justify="center"
                flex={false}
              >
                <Text size="small" weight={500} color="white">{num}</Text>
              </Box>
              <Text weight={500} color="white">{title}</Text>
            </Box>
            <Text size="small" color="rgba(255,255,255,0.72)" margin={{ bottom: 'small' }}>
              {desc}
            </Text>
            {visual}
            {tip && (
              <Box
                direction="row"
                gap="xsmall"
                background="rgba(255,255,255,0.1)"
                round="xsmall"
                pad="small"
                margin={{ top: 'small' }}
              >
                <Text size="small" color="rgba(255,255,255,0.8)">{tip}</Text>
              </Box>
            )}
          </Box>
        ))}
      </Grid>

      {/* Bottom: See the difference + What you get */}
      <Box
        background="rgba(255,255,255,0.1)"
        border={{ color: 'rgba(255,255,255,0.18)' }}
        round="medium"
        pad="medium"
        direction="row"
        gap="large"
        wrap
        margin={{ bottom: 'large' }}
      >
        <Box flex>
          <Text weight={500} color="white" margin={{ bottom: 'xsmall' }}>
            ✨ See the difference
          </Text>
          <Text size="small" color="rgba(255,255,255,0.72)">
            The right hijab color can brighten your face and boost your confidence.
          </Text>
        </Box>
        <Box direction="row" gap="medium" align="center" wrap>
          {WHAT_YOU_GET.map(({ icon, label }) => (
            <Box key={label} align="center" gap="xsmall">
              <Box
                width="44px"
                height="44px"
                round="full"
                background="rgba(255,255,255,0.15)"
                border={{ color: 'rgba(255,255,255,0.25)' }}
                align="center"
                justify="center"
              >
                {icon}
              </Box>
              <Text size="xsmall" color="rgba(255,255,255,0.8)" textAlign="center" style={{ maxWidth: 70 }}>
                {label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* CTA */}
      <Box align="center">
        <Button
          as={Link}
          to="/analyze"
          primary
          label={
            <Box direction="row" align="center" gap="xsmall">
              <Sparkles size={16} />
              <Text weight={500}>Start your color journey</Text>
              <ArrowRight size={16} />
            </Box>
          }
          style={{
            background: '#5C1F82',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            padding: '12px 28px',
            color: 'white',
          }}
        />
        <Box direction="row" gap="medium" margin={{ top: 'small' }} wrap justify="center">
          {TRUST.map((t) => (
            <Box key={t} direction="row" align="center" gap="xsmall">
              <CheckCircle size={13} color="rgba(255,255,255,0.65)" />
              <Text size="xsmall" color="rgba(255,255,255,0.65)">{t}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}