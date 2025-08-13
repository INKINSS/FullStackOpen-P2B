
export const CreateContactButton = ({ onClick, createContactVisible }) => {
  return (
    <button style={{ display: createContactVisible ? "none" : "block" }} onClick={onClick}>crear contacto</button>
  )
}
