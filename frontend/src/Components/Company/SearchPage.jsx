import SearchBar from "./SearchBar";
import TopicCards from "./TopicCards";
import SuggestionList from "./SuggestionList";
import { Box, Heading,Text } from "grommet";
import { useState } from "react";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
<Box
  align="center"
  background="linear-gradient(135deg, rgba(255,182,193,0.35), rgba(128,0,128,0.55))"
  style={{
    minHeight: "420px",
    position: "relative",
    overflow: "hidden",
    paddingTop: "120px",
    paddingBottom: "60px",
  }}
>
  <Heading>Help Center</Heading>
  <Text>How can we help?</Text>

  <Box width="100%" align="center" margin={{ top: "medium" }}>
    <Box width="600px" style={{ maxWidth: "90%" }}>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <SuggestionList searchValue={searchValue} />
    </Box>
  </Box>

  <TopicCards searchValue={searchValue} />
</Box>

    </>
  );
}
