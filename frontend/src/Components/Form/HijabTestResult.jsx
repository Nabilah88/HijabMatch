import React, { useState } from 'react';
import { Grommet, Box, Grid, Text, Heading, Button, Image, Spinner } from 'grommet';
import {
  Camera,
  Download,
  Refresh,
  Magic as Sparkles,
  Close,
  Checkmark,
  CircleInformation,
  Shield,
  Lock,
  Star,
  Favorite,
} from 'grommet-icons';

// ---- Design tokens — matches the HijabMatch purple/violet system ----
const GRADIENT = 'linear-gradient(135deg, #C56BC8 0%, #8B3FA8 50%, #6B2D8B 100%)';
const LILAC = '#E9C9F0';
const VIOLET_DEEP = '#6B2D8B';
const VIOLET_MID = '#8B3FA8';

const theme = {
  global: {
    font: { family: 'Poppins, sans-serif' },
    colors: {
      brand: VIOLET_MID,
      background: VIOLET_DEEP,
    },
  },
};

// Frosted glass card — the recurring pattern in your design system
const GlassCard = ({ children, ...rest }) => (
  <Box
    round="medium"
    pad="medium"
    background={{ color: '#FFFFFF20' }}
    style={{
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255,255,255,0.25)',
    }}
    {...rest}
  >
    {children}
  </Box>
);

const TRUST_ITEMS = [
  { Icon: Shield, label: 'Your Privacy Matters', sub: 'Photo analyzed securely & deleted after processing' },
  { Icon: Lock, label: '100% Private', sub: 'We never store or share your photos' },
  { Icon: Star, label: 'Made for You', sub: 'Personalized colors, just for your beauty' },
  { Icon: Favorite, label: 'Made with Care', sub: 'For every hijabi who wants to feel her best' },
];

/**
 * HijabMatchResult
 *
 * Everything the backend determines is passed in as props — nothing about
 * a specific user's season, palette, or flattering/avoid colors is
 * hardcoded here. Shape of each prop is documented above its declaration.
 *
 * Expected API response shape (adjust to match your Django serializer):
 * {
 *   season: { name: "Light Spring", traits: ["Warm", "Light", "Clear"] },
 *   flattering: {
 *     less: [{ color: "#8B8680", label: "Slate Gray" }, ...],
 *     more: [{ color: "#F2B8A0", label: "Peach" }, ...]
 *   },
 *   palette: [{ name: "Peach", hex: "#F2A97E" }, ...],
 *   colorsToAvoid: [{ name: "Black", hex: "#000000" }, ...],
 *   neutrals: [{ name: "Cream", hex: "#FFFDD0" }, ...],
 *   colorTip: "When in doubt, choose warm, light, and clear colors...",
 *   photoUrl: "https://.../uploaded-photo.jpg"
 * }
 *
 * onRecolorRequest(hexColor) should call your Django recolor endpoint and
 * return a Promise that resolves to a displayable image URL (either a
 * hosted URL, or a data: URL built from a base64 response — either works
 * with Grommet's <Image>). This component handles the loading state and
 * swap itself; it just needs that Promise.
 */
