import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
//import Comments from "../../../components/Comments";
import { StyledLink } from "../../../components/StyledLink";
import { StyledButton } from "../../../components/StyledButton";
import { StyledImage } from "../../../components/StyledImage";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: lightgray;
  color: black;
  border: none;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const {
    data: place,
    isLoading,
    error,
  } = useSWR(id ? `/api/places/${id}` : null);

  if (!isReady || isLoading || error || !place?.image)
    return <h2>Loading...</h2>;

  async function deletePlace() {
    if (!id) {
      console.error("Place ID is required to delete");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete place: ${response.statusText}`);
      }

      console.log("Place deleted successfully");
      router.push("/"); 
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }
  if (!id) {
    return <h2>Place ID is required</h2>;
  }
  return (
    <>
      <StyledLink href={"/"} $justifySelf="start">
        back
      </StyledLink>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {place.name}, {place.location}
      </h2>
      <StyledLocationLink href={place.mapURL || "#"}>
        Location on Google Maps
      </StyledLocationLink>
      <p>{place.description}</p>
      <ButtonContainer>
        <StyledLink href={id ? `/places/${id}/edit` : "#"}>Edit</StyledLink>
        <StyledButton onClick={deletePlace} type="button" $variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
    </>
  );
}
