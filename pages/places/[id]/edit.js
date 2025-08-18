import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    place.id = id;
    if (!place?.id) {
      console.error("Place ID is required to update");
      return;
    }

    try {
      const response = await fetch(`/api/places/${place.id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });

      if (!response.ok) {
        throw new Error(`Failed to update place: ${response.statusText}`);
      }

      const updatedPlace = await response.json();
      console.log("Place updated successfully:", updatedPlace);
    } catch (error) {
      console.error("Error updating place:", error);
    }
    router.push(`/places/${id}`);
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
