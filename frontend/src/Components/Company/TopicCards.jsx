import { Box, Text, Image, Button} from "grommet";
import styled from "styled-components";
import start from "../../assets/startapp.png"
import season from "../../assets/color_season.png"
import privacy from "../../assets/privacy.png"
import hijab_match from "../../assets/hijab_match.png"
import { useNavigate } from "react-router-dom";

const Card = styled(Box)`
  background: rgba(253, 251, 249, 0.96);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(210, 150, 160, 0.10);
  border: 1px solid rgba(0, 0, 0, 0.06);

  transition:
    opacity 180ms linear,
    transform 180ms linear;
`;

export default function TopicCards({ searchValue }) {
    const navigate = useNavigate();
  const hidden = searchValue.length > 0;

  const topics = [
    {
      title: "Getting Started",
      desc: "Learn how to use HijabMatch and upload your first photo.",
      onClick: (navigate) => {
      navigate("/#how-it-works");
    },
      src:start
    },
    {
      title: "Color Seasons",
      desc: "Understand how our AI determines your undertone and season.",
         onClick:(navigate) => {
      navigate("/#color-season");
    },
      src:season
    },
    {
      title: "Privacy & Photos",
      desc: "How your images are handled, stored, and deleted.",
         onClick:(navigate) => {
      navigate("/privacy");
         },
      src:privacy
    },
    {
      title: "Hijab Recommendations",
      desc: "How we match hijab shades to your unique coloring.",
     onClick:(navigate) => {
      navigate("/#first-feature");
    },
      src:hijab_match
    },
  ];

  return (
    <Box
      direction="row"
      wrap
      gap="medium"
      justify="center"
      margin={{ top: "medium" }}
     style={{
         height: hidden ? 0 : "auto",
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(6px)" : "translateY(0)",
        pointerEvents: hidden ? "none" : "auto",
        overflow: "hidden",
        transition: "opacity 180ms linear, transform 180ms linear, height 180ms linear",
}}
    >
      {topics.map((t) => (
        <Card key={t.title} width="300px">
          <Box direction="row" align="center" gap="small" margin={{ bottom: "small" }}>
         <Image src={t.src} width="64px" height="64px" />
         <Text weight="bold" size="20px" color="#C08A95">
          {t.title}
          </Text>
         </Box>

          <Text size="16px" color="rgba(80, 65, 60, 0.75)" margin={{ bottom: "medium" }}>
            {t.desc}
          </Text>
            <Box align="center" pad="medium">
          <Button
            onClick={() => t.onClick(navigate)}
            label="Learn more"
            color="#C08A95"
            style={{ fontWeight: 600 }}
          />
          </Box>
        </Card>
      ))}
    </Box>
  );
}
