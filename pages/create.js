import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  async function addPlace(place) {
    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error(`Failed to add place: ${response.statusText}`);
      }

      const newPlace = await response.json(); // sollte die ID des neuen Place enthalten
      console.log("Place added successfully:", newPlace);

      // Weiterleitung zur Detailseite des neuen Place
      router.push(`/`);
    } catch (error) {
      console.error("Error adding place:", error);
      alert("Failed to add place. Please try again.");
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