export default function HijabMatchResult({
  season,
  flattering,
  palette = [],
  colorsToAvoid = [],
  neutrals = [],
  colorTip,
  photoUrl,
  onRecolorRequest,   // async (hexColor) => recoloredImageUrl
  onAnalyzeAnother,   // optional callback — "Analyze Another Photo"
  onDownloadPalette,  // optional callback — "Download My Palette"
}) {
  const [selectedSwatch, setSelectedSwatch] = useState(null);
  const [displayedPhotoUrl, setDisplayedPhotoUrl] = useState(photoUrl);
  const [isRecoloring, setIsRecoloring] = useState(false);
  const [recolorError, setRecolorError] = useState(null);

  const handleSwatchClick = async (c) => {
    setSelectedSwatch(c);
    setRecolorError(null);

    if (!onRecolorRequest) return; // no backend wired up yet — just track selection

    setIsRecoloring(true);
    try {
      const recoloredUrl = await onRecolorRequest(c.hex);
      setDisplayedPhotoUrl(recoloredUrl);
    } catch (err) {
      setRecolorError('Could not preview that color — try again.');
    } finally {
      setIsRecoloring(false);
    }
  };

  const handleResetPhoto = () => {
    setSelectedSwatch(null);
    setDisplayedPhotoUrl(photoUrl);
    setRecolorError(null);
  };

  return (
    <Grommet theme={theme} full>
      <Box background={{ image: GRADIENT }} fill overflow="auto">
        {/* Header */}
        <Box
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: 'large', vertical: 'medium' }}
          width={{ max: '1200px' }}
          alignSelf="center"
          fill="horizontal"
        >
          <Box direction="row" align="center" gap="small">
            <Box
              width="36px"
              height="36px"
              round="full"
              background="#FFFFFF30"
              align="center"
              justify="center"
              style={{ border: '1px solid rgba(255,255,255,0.4)' }}
            >
              <Favorite color="white" size="small" />
            </Box>
            <Box>
              <Text weight="bold" size="small" color="white">Hijab Match</Text>
              <Text size="xsmall" color={LILAC}>Wear Your Best Colors</Text>
            </Box>
          </Box>
          <Box direction="row" gap="small">
            <Button
              icon={<Camera color="white" size="16px" />}
              label={<Text size="small" color="white">Analyze Another Photo</Text>}
              style={{ border: '1px solid rgba(255,255,255,0.5)', borderRadius: '999px' }}
              plain
              pad={{ horizontal: 'medium', vertical: 'small' }}
              onClick={onAnalyzeAnother}
            />
            <Button
              icon={<Download color={VIOLET_DEEP} size="16px" />}
              label={<Text size="small" weight="bold" color={VIOLET_DEEP}>Download My Palette</Text>}
              style={{ borderRadius: '999px' }}
              primary
              color="white"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              onClick={onDownloadPalette}
            />
          </Box>
        </Box>

        <Box width={{ max: '1200px' }} alignSelf="center" fill="horizontal" pad={{ horizontal: 'large', bottom: 'large' }} gap="medium">

          {/* Hero: photo + intro */}
          <Grid columns={['320px', 'flex']} gap="medium">
            <GlassCard pad="small">
              <Box
                round="small"
                overflow="hidden"
                height={{ min: '360px' }}
                background="#FFFFFF15"
                align="center"
                justify="center"
                style={{ position: 'relative' }}
              >
                {displayedPhotoUrl ? (
                  <Image src={displayedPhotoUrl} fit="cover" fill />
                ) : (
                  <Text size="small" color={LILAC} textAlign="center" margin={{ horizontal: 'medium' }}>
                    Your uploaded photo will appear here
                  </Text>
                )}
                {isRecoloring && (
                  <Box
                    fill
                    align="center"
                    justify="center"
                    background="#00000055"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  >
                    <Spinner color="white" />
                    <Text size="xsmall" color="white" margin={{ top: 'small' }}>
                      Previewing color...
                    </Text>
                  </Box>
                )}
              </Box>

              {selectedSwatch && !isRecoloring && (
                <Box direction="row" align="center" justify="between" margin={{ top: 'small' }}>
                  <Box direction="row" align="center" gap="xsmall">
                    <Box width="14px" height="14px" round="full" background={selectedSwatch.hex} />
                    <Text size="xsmall" color="white">Previewing: {selectedSwatch.name}</Text>
                  </Box>
                  <Button
                    plain
                    onClick={handleResetPhoto}
                    icon={<Refresh color={LILAC} size="12px" />}
                    label={<Text size="xsmall" color={LILAC}>Reset</Text>}
                  />
                </Box>
              )}

              {recolorError && (
                <Text size="xsmall" color="#F2A0A0" margin={{ top: 'xsmall' }}>
                  {recolorError}
                </Text>
              )}

              {season && (
                <Box direction="row" align="center" gap="small" margin={{ top: 'small' }}>
                  <Text size="large">🌸</Text>
                  <Box>
                    <Text size="xsmall" color={LILAC}>Your Season</Text>
                    <Text weight="bold" size="large" color="white">{season.name}</Text>
                    {season.traits && (
                      <Text size="xsmall" color={LILAC}>{season.traits.join(' • ')}</Text>
                    )}
                  </Box>
                </Box>
              )}
            </GlassCard>

            <Box gap="medium">
              <Box>
                <Heading level={1} margin="none" color="white" size="small">
                  I Know My Colors, I Wear My Best ♡
                </Heading>
                <Text size="small" color={LILAC} margin={{ top: 'xsmall' }}>
                  Your personalized color palette is here! These colors brighten your natural
                  beauty and bring out your healthy, radiant glow.
                </Text>
              </Box>

              {/* Before / after comparison */}
              {flattering && (
                <GlassCard>
                  <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'small' }}>
                    <Sparkles color="white" size="14px" />
                    <Text size="small" weight="bold" color="white">See The Difference</Text>
                  </Box>
                  <Grid columns={['1fr', '1fr']} gap="medium">
                    <Box>
                      <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'xsmall' }}>
                        <Close color="#F2A0A0" size="14px" />
                        <Text size="xsmall" weight="bold" color="#F2A0A0">Less Flattering</Text>
                      </Box>
                      <Box direction="row" gap="xsmall">
                        {(flattering.less || []).map((c) => (
                          <Box key={c.label} flex background={c.color} round="small" height="48px" title={c.label} />
                        ))}
                      </Box>
                      <Text size="xsmall" color={LILAC} margin={{ top: 'xsmall' }}>
                        These colors can make you look dull and washed out.
                      </Text>
                    </Box>
                    <Box>
                      <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'xsmall' }}>
                        <Checkmark color="#A0E2B8" size="14px" />
                        <Text size="xsmall" weight="bold" color="#A0E2B8">More Flattering</Text>
                      </Box>
                      <Box direction="row" gap="xsmall">
                        {(flattering.more || []).map((c) => (
                          <Box key={c.label} flex background={c.color} round="small" height="48px" title={c.label} />
                        ))}
                      </Box>
                      <Text size="xsmall" color={LILAC} margin={{ top: 'xsmall' }}>
                        These colors brighten your face and bring out your natural glow.
                      </Text>
                    </Box>
                  </Grid>
                </GlassCard>
              )}
            </Box>
          </Grid>

          {/* Palette swatches */}
          {palette.length > 0 && (
            <GlassCard>
              <Box direction="row" justify="between" align="center" margin={{ bottom: 'small' }} wrap>
                <Box direction="row" align="center" gap="xsmall">
                  <Sparkles color="white" size="14px" />
                  <Text size="small" weight="bold" color="white">
                    {season ? `Why ${season.name}?` : 'Your Color Palette'}
                  </Text>
                </Box>
                <Text size="xsmall" color={LILAC}>Click a color to preview</Text>
              </Box>
              <Grid columns={{ count: 8, size: 'auto' }} gap="small">
                {palette.map((c) => {
                  const selected = selectedSwatch?.name === c.name;
                  return (
                    <Button key={c.name} plain onClick={() => handleSwatchClick(c)}>
                      <Box align="center" gap="xsmall">
                        <Box
                          width="100%"
                          height="56px"
                          round="small"
                          background={c.hex}
                          style={{
                            outline: selected ? '2px solid white' : 'none',
                            outlineOffset: '2px',
                          }}
                        />
                        <Text size="xsmall" color={LILAC}>{c.name}</Text>
                      </Box>
                    </Button>
                  );
                })}
              </Grid>
              <Box direction="row" align="center" gap="xsmall" margin={{ top: 'medium' }}>
                <Favorite color="white" size="12px" />
                <Text size="xsmall" color="white">
                  These warm, light, and fresh colors make you glow!
                </Text>
              </Box>
            </GlassCard>
          )}

          {/* Avoid / neutrals / tip */}
          <Grid columns={['1fr', '1fr', '1fr']} gap="medium">
            {colorsToAvoid.length > 0 && (
              <GlassCard>
                <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'xsmall' }}>
                  <Close color="#F2A0A0" size="14px" />
                  <Text size="small" weight="bold" color="white">Colors to Avoid</Text>
                </Box>
                <Text size="xsmall" color={LILAC} margin={{ bottom: 'small' }}>
                  Colors that can overpower or wash you out.
                </Text>
                <Box direction="row" gap="xsmall">
                  {colorsToAvoid.map((c) => (
                    <Box key={c.name} width="32px" height="32px" round="full" background={c.hex} title={c.name} />
                  ))}
                </Box>
              </GlassCard>
            )}

            {neutrals.length > 0 && (
              <GlassCard>
                <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'xsmall' }}>
                  <Favorite color="white" size="14px" />
                  <Text size="small" weight="bold" color="white">Neutrals I Love</Text>
                </Box>
                <Text size="xsmall" color={LILAC} margin={{ bottom: 'small' }}>
                  Warm neutrals are perfect base colors for easy matching.
                </Text>
                <Box direction="row" gap="xsmall">
                  {neutrals.map((c) => (
                    <Box key={c.name} width="32px" height="32px" round="full" background={c.hex} title={c.name} />
                  ))}
                </Box>
              </GlassCard>
            )}

            {colorTip && (
              <GlassCard>
                <Box direction="row" align="center" gap="xsmall" margin={{ bottom: 'small' }}>
                  <Box
                    width="24px" height="24px" round="full"
                    background="#FFFFFF30" align="center" justify="center"
                  >
                    <CircleInformation color="white" size="14px" />
                  </Box>
                  <Text size="small" weight="bold" color="white">My Color Tip</Text>
                </Box>
                <Text size="xsmall" color={LILAC}>{colorTip}</Text>
              </GlassCard>
            )}
          </Grid>

          {/* Footer CTA */}
          <Box
            direction="row"
            justify="between"
            align="center"
            wrap
            gap="medium"
            round="medium"
            pad="medium"
            background="#FFFFFF18"
            style={{ border: '1px solid rgba(255,255,255,0.3)' }}
          >
            <Box>
              <Text weight="bold" size="large" color="white">
                Your colors. Your confidence. Your best you.
              </Text>
              <Text size="xsmall" color={LILAC} margin={{ top: 'xxsmall' }}>
                Wear what makes you glow, every day.
              </Text>
            </Box>
            <Button
              icon={<Download color={VIOLET_DEEP} size="16px" />}
              label={<Text size="small" weight="bold" color={VIOLET_DEEP}>Download My Palette</Text>}
              style={{ borderRadius: '999px' }}
              primary
              color="white"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              onClick={onDownloadPalette}
            />
          </Box>

          {/* Trust footer */}
          <Grid columns={{ count: 4, size: 'small' }} gap="medium" pad={{ vertical: 'medium' }}>
            {TRUST_ITEMS.map(({ Icon, label, sub }) => (
              <Box key={label} align="center" gap="xxsmall" pad={{ horizontal: 'small' }}>
                <Icon color="white" size="18px" />
                <Text size="xsmall" weight="bold" color="white" textAlign="center">{label}</Text>
                <Text size="xsmall" color={LILAC} textAlign="center">{sub}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>
    </Grommet>
  );
}
